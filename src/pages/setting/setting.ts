import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import{CartPage} from '../cart/cart';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  alerCtrl: any;
  peoplelist : FirebaseListObservable<any>
  constructor(public navCtrl: NavController,db:AngularFireDatabase, public navParams: NavParams) {

    this.peoplelist=db.list('/people');
    
  }
  

  cart (){
    this.navCtrl.setRoot('CartPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  alert(message: string) {
    this.alerCtrl.create({
      title: 'Your Informaion was updated!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  Cancel(){
  //this.navCtrl.setRoot('SettingPage');
  }
  editperson(){
 // this.alert('Info Msg');
  }
}
