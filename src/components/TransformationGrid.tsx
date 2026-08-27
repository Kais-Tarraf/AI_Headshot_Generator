import type { CloudinaryImage } from "@cloudinary/url-gen/index";
import type { HeadshotPreset } from "../types";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";

interface PresetImage {
	presets: HeadshotPreset;
	image: CloudinaryImage;
}
interface TransformationGridProps {
	title: string;
	presets: PresetImage[];
	selectedPresetId: string | null;
	onSelect: (id: string) => void;
}

const PresetCard = ({
	preset,
	image,
	isSelected,
	onSelect,
}: {
	preset: HeadshotPreset;
	image: CloudinaryImage;
	isSelected: boolean;
	onSelect: () => void;
}) => {
	return (
		<button onClick={onSelect}>
			<div
				className={cn(
					`relative aspect-[4/5] w-full overflow-hidden bg-black/30 border-1 rounded-xl`,
					isSelected ? "border-indigo-500" : "border-transparent"
				)}
			>
				<AdvancedImage
					cldImg={image}
					plugins={[placeholder({ mode: "blur" }), lazyload()]}
					alt="Original Upload"
					className="mx-auto rounded-xl shadow-lg"
				/>
				{isSelected && (
					<div className="absolute right-2 top-2 rounded-full bg-indigo-600 p-1">
						<Check className="h-4 w-4 text-white" />
					</div>
				)}
			</div>
			<div className="p-4">
				<h4 className="font-semibold">{preset.name}</h4>
				<p className="mt-1 text-xs text-white/50">{preset.description}</p>
			</div>
		</button>
	);
};

const TransformationGrid = ({
	title,
	presets,
	onSelect,
	selectedPresetId,
}: TransformationGridProps) => {
	if (presets.length === 0) return null;
	return (
		<section className="px-4 py-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-2 text-center text-2xl font-semibold">{title}</h2>
				<p className="mb-8 text-center text-sm text-white/50">
					Outfit swap · Background replace · Optimized for web
				</p>
				<p className="mb-6 text-center text-xs text-amber-400/70">
					Styles generate one at a time (~30-60s each).
				</p>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{presets.map(({ preset, image }) => (
						<PresetCard
							preset={preset}
							image={image}
							key={preset.id}
							isSelected={selectedPresetId === preset.id}
							onSelect={() => onSelect(preset.id)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default TransformationGrid;
