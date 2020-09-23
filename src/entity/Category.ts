import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SubCategory} from "./SubCategory";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn() private _id: number;

    @Column() private _title: string;


    @OneToMany(type => SubCategory, listOfSubCategories => listOfSubCategories.idCategory)
    listOfSubCategories: SubCategory[];

    constructor(title?: string) {
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
