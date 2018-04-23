import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireList} from 'angularfire2/database';  
import {AngularFireDatabase} from 'angularfire2/database';   
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import{CartPage} from '../cart/cart';
import {PizzatimePage} from '../pizzatime/pizzatime';
import { ResturantItem } from '../../models/resturant-item/resturant-item.interface';
@IonicPage()
@Component({
  selector: 'page-resturant',
  templateUrl: 'resturant.html',
})
export class ResturantPage {  
  items: any; 

  resturantListRef$: Observable<any[]>;

  menulistref$:Observable<any[]>;
constructor(public navCtrl: NavController, public navParams:NavParams, 
  private database:AngularFireDatabase,public db: AngularFireDatabase) {
//pointing resturanstlistref ar firebase to rests
  this.resturantListRef$ =db.list('/rests').valueChanges();
}
ionViewDidLoad() {
  console.log('ionViewDidLoad ResturantPage');
}
cart (){
  this.navCtrl.setRoot('CartPage');
}
page (item){
  console.log(item);
 // this.menulistref$= this.db.list('/item').valueChanges();
  this.navCtrl.setRoot('MenuPage',{
menu:item
  });
  //console.log(menu);
}
getItems(ev) {
  // Reset items back to all of the items
  //this.initializeItems();

  // set val to the value of the ev target
  var val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.items = this.items.filter((resturantListRef$) => {
      return (resturantListRef$.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}

}
 