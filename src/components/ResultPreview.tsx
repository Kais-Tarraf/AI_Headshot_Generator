import type { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import type { HeadshotPreset } from "../types";
import { AdvancedImage } from "@cloudinary/react";

interface ResultPreviewProps {
	originalImage: CloudinaryImage | null;
	selectedImage: CloudinaryImage | null;
	selectedPreset: HeadshotPreset | null;
}

export default function ResultPreview({
	originalImage,
	selectedImage,
	selectedPreset,
}: ResultPreviewProps) {
	if (!selectedImage || !selectedPreset || !originalImage) return null;

	return (
		<section className="px-4 py-12">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-2 text-center text-2xl font-semibold">
					Your Selected Headshot
				</h2>
				<p className="mb-8 text-center text-white/60">{selectedPreset.name}</p>

				<div className="glass-card grid gap-6 p-6 md:grid-cols-2">
					<div>
						<p className="mb-3 text-sm font-medium text-white/50">Before</p>
						<div className="aspect-[4/5] overflow-hidden rounded-xl bg-black/30">
							<AdvancedImage
								cldImg={originalImage}
								alt="Original selfie"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
					<div>
						<p className="mb-3 text-sm font-medium text-indigo-400">
							After — AI Enhanced
						</p>
						<div className="aspect-[4/5] overflow-hidden rounded-xl bg-black/30 shadow-lg shadow-indigo-500/20">
							<AdvancedImage
								key={selectedPreset.id}
								cldImg={selectedImage}
								alt={selectedPreset.name}
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
