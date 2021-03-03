import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { Mark } from 'src/app/models/mark.mode';
import { Model } from 'src/app/models/model.mode';
import { Owner } from 'src/app/models/owner.model';
import { CarsServiceService } from 'src/app/services/cars-service.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})

export class CarsListComponent implements OnInit {
  cars: Car[];
  marks: Mark[];
  models: Model[];
  owners: Owner[];
  currentCar : Car;
  markEmpty: Mark ={
    id: 1,
    markName: '',
    createDate: new Date,
  }
  modelEmpty: Model ={
    id: 1,
    mark: this.markEmpty,
    model: '',
    createDate: new Date,
  }
  ownerEmpty: Owner ={
    egn: '',
    fullName: '',
    address: '',
    phone: ''
  }
  carEmpty: Car[] = [{
    regNum: '1213',
    mark: this.markEmpty,
    model: this.modelEmpty,
    mpg: 10,
    cylinders: 10,
	  horsepower: 10,
    weight:10,
    accel: 10,
    owner: this.ownerEmpty,
    saleDate: new Date
  }];
  currentIndex = -1;
  regNum = 0;

  constructor(private carService: CarsServiceService) { }

  ngOnInit(): void {
    this.retrieveCars();
    this.retrieveMarks();
    this.retrieveModels();
    this.retrieveOwners();
  }
  doGet(){
    debugger
    this.cars = this.carService.onMyGet();
  }
  async retrieveCars(): Promise<void> {
    debugger
    // this.cars = this.carService.onMyGet();
    this.carService.getAll()
      .subscribe(
        data => {
          debugger
          this.cars = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  async retrieveOwners(): Promise<void> {
    debugger
     this.carService.getAllOwners()
      .subscribe(
        data => {
          debugger
          this.owners = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  async retrieveMarks(): Promise<void> {
    debugger
    this.carService.getAllMarks()
      .subscribe(
        data => {
          debugger
          this.marks = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  async retrieveModels(): Promise<void> {
    debugger
    // this.cars = this.carService.onMyGet();
    this.carService.getAllModels()
      .subscribe(
        data => {
          debugger
          this.models = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  removeAllCars(): void {
    this.carService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveCars();
        },
        error => {
          console.log(error);
        });
  }

  onDelete(regNum :string): void {
    debugger
    this.carService.delete(regNum)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveCars();
        },
        error => {
          console.log(error);
        });
  }
  searchTitle(): void {
    this.carService.findByOwner(this.regNum)
      .subscribe(
        data => {
          this.cars = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
