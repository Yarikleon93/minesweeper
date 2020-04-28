import { NeighbourService } from "./neighbour-service";


describe('Neighbour service', () => {
  it('should have getNeighbourIndexes method', () => {
    expect(NeighbourService).toHaveProperty('getNeighbourIndexes');
  });

  describe('getNeighbourIndexes', () => {
    it('should return an array', () => {
      expect(NeighbourService.getNeighbourIndexes()).toBeInstanceOf(Array);
    });

    describe('for grid 3x3', () => {
      const width = 3;
      const height = 3;

      it('should return [0, 1, 2, 3, 5, 6, 7, 8] for 4', () => {
        expect(NeighbourService.getNeighbourIndexes(4, width, height)).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
      });
      it('should return [0, 2, 3, 4, 5] for 1', () => {
        expect(NeighbourService.getNeighbourIndexes(1, width, height)).toEqual([0, 2, 3, 4, 5]);
      });
      it('should return [1, 3, 4] for 0', () => {
        expect(NeighbourService.getNeighbourIndexes(0, width, height)).toEqual([1, 3, 4]);
      });
      it('should return [4, 5, 7] for 8', () => {
        expect(NeighbourService.getNeighbourIndexes(8, width, height)).toEqual([4, 5, 7]);
      });
    });

    describe('for grid 10 x 10', () => {
      const width = 10;
      const height = 10;
      it('should return [8, 18, 19] for 9', () => {
        expect(NeighbourService.getNeighbourIndexes(9, width, height)).toEqual([8, 18, 19]);
      })
    });

  });
});