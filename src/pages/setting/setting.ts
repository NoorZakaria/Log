import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//import { FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import{CartPage} from '../cart/cart';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';
import { EditPage } from '../edit/edit';
import { Observable } from 'rxjs/Observable';
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
 // peoplelist : FirebaseListObservable<any>
  profileData: AngularFireObject<User>;
  item: Observable<User>;
  itemRef: AngularFireObject<any>;

  constructor(public navCtrl: NavController, public db:AngularFireDatabase, public navParams: NavParams,
    public ofAuth: AngularFireAuth,
    private toast: ToastController) {

    //this.peoplelist=db.list('/people');
    
  }
  ionViewWillLoad() {
    this.ofAuth.authState.take(1).subscribe(ofAuth => {
      if (ofAuth && ofAuth.email && ofAuth.uid) {
        this.toast.create({
          message: 'welcom' + "  " + ofAuth.email,
          duration: 3000
        }).present();

        this.profileData = this.db.object('people/' + ofAuth.uid);
        this.item = this.profileData.valueChanges();
        this.itemRef = this.db.object('people/' + ofAuth.uid);
        this.itemRef.snapshotChanges().subscribe(action => {
        //console.log(action.type);
        //console.log(action.key)
        console.log(action.payload.val().type)
    });
      }
 
      else {
        this.toast.create({
          message: 'cant find auth deyails',
          duration: 3000
        }).present();
      }
    })
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
/*  editperson(user:User){
    this.ofAuth.authState.take(1).subscribe (auth=>{
      this.db.object('people/' + auth.uid).set(user)
      .then(()=> this.navCtrl.push('ProfilePage'));
    })  }*/

    edit(){
      this.navCtrl.setRoot('EditPage');
    }
}
