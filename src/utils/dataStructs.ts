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

export class NQueue {

  private queue: Array<Item> = [];

  constructor(public size: number = 1, public threshold: number = Infinity) { };

  push(el, score: number) {
    if (score < this.threshold) {
      let item = new Item(el);
      item.dist = score;
      this.queue.push(item);
      this.queue.sort((a, b) => {
        return a.dist - b.dist;
      });

      if (this.queue.length >= this.size) {
        if (this.queue.length > this.size) {
          this.queue.pop(); // remove last element (worst score)
        }
        this.threshold = this.queue[this.queue.length - 1].dist;
      }
    }
  }

  getResult(): any {
    if (!this.queue.length) {
      return null;
    }

    if (this.queue.length === 1) {
      return this.queue[0];
    }

    return this.queue;
  }
}
