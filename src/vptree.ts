import { Node } from './dataStructs';
import { Item } from './dataStructs';
import { MathUtils } from './MathUtils';

export class VPTree {

  root: Node = null;

  constructor(dataset: Array<any> = null, private dist: Function = null) {
    if (dataset) {
      this.makeVPTree(dataset);
    }
  }

  // distance function
  d(a: any, b: any) {
    if (this.dist) {
      return this.dist(a, b);
    }

    // default manhattan distance
    return Math.abs(b - a);
  }

  makeVPTree(dataset: Array<any>) {
    let list: Array<Item> = [];

    for (let el of dataset) {
      list.push(new Item(el));
    }

    this.root = this.recurseVPTRee(list);
  }

  recurseVPTRee(list: Array<Item>) {
    if (list.length === 0) {
      return null;
    }

    let node: Node = new Node(this.selectVantagePoint(list));
    // remove vp from list
    list.splice(list.indexOf(node.p), 1);

    let distances: Array<number> = [];
    for (let item of list) {
      let dist = this.d(item, node.p);
      item.hist.push(dist);
      distances.push(dist);
    }

    let mu: number = MathUtils.median(distances);

    let L: Array<Item> = [];
    let R: Array<Item> = [];

    for (let item of list) {
      if (item.hist[item.hist.length - 1] < mu) {
        L.push(item);
      } else {
        R.push(item);
      }
    }

    node.left = this.recurseVPTRee(L);
    node.right = this.recurseVPTRee(R);

    // TODO:
    // node$\uparrow$.bnds $:=$ Merge(node$\uparrow$.left$\uparrow$.bnds, node$\uparrow$.right$\uparrow$.bnds,node$\uparrow$.p$\uparrow$.hist);

    return node;
  }

  // TODO:
  selectVantagePoint(list: Array<any>) {
    return list[Math.random() * list.length];
  }

}
