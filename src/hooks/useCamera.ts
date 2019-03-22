import { useEffect, useState } from 'react';

export const useCamera = (): MediaStream | undefined => {
  const [stream, setStream] = useState<MediaStream>();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(setStream);
  }, []);

  return stream;
};
