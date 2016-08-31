export class Node {

  left: Node;
  right: Node;
  bnds: Array<any> = [];

  constructor(public p: Item) { }

}

export class Item {

  hist: Array<any> = [];

  constructor(public id: any) { }

}
