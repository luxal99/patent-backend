import {BaseEntity} from "typeorm";
import {AbstractService} from "./AbstractService";
import {Product} from "../entity/Product";

export class ProductService extends AbstractService<Product> {


    async save(entity: Product): Promise<void> {
        await super.save(entity);
    }
    async getAll():Promise<Product[]>{
        return await Product.find({relations:['idManufacturer']})
    }

}
