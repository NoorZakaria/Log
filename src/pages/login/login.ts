import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';
//import { ProfilePage} from '../profile/profile';
//import {Tab1Page} from '../tab1/tab1';
import {RegisterPage} from '../register/register';
import{SettingPage}from '../setting/setting';
import {TabsPage} from '../tabs/tabs';
import {HomePage} from '../home/home';
//import{AppPage}from 'src/app/app.html';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile/profile';
import { FirebaseDatabase } from '@firebase/database-types';
import { ProfilePage } from '../profile/profile';
import { firebaseAuth } from '../../app/app.module';
import { UsersServiceProvider} from '../../providers/users-service/users-service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
    email:'',
    password : ''
  };
  getInfo={
    id:'',
    name:'',
    email:'',
    loggedin: false

  }
profile = {} as Profile;
	@ViewChild('username') user;
	@ViewChild('password') password;

  constructor(private alertCtrl: AlertController, private fire:AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams,
     private db:AngularFireDatabase,public loadingCtrl: LoadingController
    /*private userService:UsersServiceProvider*/) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
/*
  signOn(){
    if (!this.login.email || this.login.password){
      console.log('you must enter email and password');
    }
    else {
      this.userService.logOn(this.login.email,this.login.password)
      .then(returned=>{
        if(this.userService.success){
          this.navCtrl.push(ProfilePage);
        }
        else {
          this.login.email='';
          this.login.password='';
        }
      })
    }
  }*/
  signInUser() {

    this.fire.auth.signInWithEmailAndPassword(this.user.value , this.password.value)
    .then( data => {
      console.log('got some data', this.fire.auth.currentUser);
      this.alert('Success! You\'re logged in');
      var id= this.fire.auth.currentUser.uid;
      var email= this.fire.auth.currentUser.email;
      //var name= this.fire.auth.currentUser.;

console.log(id);
console.log(email);
console.log(name);

     // this.getInfo.name=data.vk.dispalyname
      this.getInfo.id=id;
      this.getInfo.email=email; 
      this.getInfo.loggedin=true;
      
      this.navCtrl.setRoot(LoggedinPage,{
        //name:this.getInfo.name,
        id: this.getInfo.id,
        email:this.getInfo.email,
        loggedin:this.getInfo.loggedin
      });

    })   
    .catch( error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
    console.log('Would sign in with ', this.user.value, this.password.value);
  this.presentLoading();
 
  }

  /*showprofile(){
    this.fire.authState.take(1).subscribe(auth => { 
      this.db.object('people/'+auth.uid).set(this.profile)
      .then(()=> this.navCtrl.setRoot('ProfilePage'))
    })
    }*/


    presentLoading() {
      this.loadingCtrl.create({
        content: 'Please wait...',
        duration: 3000,
        dismissOnPageChange: true
      }).present();
    }

  register() { 
  	this.navCtrl.push('RegisterPage');
  }
}