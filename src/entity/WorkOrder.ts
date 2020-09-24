import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Product} from "./Product";
import {WorkOrderAndProduct} from "./WorkOrderAndProduct";

@Entity()
export class WorkOrder extends BaseEntity {

    @PrimaryGeneratedColumn() id: number;

    @Column()
    date: string;

    @OneToMany(type => WorkOrderAndProduct, listOfWorkOrders => listOfWorkOrders.idWorkOrder)
    listOfWorkOrders: WorkOrderAndProduct[];

    listOfProducts:Product[]

    constructor(date?: string, listOfProducts?: Product[]) {
        super();
        this.date = date;
    }
}
