import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SubCategory} from "./SubCategory";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn() id: number;

    @Column() title: string;


    @OneToMany(type => SubCategory, listOfSubCategories => listOfSubCategories.idCategory)
    listOfSubCategories: SubCategory[];

    constructor(title?: string) {
        super();
        this.title = title;
    }

}
