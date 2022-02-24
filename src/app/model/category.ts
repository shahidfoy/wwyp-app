import { SubCategory } from "./sub-category";

export class Category {
    public id: number;
    public name: string;
    public subCategories: Set<SubCategory>;

    constructor() {
        this.id = null;
        this.name = '';
        this.subCategories = new Set();
    }
}