import { Mark } from 'src/app/models/mark.mode';
import { Model } from './model.mode';
import { Owner } from './owner.model';
export class Car{
    public   regNum: string;
    public   mark: Mark;
    public   model: Model;
    public   mpg: number;
    public   cylinders: number;
    public   horsepower: number;
    public   weight: number;
    public   accel: number;
    public   owner: Owner;
    public   saleDate: Date;
   
}