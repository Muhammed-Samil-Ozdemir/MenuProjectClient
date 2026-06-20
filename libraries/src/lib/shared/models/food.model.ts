import { Category } from "./category.model";

export interface Food{
    id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    isActive: boolean,
    category: Category
}