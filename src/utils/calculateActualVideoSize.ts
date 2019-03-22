import { Size } from '../types';

export const calculateActualVideoSize = (videoSize: Size, screenSize: Size): Size => {
  const widthMultiplier = screenSize.width / videoSize.width;
  const heightMultiplier = screenSize.height / videoSize.height;

  const minMultiplier = Math.min(widthMultiplier, heightMultiplier);

  return {
    height: videoSize.height * minMultiplier,
    width: videoSize.width * minMultiplier,
  };
};
