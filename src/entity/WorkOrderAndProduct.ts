import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {WorkOrder} from "./WorkOrder";
import {Product} from "./Product";


@Entity()
export class WorkOrderAndProduct extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => WorkOrder,id => id.listOfWorkOrders)
    idWorkOrder : WorkOrder;


    @ManyToOne(type => Product,id => id.listOfWorkOrders)
    idProduct : Product;


    constructor(idWorkOrder?: WorkOrder, idProduct?: Product) {
        super();
        this.idWorkOrder = idWorkOrder;
        this.idProduct = idProduct;
    }
}
