import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

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
  menulistref$:Observable<any[]>;
  items: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
  /*  this.firstParam = navParams.get("menu");
    this.SecondParam = navParams.get("pic");
    this.ThirdParam = navParams.get("cost");
    let name = this.firstParam;
    let img = this.SecondParam;
    let price = this.ThirdParam;
    this.items = [
      name,
      img,
      price];*/
      this.menulistref$ =db.list('/cart').valueChanges();


    }
  
add(item){
  console.log(item);
}
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
