import { ImageIcon } from "lucide-react";
import type { UploadStatus } from "../types";
import { useDropzone } from "react-dropzone";
import { cn } from "../lib/utils";
import { useState } from "react";
import { uploadImageToCloudinary } from "../cloudinary/upload-direct";
import type { CloudinaryUploadResult } from "../cloudinary/UploadWidget";
interface UploadCardProps {
	uploadStatus: UploadStatus;
	uploadError: string | null;
	onUploadError: (error: Error) => void;
	onUploadStart: () => void;
	onUploadSuccess: (result: CloudinaryUploadResult) => void;
}
const ACCEPT = {
	"image/jpeg": [".jpg", ".jpeg"],
	"image/png": [".png"],
	"image/webp": [".webp"],
};
const UploadCard = ({
	uploadStatus,
	uploadError,
	onUploadError,
	onUploadStart,
	onUploadSuccess,
}: UploadCardProps) => {
	const [progress, setProgress] = useState(0);
	const uploadFile = async (file: File) => {
		onUploadStart();
		setProgress(0);
		try {
			const result = uploadImageToCloudinary(file, setProgress);
			onUploadSuccess(await result);
		} catch (error) {
			onUploadError(new Error("Upload Failed."));
			console.error(error);
		}
	};
	const onDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length === 0) {
			onUploadError(new Error("Please upload a JPG, PNG or Webp image."));
			return;
		}
		uploadFile(acceptedFiles[0]);
		console.log(acceptedFiles);
	};
	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop,
		accept: ACCEPT,
		maxFiles: 1,
		multiple: false,
		disabled: uploadStatus === "uploading",
	});
	const isUploading = uploadStatus === "uploading";
	return (
		<section id="upload" className="px-4 py-12">
			<div className="mx-auto max-w-2xl">
				<h2 className="mb-2 text-center text-2xl font-semibold">
					Upload Your Selfie
				</h2>
				<p className="mb-8 text-center text-white/60">
					Drag and drop, or click to upload your photo
				</p>
				<div
					{...getRootProps()}
					className={cn(
						`glass-card relative flex cursor-pointer flex-col items-center gap-6 p-10 transition`,
						isDragActive && "border-indigo-500/50 bg-indigo-500/10",
						isUploading && "pointer-events-none opacity-80"
					)}
				>
					<input {...getInputProps()} />
					<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
						<ImageIcon className="h-10 w-10" />
					</div>
					<div className="text-center">
						<p className="text-lg font-medium">Drag & drop your selfie here</p>
						<p className="mt-1 text-sm text-white/50">
							or click to browse • JPG, PNG, or Webp
						</p>
					</div>
					{isUploading && (
						<div>
							<div>
								<div></div>
							</div>
							<p>Uploading... {progress > 0 ? `${progress}%` : ""}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default UploadCard;
