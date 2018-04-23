import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabePage } from './tabe';

@NgModule({
  declarations: [
    TabePage,
  ],
  imports: [
    IonicPageModule.forChild(TabePage),
  ],
})
export class TabePageModule {}
