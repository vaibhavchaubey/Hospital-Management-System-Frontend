import { useEffect, useState } from 'react';
import { getMedia } from '../../../Service/MediaService';

const useProtectedImage = (imageId?: string | null) => {
  const [imageUrl, setImageUrl] = useState<string>('/avatar.png');

  useEffect(() => {
    if (!imageId) {
      return;
    }

    getMedia(Number(imageId)).then((data:any) => {
        const url = URL.createObjectURL(data);
        setImageUrl(url);
        console.log('Fetched image URL:', url);
    }).catch((error) => {
        console.error('Error fetching image:', error);
    });
  }, [imageId]);

  return imageUrl;
};

export default useProtectedImage;