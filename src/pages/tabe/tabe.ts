import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoggedinPage} from '../loggedin/loggedin';
import{PlacePage} from '../place/place';
/**
 * Generated class for the TabePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabe',
  templateUrl: 'tabe.html',
})
export class TabePage {
  tab1Root: any;
  tab2Root: any;

  constructor() {
    this.tab1Root = LoggedinPage;
    this.tab2Root = PlacePage;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabePage');
  }

}
