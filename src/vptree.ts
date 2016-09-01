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

    let vpIndex = this.selectVantagePointIndex(list);
    let node: Node = new Node(list[vpIndex]);

    // remove vp from list
    list.splice(vpIndex, 1);

    let distances: Array<number> = [];
    for (let item of list) {
      let dist = this.d(item.id, node.p);
      // item.hist.push(dist);
      item.dist = dist;
      distances.push(dist);
    }

    let L: Array<Item> = [],
      R: Array<Item> = [],
      minL = Infinity,
      minR = Infinity,
      maxL = 0,
      maxR = 0,
      mu: number = MathUtils.median(distances);

    for (let item of list) {
      if (item.dist < mu) {
        L.push(item);
        if (item.dist < minL) {
          minL = item.dist;
        }
        if (item.dist > maxL) {
          maxL = item.dist;
        }
      } else {
        R.push(item);
        if (item.dist < minR) {
          minR = item.dist;
        }
        if (item.dist > maxR) {
          maxR = item.dist;
        }
      }
    }

    if (minL === Infinity) {
      minL = 0;
    }

    if (minR === Infinity) {
      minR = 0;
    }

    node.left_bnd = [minL, maxL];
    node.right_bnd = [minR, maxR];

    node.left = this.recurseVPTRee(L);
    node.right = this.recurseVPTRee(R);

    return node;
  }

  // TODO:
  selectVantagePointIndex(list: Array<any>) {
    return Math.floor(Math.random() * list.length);
  }

  // LOG:
  recursivePrint(node: Node) {
    if (!node) {
      return;
    }
    console.log(node);
    this.recursivePrint(node.left);
    this.recursivePrint(node.right);
  }

  print() {
    this.recursivePrint(this.root);
  }
}
