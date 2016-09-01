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
  var dataset: Array<any> = [1, 10, 100];

  beforeEach(() => {
    vpTree = new VPTree(dataset);
  });

  it("should create a balanced tree for this dataset", () => {
    expect(vpTree.root.left).toBeTruthy();
    expect(vpTree.root.left.left).toBeNull();
    expect(vpTree.root.left.right).toBeNull();

    expect(vpTree.root.right).toBeTruthy();
    expect(vpTree.root.right.left).toBeNull();
    expect(vpTree.root.right.right).toBeNull();
  });

  it("each node in tree should have correct upper and lower bounds", () => {
    expect(vpTree.root.left_bnd[0]).not.toBeGreaterThan(vpTree.root.left_bnd[1]);
    expect(vpTree.root.left.left_bnd[0]).not.toBeGreaterThan(vpTree.root.left.left_bnd[1]);
    expect(vpTree.root.right.left_bnd[0]).not.toBeGreaterThan(vpTree.root.right.left_bnd[1]);

    expect(vpTree.root.right_bnd[0]).not.toBeGreaterThan(vpTree.root.right_bnd[1]);
    expect(vpTree.root.left.right_bnd[0]).not.toBeGreaterThan(vpTree.root.left.right_bnd[1]);
    expect(vpTree.root.right.right_bnd[0]).not.toBeGreaterThan(vpTree.root.right.right_bnd[1]);
  });

  it("distance to left branch should be less than distance to right branch", () => {
    expect(vpTree.d(vpTree.root.p, vpTree.root.left.p)).toBeLessThan(vpTree.d(vpTree.root.p, vpTree.root.right.p));
  });

});
