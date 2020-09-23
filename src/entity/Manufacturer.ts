import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Manufacturer extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column() private _title: string;

    @OneToMany(type => Product, listOfProducts => listOfProducts.idManufacturer)
    listOfProducts: Product[];

    constructor(title: string) {
        super();
        this._title = title;
    }


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
}
