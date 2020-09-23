import {AbstractService} from "./AbstractService";
import {WorkOrder} from "../entity/WorkOrder";

export class WorkOrderService extends AbstractService<WorkOrder> {

    async save(entity: WorkOrder): Promise<void> {
        await super.save(entity);
    }

    async getAll():Promise<WorkOrder[]>{
        return await WorkOrder.find({relations:['listOfProduct']})
    }
}
