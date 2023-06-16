export class Category {
  categoryId: number = 0;
  categoryName: string = '';

  constructor(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
