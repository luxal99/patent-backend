import {AbstractService} from "./AbstractService";
import {WorkOrder} from "../entity/WorkOrder";
import {WorkOrderDTO} from "../dto/WorkOrderDTO";
import {Product} from "../entity/Product";
import {ProductDTO} from "../dto/ProductDTO";

export class WorkOrderService extends AbstractService<WorkOrder> {

    async save(entity: WorkOrder): Promise<void> {
        await super.save(entity);
    }

    async getAll(): Promise<WorkOrder[]> {
        return await WorkOrder.find()
    }

    async getWorkOrderItems(id) {
        const sql = await this.manager.query(`select idProductId,title, count(idProductId)  as 'amounts',price
        from work_order_and_product
        join product p on p.id = work_order_and_product.idProductId 
        where idWorkOrderId =${id} 
        group by idProductId`);

        let workOrderDTO = new WorkOrderDTO(Number.parseInt(id));
        sql.forEach(product => {
            let productDTO = new ProductDTO(product.idProductId, product.title, Number.parseInt(product.amounts),
                product.price, product.price * Number.parseInt(product.amounts))

            workOrderDTO.listOfProduct.push(productDTO);
        })

        return workOrderDTO;
    }
}
