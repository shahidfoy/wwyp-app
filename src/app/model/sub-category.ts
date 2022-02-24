import { Category } from "./category";

export class SubCategory {
    public id: number;
    public name: string;
    public categories: Set<Category>;

    constructor() {
        this.id = null;
        this.name = '';
        this.categories = new Set();
    }
}