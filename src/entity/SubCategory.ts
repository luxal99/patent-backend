import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./Category";

@Entity()
export class SubCategory extends BaseEntity {

    @PrimaryGeneratedColumn() id: number;

    @Column() title: string;

    @ManyToOne(type => Category, id => id.listOfSubCategories)  idCategory: Category


    constructor(title?: string, idCategory?: Category) {
        super();
        this.title = title;
        this.idCategory = idCategory;
    }

}
