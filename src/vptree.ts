export class VPTree {

  root: Object;

  constructor(dataset: Array<any> = null, private d: Function = null) {
    this.makeVPTree(dataset);
  }

  makeVPTree(dataset: Array<any>) {
    let list: Array<any> = [];

    // TODO: loop dataset, create nodes, add nodes to list

    this.root = this.recurseVPTRee(list);
  }

  recurseVPTRee(list: Array<any>) {
    if (list.length === 0) {
      return null;
    }
  }

}
