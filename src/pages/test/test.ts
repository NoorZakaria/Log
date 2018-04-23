import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
//import { FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import{CartPage} from '../cart/cart';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';
import { LoggedinPage } from '../loggedin/loggedin';
import { ProfilePage } from '../profile/profile';
import { Observable } from 'rxjs/Observable';
 
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  alerCtrl: any;
  public type;
  // peoplelist : FirebaseListObservable<any>
   profileData: AngularFireObject<User>;
   item: Observable<User>;
   itemRef: AngularFireObject<any>;
 
   constructor(public navCtrl: NavController, public db:AngularFireDatabase, public navParams: NavParams,
     public ofAuth: AngularFireAuth,
     private toast: ToastController, public loadingCtrl: LoadingController) {
 
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
         this.type = action.payload.val().type;   
         this.test();    
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
 test(){

  let page=this.type;
  console.log(page);
  if (page=='user'){
    this.navCtrl.setRoot(LoggedinPage);
  }
  else if (page=='delivery'){
    this.navCtrl.setRoot(ProfilePage);
  }
 }
   cart (){
     this.navCtrl.setRoot('CartPage');
   }
   ionViewDidLoad() {
     console.log('ionViewDidLoad TsetPage');
   }
   presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }
 
     
 }
 

