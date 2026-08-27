import type { CloudinaryImage } from "@cloudinary/url-gen/index";
import { cld } from "../cloudinary/config";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import type { ExportFormat, HeadshotPreset } from "../types";
import {
	generativeBackgroundReplace,
	generativeReplace,
} from "@cloudinary/url-gen/actions/effect";

const WIDTH = 600;
const HEIGHT = 750;
function finalizeImage(img: CloudinaryImage) {
	return img
		.resize(fill().width(WIDTH).height(HEIGHT).gravity(autoGravity()))
		.delivery(format(auto()))
		.delivery(quality(autoQuality()));
}
export const HEADSHOT_PRESETS: HeadshotPreset[] = [
	{
		id: "corporate-executive",
		name: "Corporate Executive",
		description: "Navy suit with office backdrop — LinkedIn ready",
		category: "style",
		build: (publicId) =>
			finalizeImage(
				cld
					.image(publicId)
					.effect(
						generativeReplace()
							.from("casual shirt")
							.to(
								"professional navy suit jacket with white dress shirt and tie"
							)
					)
					.effect(
						generativeBackgroundReplace().prompt(
							"modern corporate office with bookshelves professional lighting"
						)
					)
			),
		transformationChain:
			"e_gen_replace:from_casual%20shirt;to_professional%20navy%20suit%20jacket%20with%20white%20dress%20shirt%20and%20tie/e_gen_background_replace:prompt_modern%20corporate%20office%20with%20bookshelves%20professional%20lighting/c_fill,w_600,h_750,g_auto/f_auto/q_auto",
	},
	{
		id: "outdoor-professional",
		name: "Outdoor Professional",
		description: "Crisp white shirt with golden hour garden",
		category: "style",
		transformationChain:
			"e_gen_replace:from_casual%20shirt;to_crisp%20white%20button%20down%20dress%20shirt%20professional/e_gen_background_replace:prompt_outdoor%20garden%20with%20trees%20golden%20hour%20sunlight%20bokeh/c_fill,w_600,h_750,g_auto/f_auto/q_auto",
		build: (publicId) =>
			finalizeImage(
				cld
					.image(publicId)
					.effect(
						generativeReplace()
							.from("casual shirt")
							.to("crisp white button down dress shirt professional")
					)
					.effect(
						generativeBackgroundReplace().prompt(
							"outdoor garden with trees golden hour sunlight bokeh"
						)
					)
			),
	},
	{
		id: "urban-business",
		name: "Urban Business",
		description: "Smart blazer with city street bokeh",
		category: "style",
		transformationChain:
			"e_gen_replace:from_casual%20shirt;to_charcoal%20gray%20blazer%20over%20light%20blue%20dress%20shirt/e_gen_background_replace:prompt_city%20street%20with%20buildings%20urban%20bokeh/c_fill,w_600,h_750,g_auto/f_auto/q_auto",
		build: (publicId) =>
			finalizeImage(
				cld
					.image(publicId)
					.effect(
						generativeReplace()
							.from("casual shirt")
							.to("charcoal gray blazer over light blue dress shirt")
					)
					.effect(
						generativeBackgroundReplace().prompt(
							"city street with buildings urban bokeh"
						)
					)
			),
	},
];
export const ALL_PRESETS = HEADSHOT_PRESETS;
export function buildOriginalPreview(publicId: string): CloudinaryImage {
	return cld
		.image(publicId)
		.resize(fill().width(WIDTH).height(HEIGHT).gravity(autoGravity()))
		.delivery(format(auto()))
		.delivery(quality(autoQuality()));
}
export function getPresetById(id: string): HeadshotPreset | undefined {
	return ALL_PRESETS.find((p) => p.id === id);
}
export function getExportTransformationChain(
	preset: HeadshotPreset,
	publicId: string
) {
	const url = preset.build(publicId).toURL();
	const marker = "/image/upload/";
	const rest = url.split(marker)[1]?.split("?")[0] ?? "";
	let path = rest.replace(/^v\d+\//, "");
	const suffix = `/${publicId}`;
	if (path.endsWith(suffix)) {
		return path.slice(0, -suffix.length);
	}
	return preset.transformationChain;
}

export function getExportUrl(
	publicId: string,
	preset: HeadshotPreset,
	format: ExportFormat
): string {
	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
	if (!cloudName) {
		throw new Error(
			"Cloudinary cloud name is not defined in environment variables."
		);
	}
	let chain = getExportTransformationChain(preset, publicId);
	if (chain.endsWith("/")) chain = chain.slice(0, -1);

	chain = chain.replace(/\/f_auto\//, `/f_${format}/`);
	return `https://res.cloudinary.com/${cloudName}/image/upload/${chain}/${publicId}.${format}`;
}
