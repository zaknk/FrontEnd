export class Warehouse {
  warehouseId: number = 0;
  capacity: number = 0;
  active: number = 0;

  constructor(warehouseId: number, capacity: number, active: number) {
    this.warehouseId = warehouseId;
    this.capacity = capacity;
    this.active = active;
  }
}
