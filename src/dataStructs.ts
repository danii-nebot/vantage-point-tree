export class Node {

  left: Node;
  right: Node;
  upper: number;
  lower: number;

  constructor(public p: Item) { }

}

export class Item {

  hist: Array<number> = [];

  constructor(public id: any) { }

}
