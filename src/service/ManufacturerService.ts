import {AbstractService} from "./AbstractService";
import {Manufacturer} from "../entity/Manufacturer";

export class ManufacturerService extends AbstractService<Manufacturer> {

    async save(entity: Manufacturer): Promise<void> {
        await super.save(entity);
    }

    async getAll():Promise<Manufacturer[]> {
        return await Manufacturer.find({relations:['listOfProducts']})
    }
}
