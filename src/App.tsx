// import { useState } from 'react';
// import { AdvancedImage, placeholder, lazyload } from '@cloudinary/react';
// import { fill } from '@cloudinary/url-gen/actions/resize';
// import { format, quality } from '@cloudinary/url-gen/actions/delivery';
// import { auto } from '@cloudinary/url-gen/qualifiers/format';
// import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { cld, uploadPreset } from './cloudinary/config';
// import { UploadWidget } from './cloudinary/UploadWidget';
// import type { CloudinaryUploadResult } from './cloudinary/UploadWidget';
import Home from './pages/Home';

// const hasUploadPreset = Boolean(uploadPreset);

// const PROMPTS_WITH_UPLOAD = [
//   'Create an image gallery with lazy loading and responsive images',
//   'Create a video player that plays a Cloudinary video',
//   'Add image overlays with text or logos',
// ];

// const PROMPTS_WITHOUT_UPLOAD = [
//   "Let's try uploading — help me add an upload preset and upload widget",
//   ...PROMPTS_WITH_UPLOAD,
// ];

function App() {
  // const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  // const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  // const [clickedIds, setClickedIds] = useState(new Set<number>());

  // const handleUploadSuccess = (result: CloudinaryUploadResult) => {
  //   console.log('Upload successful:', result);
  //   // result contains everything you need to work with the uploaded asset:
  //   //   result.public_id   — Cloudinary asset ID (use with cld.image() for transformations)
  //   //   result.secure_url  — direct HTTPS URL to the original file
  //   //   result.url         — HTTP URL (prefer secure_url)
  //   //   result.width / result.height — image dimensions
  //   //   result.format      — file format (e.g. 'jpg', 'png', 'webp')
  //   //   result.bytes       — file size in bytes
  //   //   result.resource_type — 'image', 'video', or 'raw'
  //   setUploadedImageId(result.public_id);
  //   setUploadedUrl(result.secure_url); // store the URL to use anywhere in your app
  // };

  // const handleUploadError = (error: Error) => {
  //   console.error('Upload error:', error);
  //   alert(`Upload failed: ${error.message}`);
  // };

  // const copyPrompt = (text: string, id: number) => {
  //   void navigator.clipboard.writeText(text).then(() => {
  //     setClickedIds((prev) => new Set(prev).add(id));
  //     setTimeout(() => setClickedIds( (prev) => {
  //       const next = new Set(prev);
  //       next.delete(id);
  //       return next;
  //     }), 2000);
  //   });
  // };

  // // Display uploaded image if available, otherwise show a sample
  // const imageId = uploadedImageId || 'samples/people/bicycle';
  
  // const displayImage = cld
  //   .image(imageId)
  //   .resize(fill().width(600).height(400).gravity(autoGravity()))
  //   .delivery(format(auto()))
  //   .delivery(quality(autoQuality()));

  return (
   <Home/>
  );
}

export default App;
