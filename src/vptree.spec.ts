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
    expect(vpTree.recurseVPTRee).toHaveBeenCalledTimes(dataset.length + 1);
    expect(vpTree.root).not.toBeNull();
  });
});
