import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { LoggedinPage } from '../loggedin/loggedin';
import { ProfilePage } from '../profile/profile';

//import { ProfilePage} from '../profile/profile';
import { FirebaseListObservable } from 'angularfire2/database';
import { Profile } from '../../models/profile/profile';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
peoplelist : FirebaseListObservable<any>;
profile = {} as Profile;

	@ViewChild('username') user;
	@ViewChild('password') password;

  constructor(private alertCtrl: AlertController,
     private fire: AngularFireAuth, public navCtrl: NavController, 
     public navParams: NavParams,
      public db: AngularFireDatabase) {
        this.peoplelist= db.list('/people');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser(fname,mphone,eemail,ppassword){ 
  this.createperson(fname,mphone,eemail,ppassword);
//this.showprofile();
      this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('got data ', data);
      this.fire.auth.currentUser.sendEmailVerification();
      this.alert('Registered!');
    })
    .catch(error => {
      console.log('got an error ', error);
      this.alert(error.message);
    });
  	console.log('Would register user with ', this.user.value, this.password.value);
  }

  createperson(fname,mphone,eemail,ppassword){ 
   // this.showprofile();
  this.peoplelist.push({
    name:fname, 
    phone:mphone,
    email : eemail,  
    password:ppassword
  }).then(newPerson =>{
    this.navCtrl.push('LoggedinPage');
  },error =>{console.log(error)}); 
}


} 