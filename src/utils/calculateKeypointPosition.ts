import { Keypoint } from '@tensorflow-models/posenet';
import { Position, Size } from '../types';

export const calculateKeypointPosition = (
  screenSize: Size,
  videoSize: Size,
  keypoint?: Keypoint,
): Position | undefined =>
  keypoint && {
    left:
      (keypoint.position.x / screenSize.width) * videoSize.width +
      (screenSize.width - videoSize.width) / 2,
    top:
      (keypoint.position.y / screenSize.height) * videoSize.height +
      (screenSize.height - videoSize.height) / 2,
  };
