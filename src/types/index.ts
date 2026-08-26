import type { CloudinaryImage } from "@cloudinary/url-gen/index";

export type PresetCategory = "style";
export type ExportFormat = "jpg" | "png" | "webp";
export type UploadStatus = "idle" | "uploading" | "success" | "error";
export interface HeadshotPreset {
	id: string;
	name: string;
	description: string;
	category: PresetCategory;
	transformationChain: string;
	build: (publicId: string) => CloudinaryImage;
}
