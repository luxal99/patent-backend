import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./Category";

@Entity()
export class SubCategory extends BaseEntity {

    @PrimaryGeneratedColumn() private _id: number;

    @Column() private _title: string;

    @ManyToOne(type => Category, id => id.listOfSubCategories) private _idCategory: Category


    constructor(title: string, idCategory: Category) {
        super();
        this._title = title;
        this._idCategory = idCategory;
    }


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get idCategory(): Category {
        return this._idCategory;
    }

    set idCategory(value: Category) {
        this._idCategory = value;
    }
}
