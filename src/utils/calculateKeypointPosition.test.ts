import { calculateKeypointPosition } from './calculateKeypointPosition';

describe('calculateKeypointPosition', () => {
  it('should calculate keypoint position correctly', () => {
    expect(
      calculateKeypointPosition(
        { height: 1024, width: 1280 },
        { height: 800, width: 600 },
        { part: '', position: { x: 42, y: 100 }, score: 1 },
      ),
    ).toEqual({ top: 190.125, left: 359.6875 });
  });
});
