import {AbstractService} from "./AbstractService";
import {Category} from "../entity/Category";

export class CategoryService extends AbstractService<Category> {

    async save(entity: Category): Promise<void> {
        await super.save(entity);
    }

    async getAll(): Promise<Category[]> {
        return await Category.find({relations: ['listOfSubCategories']})
    }
}
