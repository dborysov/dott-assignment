import { Keypoint, Pose, PoseNet } from '@tensorflow-models/posenet';
import { useEffect, useState } from 'react';

export const usePoses = (
  videoRef: React.RefObject<HTMLVideoElement>,
  stream?: MediaStream,
  net?: PoseNet,
): Record<'leftEye' | 'rightEye', Keypoint | undefined> => {
  const [poses, setPoses] = useState<ReadonlyArray<Pose>>();

  useEffect(() => {
    // tslint:disable-next-line:no-let
    let shouldRecalculatePoses = true;

    const recalculatePoses = () => {
      if (videoRef.current && stream && net) {
        const imageScaleFactor = 0.5;
        const flipHorizontal = false;
        const outputStride = 16;
        const maxDetections = 1;
        const nmsRadius = 0.75;
        net
          .estimateMultiplePoses(
            videoRef.current,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxDetections,
            nmsRadius,
          )
          .then(setPoses);
      }

      if (shouldRecalculatePoses) {
        requestAnimationFrame(recalculatePoses);
      }
    };

    recalculatePoses();

    return () => {
      shouldRecalculatePoses = false;
    };
  }, [net, stream, videoRef.current]);

  return {
    leftEye: poses && poses[0] && poses[0].keypoints.find(kp => kp.part === 'leftEye'),
    rightEye: poses && poses[0] && poses[0].keypoints.find(kp => kp.part === 'rightEye'),
  };
};
