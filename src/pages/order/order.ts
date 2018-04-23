import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{CartPage} from '../cart/cart';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { RoomPage } from '../room/room';
import { LoginPage } from '../login/login';

/** 
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  tab1Root = ContactPage;
  tab2Root = RoomPage;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
  exitChat(){
    this.navCtrl.push('LoginPage');
  }
}
