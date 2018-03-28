import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import {AlertController} from 'ionic-angular';
//import {Storage} from 'ionic-storage';
//import * firebase from 'Firebase';
import {Firebase} from '@ionic-native/firebase';

/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/ 
@Injectable()
export class UsersServiceProvider {
   items : FirebaseListObservable <any>;
   success:boolean;
  constructor(public http: HttpClient, 
    public database:AngularFireDatabase,
     public firebase:AngularFireAuth, private storage : Storage) {
  this.items = database.list('/people');
    console.log('Hello UsersServiceProvider Provider');
  }

  StorageControl(action, key?,value?){
    if (action == 'ser'){
      return this.storage.set(key,value);
    }
    if ( action =='get'){
      return this.storage.get(key);
    }
  }
  saveNewUser (user){
    let userObj = {
      creation : new Date().toDateString(),
      lastLogin : new Date().toLocaleString(),
      id:''
      
    }
    this.items.push({
      username:user,
      creation : userObj.creation,
      lastLogin:userObj.lastLogin
    })
    .then(res=>{
      userObj.id=res.key;
      return this.StorageControl('set',user,userObj);
    });
    return this.StorageControl('get',user);
  }

  updateUser(theUser,theUserData){
    let newData= {
      creation : theUserData.creation,
      lastLogin : new Date().toLocaleString(),
      id:theUserData.id
    }
    this.items.update(newData.id,{
      lastLogin : newData.lastLogin
    });
    return this.StorageControl('set',theUser,newData);
  }
  logOn(user,password){
    return this.firebase.auth.signInWithEmailAndPassword(user,password)
    .then (result=>{
      this.StorageControl('get',user)
      .then(returned=>{
        if (!returned){
          this.saveNewUser(user);
        }
        else {
          this.updateUser(user,returned)
          .then(updated=>console.log(user,updated))
        }
      })
      this.success=true;
      return result;
    })
    .catch(err=>{
      this.success=false;
      return err;
    });
  }
}
