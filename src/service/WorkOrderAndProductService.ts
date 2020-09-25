import {AbstractService} from "./AbstractService";
import {WorkOrderAndProduct} from "../entity/WorkOrderAndProduct";

export class WorkOrderAndProductService extends AbstractService<WorkOrderAndProduct> {

    async save(entity: WorkOrderAndProduct): Promise<void> {
        await super.save(entity);
    }

    async getAll(): Promise<WorkOrderAndProduct[]> {
        return await WorkOrderAndProduct.find({relations: ['idProduct', 'idWorkOrder']})
    }
}
