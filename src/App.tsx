import React, { FC, useEffect, useRef } from 'react';
import { useCamera } from './hooks/useCamera';
import { usePoseNet } from './hooks/usePoseNet';
import { usePoses } from './hooks/usePoses';
import { useWindowSize } from './hooks/useWindowSize';
import { Eye, Video } from './styles';
import { calculateActualVideoSize } from './utils/calculateActualVideoSize';
import { calculateKeypointPosition } from './utils/calculateKeypointPosition';

const App: FC = () => {
  const screenSize = useWindowSize();
  const stream = useCamera();
  const videoRef = useRef<HTMLVideoElement>(null);
  const net = usePoseNet();
  const { leftEye, rightEye } = usePoses(videoRef, stream, net);

  useEffect(() => {
    if (stream && videoRef.current) {
      // tslint:disable-next-line:no-object-mutation
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef.current]);

  const videoSize = calculateActualVideoSize(
    videoRef.current
      ? { height: videoRef.current.videoHeight, width: videoRef.current.videoWidth }
      : { width: 0, height: 0 },
    screenSize,
  );

  const leftEyePosition = calculateKeypointPosition(screenSize, videoSize, leftEye);
  const rightEyePosition = calculateKeypointPosition(screenSize, videoSize, rightEye);

  return (
    <>
      <Video height={screenSize.height} width={screenSize.width} autoPlay={true} ref={videoRef} />
      {[leftEyePosition, rightEyePosition].map(
        (eyePosition, i) =>
          eyePosition && (
            <Eye
              key={i}
              style={{
                left: eyePosition.left,
                top: eyePosition.top,
              }}
            />
          ),
      )}
    </>
  );
};

export default App;
