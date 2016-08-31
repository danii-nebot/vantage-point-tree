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

// TODO:
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
