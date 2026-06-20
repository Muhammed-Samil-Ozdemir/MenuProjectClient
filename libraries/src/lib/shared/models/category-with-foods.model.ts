import { Food } from "./food.model";

export interface CategoryWithFoods{
    id?: string,
    name: string,
    foods: Food[]
}