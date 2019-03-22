import { useEffect, useState } from 'react';

export const useCamera = (): {
  readonly stream?: MediaStream;
  readonly selectedCamera: MediaDeviceInfo;
  readonly switchCamera: () => void;
} => {
  const [stream, setStream] = useState<MediaStream>();
  const [availableCameras, setAvailableCameras] = useState<ReadonlyArray<MediaDeviceInfo>>([]);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
  useEffect(() => {
    if (!availableCameras.length) {
      navigator.mediaDevices
        .enumerateDevices()
        .then(cameras =>
          setAvailableCameras(cameras.filter(camera => camera.kind === 'videoinput')),
        );
    }

    if (availableCameras.length) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: availableCameras[selectedCameraIndex].deviceId } },
        })
        .then(setStream);
    }

    return () => {
      if (stream && stream.stop) stream.stop();
    };
  }, [availableCameras, selectedCameraIndex]);

  const switchCamera = () => {
    if (availableCameras.length > 1) {
      const newCameraIndex = (selectedCameraIndex + 1) % availableCameras.length;

      setSelectedCameraIndex(newCameraIndex);
    }
  };

  return { stream, switchCamera, selectedCamera: availableCameras[selectedCameraIndex] };
};
