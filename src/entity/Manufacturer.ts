import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Manufacturer extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()  title: string;

    @OneToMany(type => Product, listOfProducts => listOfProducts.idManufacturer)
    listOfProducts: Product[];

    constructor(title?: string) {
        super();
        this.title = title;
    }

}
