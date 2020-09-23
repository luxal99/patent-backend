import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Manufacturer} from "./Manufacturer";

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

    @ManyToOne(type => Manufacturer, id => id.listOfProducts)
    idManufacturer: Manufacturer


    constructor(title?: string, price?: number, amount?: number, idManufacturer?: Manufacturer) {
        super();
        this.title = title;
        this.price = price;
        this.amount = amount;
        this.idManufacturer = idManufacturer;
    }
}
