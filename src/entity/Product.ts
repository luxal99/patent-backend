import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Manufacturer} from "./Manufacturer";
import {SubCategory} from "./SubCategory";
import {WorkOrder} from "./WorkOrder";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: number

    @Column()
    amount: number;

    @Column()
    code: string;

    @ManyToOne(type => Manufacturer, id => id.listOfProducts)
    idManufacturer: Manufacturer

    @ManyToOne(type => SubCategory, id => id.listOfProducts)
    idSubCategory: SubCategory

    @ManyToMany(type => WorkOrder, product => product.listOfProduct)
    listOfWorkOrder: Product[];


    constructor(title?: string, price?: number, amount?: number, idManufacturer?: Manufacturer, code?: string, idSubCategory?) {
        super();
        this.title = title;
        this.price = price;
        this.amount = amount;
        this.idManufacturer = idManufacturer;
        this.code = code;
        this.idSubCategory = idSubCategory
    }
}
