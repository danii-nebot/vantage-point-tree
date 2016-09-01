export class Node {

  p: any;
  left: Node;
  right: Node;
  upper: number;
  lower: number;

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
