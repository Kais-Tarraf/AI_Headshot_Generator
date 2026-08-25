import { useState } from "react";
import type { UploadStatus } from "../types";
import type { CloudinaryUploadResult } from "../cloudinary/UploadWidget";

export function useHeadshot() {
	const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
	const [uploadError, setUploadError] = useState<string | null>(null);
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
		setUploadStatus("success");
		setUploadError(null);
	};
	const handleUploadError = (error: Error) => {
		setUploadStatus("error");
		setUploadError(error.message);
	};
	return {
		uploadError,
		uploadStatus,
		handleUploadError,
		handleUploadStart,
		handleUploadSuccess,
	};
}
