/* *****************************************************************************
TypeScript implementation of the Vantage-Point Tree N-Nearest Neighbor search algorithm

As defined in the paper: http://pnylab.com/pny/papers/vptree/vptree/vptree.html

I've tried to keep the names of the functions and variables
as close as those defined in the paper as possible, for clarity.
(although that might not be the case, actually)
***************************************************************************** */

import { Node, Item, NQueue } from './utils/dataStructs';
import { median, secondMoment } from './utils/mathUtils';

export class VPTree {

  root: Node = null;
  numberOfSearchOps = 0;

  constructor(dataset: Array<any> = null, private dist: Function = null) {
    if (dataset) {
      this.makeVPTree(dataset);
    }
  }

  /**
  * distance function
  */
  d(a: any, b: any): number {
    if (this.dist) {
      return this.dist(a, b);
    }

    // default manhattan distance
    return Math.abs(b - a);
  }

  /**
  * entry point to build vp-tree
  */
  makeVPTree(s: Array<any>) {
    let list: Array<Item> = [];

    for (let el of s) {
      list.push(new Item(el));
    }

    this.root = this.recurseVPTRee(list);
  }

  /**
  * Given set S of metric space elements, returns pointer to the root of an optimized vp-tree
  */
  recurseVPTRee(list: Array<Item>): Node {
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
      mu: number = median(distances);

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

  /**
  * construct a set of vantage point candidates, from which the median and
  * a corresponding moment are estimated. Finally, based on these statistical `images`,
  * the candidate with the largest moment is chosen
  */
  // TODO: TEST!
  selectVantagePointIndex(list: Array<any>): number {

    if (!list.length) {
      return null;
    }

    if (list.length === 1) {
      return 0;
    }

    let bestSpread: number = 0,
      bestIndex: number = Math.floor(Math.random() * list.length);

    // P $:=$ Random sample of S;
    for (let i = 0; (i < 5 && i < list.length); i++) {
      let randomIndex = Math.floor(Math.random() * list.length),
        D: Array<any> = [],
        distances: Array<number> = [];

      for (let j = 0; (j < 10 && j < list.length); j++) {
        D.push(Math.floor(Math.random() * list.length));
        distances.push(this.d(list[randomIndex].id, list[D[D.length - 1]].id));
      }

      let mu = median(distances);
      let spread = secondMoment(distances, mu);

      if (spread > bestSpread) {
        bestSpread = spread;
        bestIndex = randomIndex;
      }
    }

    return bestIndex;
  }


  /*
  * Called with query `q' and the root of a vp-tree; returns the `id' of a nearest neighbor in global variable `best'.
  * Before calling, global variable `tau' is set to the desired search radius and
  * `best' should be set to $\emptyset$.
  * Setting tau to 1 then searches without constraint.
  * On return `tau' is the distance to `best'.
  * We denote by $I_L$ the open interval whose left endpoint is n$\uparrow$.left_bnd[low]-tau
  * and right endpoint is n$\uparrow$.left_bnd[high]+tau.
  * Open interval $I_R$ is defined similarly.
  *
  * q: item to find
  * n: number of items to find (n-nearest)
  * r: search radius
  */
  find(q: any, n: number = 1, r: number = Infinity): any {
    let tau: number = r;
    let queue = new NQueue(n, r);
    this.numberOfSearchOps = 0;

    // internal procedure to search
    let search = (node: Node) => {
      if (!node) {
        return null;
      }

      this.numberOfSearchOps++;

      let x = this.d(node.p, q);

      if (x < queue.threshold) {
        queue.push(node.p, x);
        tau = queue.threshold;
      }

      let middle: number = (node.left_bnd[1] + node.right_bnd[0]) / 2;

      if (x < middle) {
        if (x > node.left_bnd[0] - tau && x < node.left_bnd[1] + tau) {
          search(node.left);
        }

        if (x > node.right_bnd[0] - tau && x < node.right_bnd[1] + tau) {
          search(node.right);
        }

      } else {

        if (x > node.right_bnd[0] - tau && x < node.right_bnd[1] + tau) {
          search(node.right);
        }

        if (x > node.left_bnd[0] - tau && x < node.left_bnd[1] + tau) {
          search(node.left);
        }
      }
    };

    search(this.root);

    return queue.getResult();
  }

  // TODO?
  /**
  * LOG:
  */
  recursivePrint(node: Node, prefix: string = '', postfix: string = '') {
    if (!node) {
      return;
    }
    console.log(`${prefix} ${node.p} ${postfix}`);
    this.recursivePrint(node.left, prefix, `/${postfix}`);
    this.recursivePrint(node.right, `${prefix}\\`, postfix);
  }

  print() {
    this.recursivePrint(this.root);
  }
}
