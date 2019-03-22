import * as posenet from '@tensorflow-models/posenet';
import { useEffect, useState } from 'react';

export const usePoseNet = (): posenet.PoseNet | undefined => {
  const [net, setNet] = useState<posenet.PoseNet>();

  useEffect(() => {
    posenet.load().then(a => setNet(a));
  }, []);

  return net;
};
