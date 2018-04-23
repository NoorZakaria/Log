import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';
import { AboutPage } from '../about/about';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  public name;
  // public nickname;
    itemRef: AngularFireObject<any>;
  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AngularFireAuth,
    private db: AngularFireDatabase) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
    this.auth.authState.take(1).subscribe(ofAuth => {
  
      this.itemRef = this.db.object('people/' + ofAuth.uid);
      this.itemRef.snapshotChanges().subscribe(action => {
      //console.log(action.type);
      //console.log(action.key)
      console.log(action.payload.val().type)
      this.name = action.payload.val().name;   
  });
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

 

  joinRoom(key) {
    this.navCtrl.setRoot(AboutPage, {
      key:key,
      nickname:this.name
    });
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
