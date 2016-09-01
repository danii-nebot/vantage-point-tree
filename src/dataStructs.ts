export class Node {

  p: any;
  left: Node;
  right: Node;
  left_bnd: Array<number>;
  right_bnd: Array<number>;

  constructor(item: Item) {
    this.p = item.id;
  }

}

export class Item {

  dist: number;
  // unused
  // hist: Array<number> = [];

  constructor(public id: any) { }

}
