import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { AddCarComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  { path: '', redirectTo: 'cars/show', pathMatch: 'full' },
  { path: 'cars/show', component: CarsListComponent },
  { path: 'cars/add', component: AddCarComponent },
  { path: 'cars/edit/:regNum', component: AddCarComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
