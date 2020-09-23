import {AbstractService} from "./AbstractService";
import {SubCategory} from "../entity/SubCategory";

export class SubCategoryService extends AbstractService<SubCategory> {

    async save(entity: SubCategory): Promise<void> {
        await super.save(entity);
    }

    async getAll(): Promise<SubCategory []> {
        return await SubCategory.find({relations: ['idCategory']})
    }
}
