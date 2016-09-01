import { VPTree } from './vptree';

describe("test VPTree creation", () => {
  var vpTree: VPTree;

  beforeEach(() => {
    vpTree = new VPTree();
  });

  it("should correctly instantiate the tree", () => {
    expect(vpTree).toBeTruthy();
  });

  it("should create a null tree when instantiated with an empty dataset", () => {
    expect(vpTree.root).toBeNull();
  });
});

describe("test VPTree creation from a mock dataset", () => {
  var vpTree: VPTree;
  var dataset: Array<any> = ['a', 'b', 'c'];

  beforeEach(() => {
    vpTree = new VPTree();
  });

  it("should recursively iterate thru the whole list extracting its elements", () => {
    spyOn(vpTree, 'recurseVPTRee').and.callThrough();
    vpTree.makeVPTree(dataset);
    expect(vpTree.recurseVPTRee).toHaveBeenCalledTimes(2 * dataset.length + 1);
  });

  it("should have a root with a left element and a right element", () => {
    vpTree.makeVPTree(dataset);
    expect(vpTree.root).not.toBeNull();
    expect(vpTree.root.left).not.toBeUndefined();
    expect(vpTree.root.right).not.toBeUndefined();
  });
});

describe("test custom and default distance functions", () => {
  var vpTree: VPTree;
  var dist = function() {
    return 'foobar';
  };

  it("should apply default manhattan distance between elements if no distance function is given", () => {
    vpTree = new VPTree();
    expect(vpTree.d(2, 3)).toEqual(1);
    expect(vpTree.d(3, 2)).toEqual(1);
    expect(vpTree.d(5, 123)).toEqual(118);
  });

  it("should apply custom given distance between elements", () => {
    vpTree = new VPTree(null, dist);
    expect(vpTree.d(2, 3)).toEqual('foobar');
    expect(vpTree.d(3, 2)).toEqual('foobar');
    expect(vpTree.d(5, 123)).toEqual('foobar');
  });
});

describe("test VPTree creation from a specific mock dataset that represent positions", () => {
  var vpTree: VPTree;
  var dataset: Array<any> = [1, 10, 100, 99, 200, 5, 8];

  beforeEach(() => {
    vpTree = new VPTree(dataset);
  });

  it("should always create a balanced tree for this dataset", () => {
    expect(vpTree.root.left).toBeTruthy();
    expect(vpTree.root.left.left).toBeTruthy();
    expect(vpTree.root.left.right).toBeTruthy();

    expect(vpTree.root.left.left.left).toBeNull();
    expect(vpTree.root.left.left.right).toBeNull();
    expect(vpTree.root.left.left.left).toBeNull();
    expect(vpTree.root.left.left.right).toBeNull();

    expect(vpTree.root.right).toBeTruthy();
    expect(vpTree.root.right.left).toBeTruthy();
    expect(vpTree.root.right.right).toBeTruthy();

    expect(vpTree.root.right).toBeTruthy();
    expect(vpTree.root.right.left.left).toBeNull();
    expect(vpTree.root.right.left.right).toBeNull();
    expect(vpTree.root.right.right.left).toBeNull();
    expect(vpTree.root.right.right.right).toBeNull();
  });

  it("each node in tree should have correct upper and lower bounds", () => {
    expect(vpTree.root.left_bnd[0]).not.toBeGreaterThan(vpTree.root.left_bnd[1]);
    expect(vpTree.root.right_bnd[0]).not.toBeGreaterThan(vpTree.root.right_bnd[1]);

    expect(vpTree.root.left.left_bnd[0]).not.toBeGreaterThan(vpTree.root.left.left_bnd[1]);
    expect(vpTree.root.left.right_bnd[0]).not.toBeGreaterThan(vpTree.root.left.right_bnd[1]);

    expect(vpTree.root.right.left_bnd[0]).not.toBeGreaterThan(vpTree.root.right.left_bnd[1]);
    expect(vpTree.root.right.right_bnd[0]).not.toBeGreaterThan(vpTree.root.right.right_bnd[1]);

    // leafs bounds are always 0,0
    expect(vpTree.root.left.left.left_bnd[0]).toBe(0);
    expect(vpTree.root.left.left.left_bnd[1]).toBe(0);
    expect(vpTree.root.left.left.right_bnd[0]).toBe(0);
    expect(vpTree.root.left.left.right_bnd[1]).toBe(0);
  });

  it("distance to left branch should be less than distance to right branch", () => {
    expect(vpTree.d(vpTree.root.p, vpTree.root.left.p))
      .toBeLessThan(vpTree.d(vpTree.root.p, vpTree.root.right.p));

    expect(vpTree.d(vpTree.root.left.p, vpTree.root.left.left.p))
      .toBeLessThan(vpTree.d(vpTree.root.left.p, vpTree.root.left.right.p));

    expect(vpTree.d(vpTree.root.right.p, vpTree.root.right.left.p))
      .toBeLessThan(vpTree.d(vpTree.root.right.p, vpTree.root.right.right.p));
  });

  describe("search algorithm", () => {

    beforeEach(() => {
      vpTree = new VPTree();
    });

    it("should return null when searching an empty tree", () => {
      expect(vpTree.find('a')).toBeNull();
    });

    it("should return the root when searching for it", () => {
      vpTree.makeVPTree([1]);
      expect(vpTree.find(1)).toBe(1);
    });

    it("should return the root when it is within the search radius", () => {
      vpTree.makeVPTree([1]);
      expect(vpTree.find(5, 5)).toBe(1);
    });

    it("should find an element searching recursively thru the tree", () => {
      vpTree.makeVPTree([1, 2, 3, 4, 5, /* 6, 7, */ 8, 9, 10]);
      expect(vpTree.find(6)).toBe(5);
    });
  });

});
