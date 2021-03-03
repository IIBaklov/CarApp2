import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { Mark } from '../models/mark.mode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Owner } from '../models/owner.model';
import { Model } from '../models/model.mode';

const baseUrl = 'http://localhost:8764/';

@Injectable({
  providedIn: 'root'
})
export class CarsServiceService {
 markTmp: Mark ={
    id: 0,
    markName: '',
    createDate: new Date,
  }
  model: Model ={
    id: 0,
    mark: this.markTmp,
    model: '',
    createDate: new Date,
  }
  owner: Owner ={
    egn: '',
    fullName: '',
    address: '',
    phone: ''
  }
cars: Car[]=[{
  regNum: '0',
  mark: this.markTmp,
  model: this.model,
  mpg: 20,
  cylinders: 40,
  horsepower: 30,
  weight: 0,
  accel: 0,
  owner: this.owner,
  saleDate: new Date
}]
  constructor(private http: HttpClient) { }

  public onMyGet(): Car[]{
    debugger
    return this.cars;
  }
  getAll(): Observable<any> {
    debugger
    return this.http.get(`${baseUrl}/cars`);
  }

  getAllMarks(): Observable<any> {
    debugger
    return this.http.get(`${baseUrl}/marks`);
  }

  getAllModels(): Observable<any> {
    debugger
    return this.http.get(`${baseUrl}/models`);
  }
  getAllOwners(): Observable<any> {
    debugger
    return this.http.get(`${baseUrl}/owners`);
  }
  getModelsForMark(mark :number): Observable<any> {
    debugger
    
    return this.http.get(`${baseUrl}/models/${mark}`);
  }

  get(regNum :number): Observable<any> {
    debugger
    return this.http.get(`${baseUrl}/car/${regNum}`);
  }

  create(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    debugger
    return this.http.post(`${baseUrl}/addCar`, data,{'headers':headers});
  }

  update(id: any, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    debugger
    return this.http.put(`${baseUrl}/updCar`, data, {'headers':headers});
  }

  delete(regNum: string): Observable<any> {
    debugger
    return this.http.delete(`${baseUrl}/delCar/${regNum}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByOwner(regNum: number): Observable<any> {
    return this.http.get(`${baseUrl}?regNum=${regNum}`);
  }
}
