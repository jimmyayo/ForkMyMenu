import uuid from 'uuid/v4';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uuid(),
      count, 
      unit, 
      ingredient}; 
    this.items.push(item);
    return item;
  }
  
  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);
  }

  updateQuantity(id, count) {
    let item = this.items.find(el => el.id === id);
    item.count = count;
  }
}