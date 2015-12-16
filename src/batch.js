export default class Batch {
  constructor() {
    this.actions = [];
    this.next;
  }

  collect(next) {
    this.next = next;
    return action => {
      this.actions.push(action);
    };
  }

  flush() {
    this.actions.forEach(this.next);
    this.actions.length = 0;
  }
}
