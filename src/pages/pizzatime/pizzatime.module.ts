import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzatimePage } from './pizzatime';

@NgModule({
  declarations: [
    PizzatimePage,
  ],
  imports: [
    IonicPageModule.forChild(PizzatimePage),
  ],
})
export class PizzatimePageModule {}
