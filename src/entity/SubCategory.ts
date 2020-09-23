import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./Category";
import {Product} from "./Product";

@Entity()
export class SubCategory extends BaseEntity {

    @PrimaryGeneratedColumn() id: number;

    @Column() title: string;

    @ManyToOne(type => Category, id => id.listOfSubCategories) idCategory: Category


    @OneToMany(type => Product, listOfProducts => listOfProducts.idSubCategory)
    listOfProducts: Product[];

    constructor(title?: string, idCategory?: Category) {
        super();
        this.title = title;
        this.idCategory = idCategory;
    }

}
