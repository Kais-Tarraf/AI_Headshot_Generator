import { useMemo, useState } from "react";
import type { UploadStatus } from "../types";
import type { CloudinaryUploadResult } from "../cloudinary/UploadWidget";
import { ALL_PRESETS, buildOriginalPreview } from "../lib/transformations";

export function useHeadshot() {
	const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [publicId, setPublicId] = useState<string | null>(null);
	const [selectedPreset, setSelectedPresetId] = useState<string | null>(null);
	const handleUploadStart = () => {
		setUploadStatus("uploading");
		setUploadError(null);
	};
	const handleUploadSuccess = (result: CloudinaryUploadResult) => {
		if (result.resource_type !== "image") {
			setUploadStatus("error");
			setUploadError("Please upload an image file (JPG, PNG or Webp)");
			return;
		}
		setPublicId(result.public_id);
		setSelectedPresetId(null);
		setUploadStatus("success");
		setUploadError(null);
	};
	const handleUploadError = (error: Error) => {
		setUploadStatus("error");
		setUploadError(error.message);
	};
	const originalImage = useMemo(() => {
		if (!publicId) return null;
		return buildOriginalPreview(publicId);
	}, [publicId]);
	const presetImages = useMemo(() => {
		if (!publicId) return [];
		return ALL_PRESETS.map((preset) => ({
			preset,
			image: preset.build(publicId),
		}));
	}, [publicId]);
	return {
		uploadError,
		uploadStatus,
		handleUploadError,
		handleUploadStart,
		handleUploadSuccess,
		originalImage,
		presetImages,
		hasUpload: Boolean(publicId),
	};
}
