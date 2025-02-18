import axios from 'axios';

// upload image and return image URL
export const imageUpload = async imageData => {
  const formData = new FormData();
  formData.append('image', imageData);
  // send image data to imgbb
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEy}`,
    formData
  );
  const image_url = data.data.display_url;
  return image_url;
};
