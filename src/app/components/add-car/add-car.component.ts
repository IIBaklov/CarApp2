import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Mark } from 'src/app/models/mark.mode';
import { CarsServiceService } from 'src/app/services/cars-service.service';
import { DatePipe } from '@angular/common'
import { Owner } from 'src/app/models/owner.model';
import { Model } from 'src/app/models/model.mode';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  markTmp ={
    id: 0,
    markName: '',
    createDate: new Date
  }
  modelTmp ={
    id: 0,
    mark: this.markTmp,
    model: '',
    createDate: new Date
  }
  ownerEmpty: Owner ={
    egn: '',
    fullName: '',
    address: '',
    phone: ''
  }
  carTmp = {
    regNum: '',
    mark: this.markTmp,
    model: this.modelTmp,
    mpg: 0,
    cylinders: 0,
	  horsepower: 0,
    weight:0,
    accel: 0,
    owner: this.ownerEmpty,
    saleDate: new Date(15/15/2020)
  };
  model1:Model
  regNum :string
  markSel :string
  modelSel :string
  ownerSel :string
  header: string
  car :Car = this.carTmp
  marks: Mark[];
  submitted = false;
  editForm = true
  models: Model[];
  owners: Owner[];
  constructor(private carService: CarsServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe) { }

    selectedMark: number =-1;
    selMark(event1: any){
      debugger
      this.selectedMark= event1.target.value
      this.retrieveModelsForMark(this.selectedMark);
    }
    refreshPage(){
    // Code to destroy child component
    debugger
    this.router.navigateByUrl('cars/show');
}
  ngOnInit(): void {
    debugger
    
    this.regNum= this.route.snapshot.paramMap.get('regNum')!
    this.retrieveMarks();
    this.retrieveOwners();
    if (this.regNum ===null){
    
        this.editForm = false      
        this.header = 'Add Cars';
    }
    else{
        this.getCar(this.route.snapshot.paramMap.get('regNum'));
        this.editForm = true   ;
        this.header = 'Edit Cars';
           
        console.log(this.regNum);
    }
       
  }
  async getCar(regNum: any): Promise<void> {
    this.carService.get(regNum)
      .subscribe(
        data => {
          debugger
          
          this.car = data;
          this.car.saleDate=new Date("03/11/2020");
         
          this.markSel=""+this.car.mark.id
          this.modelSel =""+this.car.model.id;
          if (this.car.owner!=null){
              this.ownerSel=""+this.car.owner.egn;
          }
          this.retrieveModelsForMark(this.markSel);
          
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  async retrieveMarks(): Promise<void> {
    debugger
    // this.cars = this.carService.onMyGet();
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
  async retrieveModelsForMark(mark: any): Promise<void> {
    debugger
    // this.cars = this.carService.onMyGet();
    this.carService.getModelsForMark(mark)
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

  saveCar(): void {
    debugger
    const data = {
      regNum: this.car.regNum,
      mark: this.marks.find(x=>x.id===Number(this.markSel)),
      model: this.models.find(x=>x.id===Number(this.modelSel)),
      owner: this.owners.find(({egn})=>egn===this.ownerSel),
      mpg: this.car.mpg,
      cylinders: this.car.cylinders,
	    horsepower: this.car.horsepower,
      weight:this.car.weight,
      accel: this.car.accel,
      saleDate: this.datepipe.transform(this.car.saleDate, 'dd-MM-yyyy')
    };
    console.log(JSON.stringify(data));
    this.carService.update(this.car.regNum,JSON.stringify(data))
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      });
    
  }

  newCar(): void {
    debugger
    const data = {
      regNum: this.car.regNum,
      mark: this.marks.find(x=>x.id===Number(this.markSel)),
      model: this.models.find(x=>x.id===Number(this.modelSel)),
      owner: this.owners.find(({egn})=>egn===this.ownerSel),
      mpg: this.car.mpg,
      cylinders: this.car.cylinders,
	    horsepower: this.car.horsepower,
      weight:this.car.weight,
      accel: this.car.accel,
      saleDate: this.datepipe.transform(this.car.saleDate, 'dd-MM-yyyy')
    };
    console.log(JSON.stringify(data));
    this.carService.create(JSON.stringify(data))
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigateByUrl('/');
        },
        error => {
          console.log(error);
        });
  }


}
