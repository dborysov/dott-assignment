import { calculateActualVideoSize } from './calculateActualVideoSize';

describe('calculateActualVideoSize', () => {
  it('should calculate actual video size as expected', () => {
    expect(
      calculateActualVideoSize({ height: 600, width: 800 }, { height: 1024, width: 1280 }),
    ).toEqual({ width: 1280, height: 960 });
  });
});
