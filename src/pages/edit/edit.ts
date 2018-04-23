import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingPage } from '../setting/setting';
import { User } from '../../models/user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  user = {} as User;
  profileData: AngularFireObject<User>;
  item: Observable<User>;
  itemRef: AngularFireObject<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db:AngularFireDatabase,public ofAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }
  ionViewWillLoad() {
    this.ofAuth.authState.take(1).subscribe(ofAuth => {
      if (ofAuth && ofAuth.email && ofAuth.uid) {
      

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
        console.log('error');
      }
    })
  }
  cancel (){
    this.navCtrl.setRoot(SettingPage);
  }
  
 async save(user : User){
  this.ofAuth.authState.take(1).subscribe (auth=>{
    this.db.object('people/' + auth.uid).update(user)
    .then(()=> this.navCtrl.push('SettingPage'));
  }) 

  }
}
