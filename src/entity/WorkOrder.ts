import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

@Entity()
export class WorkOrder extends BaseEntity {

    @PrimaryGeneratedColumn() id: number;

    @Column()
    date: string;

    @ManyToMany(type => Product, product => product.listOfWorkOrder)
    @JoinTable()
    listOfProduct: Product[];


    constructor(date?: string) {
        super();
        this.date = date;
    }
}
