import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Cart } from '../../models/cart';
import{OrderPage} from '../order/order';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public firstParam;
  public SecondParam; 
  public ThirdParam;
 // menulistref$:Observable<any[]>;
  menulistref$: AngularFireList<any>;
  items: Observable<any[]>;

  //items: any[];
  getInfo = {
    name: '',
    img: '',
    price: ''
  }
  profileData: AngularFireObject<Cart>;
  item: Observable<Cart>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,
     public ofAuth : AngularFireAuth) {
   /*this.firstParam = navParams.get("menu");
    this.SecondParam = navParams.get("pic");
    this.ThirdParam = navParams.get("cost");
    let name = this.firstParam;
    let img = this.SecondParam;
    let price = this.ThirdParam;
    this.getInfo.name=name;
    this.getInfo.img=img;
    this.getInfo.price=price;*/

      this.menulistref$ =db.list('/cart');
     /* this.items = this.menulistref$.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });*/

    }
  
    ionViewWillLoad() {
      this.ofAuth.authState.take(1).subscribe(ofAuth => {
    
        if (ofAuth && ofAuth.email && ofAuth.uid) {
          this.profileData = this.db.object('cart/' + ofAuth.uid);
          this.item = this.profileData.valueChanges();
        }
   
        else {
         console.log('error');
        }
      })
    }
/*    
add(item){
  console.log(item);
}*/

delete() { 
 // console.log(item);
 this.ofAuth.authState.take(1).subscribe(ofAuth => {
  if (ofAuth && ofAuth.email && ofAuth.uid) {
    this.profileData = this.db.object('cart/' + ofAuth.uid);
    this.item = this.profileData.valueChanges();
    this.profileData.remove();

  }

  else {
   console.log('error'); 
  } 
})
//this.menulistref$.remove();
}
order(){
  this.navCtrl.push('OrderPage');
}
/*
remove() { 
  // console.log(item);
  this.ofAuth.authState.take(1).subscribe(ofAuth => {
   if (ofAuth && ofAuth.email && ofAuth.uid) {
     this.profileData.quan = this.db.object('cart/' + ofAuth.uid).update(this.profileData.quan+=1);
 
   }
 
   else {
    console.log('error');
   }
 })
 //this.menulistref$.remove();
 }
*/
/*
 add() { 
  // console.log(item);
  //var quantity=this.profileData.quan+1;
  this.db.object('cart/' + this.ofAuth.auth.currentUser.uid).update(this.profileData.quan+1);}*/

/*
  this.ofAuth.authState.take(1).subscribe(ofAuth => {
   if (ofAuth && ofAuth.email && ofAuth.uid) {
    this.profileData.quan = this.menulistref$.update(this.ofAuth.auth.currentUser.uid,{
      quantity
    });
 
   }
 
   else {
    console.log('error');
   }
 })*/
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
