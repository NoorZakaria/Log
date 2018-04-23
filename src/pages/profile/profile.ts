import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseDatabase } from '@firebase/database-types';
//import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Firebase } from '@ionic-native/firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http'; 
import { DataSnapshot } from '@firebase/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { Camera } from '@ionic-native/camera';


@IonicPage() 
@Component({ 
  selector: 'page-profile',
  templateUrl: 'profile.html',
  inputs: ['Profile'],
 // providers: [UsersServiceProvider]
})
export class ProfilePage {
  //@Input() profileData: Observable<Profile[]>;
  profileData: AngularFireObject<User>;
  item: Observable<User>;
  shoppingList$: Observable<any[]>
  profile = {} as Profile;
  user = {} as User;
  private userDisplayName: any;
  getInfo = {
    id: '',
    userPhoto: '',
    email: '',
    loggedin: false

  }
  profilePicture: string;
  userp = {
    name: 'Marty Mcfly',
    imageUrl: 'assets/imgs/profile.png'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public ofAuth: AngularFireAuth,
    private toast: ToastController,
    private db: AngularFireDatabase,public camera: Camera


    ) {
  /*  this.getInfo.id = this.navParams.get('id')
    this.getInfo.email = this.navParams.get('email')
    this.getInfo.loggedin = this.navParams.get('loggedin')*/
  }


  /*displayUser(theUserId){
    var that = this;
    this.usersService.viewUser(theUserId).then(snapshot=>{
      that.userDisplayName.snapshot.val().name;
    })
  }*/ 

  ionViewWillLoad() {
    this.ofAuth.authState.take(1).subscribe(ofAuth => {
      if (ofAuth && ofAuth.email && ofAuth.uid) {
        this.toast.create({
          message: 'welcom' + "  " + ofAuth.email,
          duration: 3000
        }).present();

        this.profileData = this.db.object('people/' + ofAuth.uid);
        this.item = this.profileData.valueChanges();

      }

      else {
        this.toast.create({
          message: 'cant find auth deyails',
          duration: 3000
        }).present();
      }
    })
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logOut(){
this.navCtrl.setRoot('LoginPage');
  }

 /* toggleNotifications() {
    if (this.enableNotifications) {
      this.toastCtrl.create('Notifications enabled.');
    } else {
      this.toastCtrl.create('Notifications disabled.');
    }
  }*/

  updateImage(value) {
    this.profilePicture = 'data:image/jpeg;base64,' + value.val();
  }

  updateProfileImage() {
    this.camera.getPicture({
      quality: 50,
      allowEdit: true,
      cameraDirection: this.camera.Direction.FRONT,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.userp.imageUrl = imageData;
    }, (err) => {
      console.log('Error: ' + err);
    });
  }
}
