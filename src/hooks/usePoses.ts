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

    const recalculatePoses = async () => {
      if (videoRef.current && stream && net) {
        net.estimateMultiplePoses(videoRef.current, 0.5, false, 16, 1, 0.75).then(setPoses);
      }

      if (shouldRecalculatePoses) {
        setTimeout(recalculatePoses, 150);
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
