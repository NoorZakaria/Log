import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { LoggedinPage } from '../loggedin/loggedin';
import { ProfilePage } from '../profile/profile';
import { TestPage } from '../test/test';

//import { ProfilePage} from '../profile/profile';
import { AngularFireList } from 'angularfire2/database';
import { Profile } from '../../models/profile/profile';
import { User } from '../../models/user';
import { ChildrenNode } from '@firebase/database/dist/esm/src/core/snap/ChildrenNode';
import { Subject } from 'rxjs/Subject';



@IonicPage()
@Component({ 
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  peoplelist: AngularFireList<any>;
  profile = {} as Profile;
user = {} as User;
  //@ViewChild('username') user;
  //@ViewChild('password') password;

  constructor(private alertCtrl: AlertController,
    public fire: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
    this.peoplelist = db.list('/people');

  // this.test();
      this.peoplelist.snapshotChanges(['child_changed'])
      .subscribe(actions => {
        actions.forEach(action => {
      //    console.log(action.type);
          console.log(action.key);
          console.log(action.payload.val().type);

        });
      });
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

 async registerUser(user:User) {
       
         const result = await this.fire.auth.createUserWithEmailAndPassword(user.email,user.password);
      console.log(result);
        
this.createprofile();
    //this.showprofile();
   /* this.fire.auth.createUserWithEmailAndPassword(user.email,user.password)
      .then(data => {
        console.log('got data ', data);
        //this.fire.auth.currentUser.sendEmailVerification();
        this.alert('Registered!');
      })
      .catch(error => {
        console.log('got an error ', error);
        this.alert(error.message);
      });*/ 
  //  console.log('Would register user with ', this.user.value, this.password.value);
  //  this.createperson(fname, mphone, eemail, ppassword);

  }
  createprofile(){
    this.fire.authState.take(1).subscribe (auth=>{
      this.db.object('people/' + auth.uid).set(this.user)
      .then(()=> this.navCtrl.push('TestPage'));
    })
  }
 
 /* test(){
    this.fire.authState.take(1).subscribe (auth=>{
      this.db.object<User>('/people'+auth.uid).valueChanges().subscribe(item => console.log(item));
     // .then(()=> this.navCtrl.push('LoggedinPage'));
    })
  }*/
   // this.item$ = this.db.object<Item>('/people'+auth.uid).valueChanges().subscribe(item => console.log(item));

   /* const size$ = new Subject<User>();
    const queryObservable = size$.switchMap(size =>
    this.db.list('/people'+this.fire.auth.currentUser.uid,
     ref => ref.orderByChild('type').equalTo(this.user.type)).valueChanges()
    );   
    // subscribe to changes
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);  
    });*/
  
  
  //createperson(fname, mphone, eemail, ppassword) {
      // this.showprofile();
      /*   this.peoplelist.push({
           name: fname,
           phone: mphone,
           email: eemail,
           password: ppassword
         }).then(newPerson => {
           this.navCtrl.push('LoggedinPage');
         }, error => { console.log(error) });*/
      /*   this.peoplelist.set(this.fire.auth.currentUser.uid,
      {
        name: fname,
        phone: mphone,
        email: eemail,
        password: ppassword, 
        uid: this.fire.auth.currentUser.uid
      }).then(newPerson => {
        this.navCtrl.push('LoggedinPage');
      }, error => { console.log(error) });
  }
*/
 
 // } 
}