import {BaseEntity, getConnection} from "typeorm";
import {AbstractService} from "./AbstractService";
import {Product} from "../entity/Product";

export class ProductService extends AbstractService<Product> {


    async save(entity: Product): Promise<void> {
        await super.save(entity);
    }

    async getAll(): Promise<Product[]> {
        return await Product.find({relations: ['idManufacturer', 'idSubCategory']})
    }

    async update(product: Product): Promise<void> {
        await getConnection().createQueryBuilder().update(Product)
            .set(product).where("id=:id", {id: product.id}).execute();
    }

}
