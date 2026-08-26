import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Hero } from "../components/Hero";
import UploadCard from "../components/UploadCard";
import { useHeadshot } from "../hooks/use-headshot";
import TransformationGrid from "../components/TransformationGrid";

const Home = () => {
	const headshot = useHeadshot();
	return (
		<div className="min-h-screen">
			<header className="border-b border-white/10 px-4 py-4">
				<div className="text-lg font-bold">
					<span>
						AI <span className="text-indigo-400">Headshot</span> Generator
					</span>
				</div>
			</header>
			<Hero />
			<UploadCard
				uploadStatus={headshot.uploadStatus}
				uploadError={headshot.uploadError}
				onUploadError={headshot.handleUploadError}
				onUploadStart={headshot.handleUploadStart}
				onUploadSuccess={headshot.handleUploadSuccess}
			/>
			{headshot.hasUpload && headshot.originalImage && (
				<section>
					<div>
						<h2>Original Uploaded Image</h2>
						<AdvancedImage
							cldImg={headshot.originalImage}
							plugins={[placeholder({ mode: "blur" }), lazyload()]}
							alt="Original Upload"
							className="mx-auto rounded-xl shadow-lg"
						/>
					</div>
				</section>
			)}
			{headshot.hasUpload && (
				<TransformationGrid
					title="AI Headshot Styles"
					presets={headshot.presetImages}
				/>
			)}
		</div>
	);
};

export default Home;
