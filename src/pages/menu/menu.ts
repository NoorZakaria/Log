import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{CartPage} from '../cart/cart';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {PizzatimePage} from '../pizzatime/pizzatime';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public firstParam; 
  menulistref$:Observable<any[]>;
  info$:Observable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    this.firstParam = navParams.get("menu");
    let name = this.firstParam;

    if(name == 'Pizza Time') {  
      this.menulistref$= this.db.list('/pizzahouse').valueChanges();
    } else if (name == 'B3+'){
      this.menulistref$= this.db.list('/B3+').valueChanges();
   }
   else if (name == '90s Burger'){
    this.menulistref$= this.db.list('/90s Burger').valueChanges();
    this.info$= this.db.list('/90').valueChanges();

 }
 else if (name == 'Pizza House'){
  this.menulistref$= this.db.list('/Pizza Time').valueChanges();
}
else if (name == 'شاورما الضيعة'){
  this.menulistref$= this.db.list('/شاورما الضيعة').valueChanges();
}
else if (name == 'ع الطريق'){
  this.menulistref$= this.db.list('/ع الطريق').valueChanges();
  this.info$= this.db.list('/الطريق').valueChanges();

}
   else {
    this.menulistref$= this.db.list('/90s Burger').valueChanges();
   }

  }
  cart (){
    this.navCtrl.setRoot('CartPage');
  }

  page (item){
    console.log(item);
   // this.menulistref$= this.db.list('/item').valueChanges();
    this.navCtrl.setRoot('PizzatimePage',{
  menu:item
    });
    //console.log(menu);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
