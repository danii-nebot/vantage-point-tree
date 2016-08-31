import { Node } from './dataStructs';
import { Item } from './dataStructs';

export class VPTree {

  root: Object = null;

  constructor(dataset: Array<any> = null, private dist: Function = null) {
    if (dataset) {
      this.makeVPTree(dataset);
    }
  }

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

    let item: Item = this.selectVantagePoint(list);
    let node: Node = new Node(item);
    // remove vp from list
    list.splice(list.indexOf(item), 1);

    // TODO: recursively call for left and right branches
    this.recurseVPTRee(list);

    return node;
  }

  // TODO:
  selectVantagePoint(list: Array<any>) {
    return list[Math.random() * list.length];
  }

}
