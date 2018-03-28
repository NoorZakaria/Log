import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{CartPage} from '../cart/cart';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-pizzatime',
  templateUrl: 'pizzatime.html',
})
export class PizzatimePage {
  peoplelist : FirebaseListObservable<any>;

  public quantity =1;
  public total =0;
  public firstParam; 
  resturantListRef$: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    db: AngularFireDatabase) {
      this.peoplelist= db.list('/cart');

      this.firstParam = navParams.get("menu");
    let name = this.firstParam;

    if(name == 'مشروبات ساخنة') {  
      this.resturantListRef$= db.list('/مشروبات ساخنة').valueChanges();

    } else if (name =='مشروبات باردة') 
    {
      this.resturantListRef$= db.list('/مشروبات باردة').valueChanges();
    }
    else if (name =='كرواسون') 
    {
      this.resturantListRef$= db.list('/كرواسون').valueChanges();

    }else if (name =='دونتس') 
    {
      this.resturantListRef$= db.list('/دونتس').valueChanges();
    }
     else if (name =='الاسبريسو') 
    {
    this.resturantListRef$= db.list('/الاسبريسو').valueChanges();
    }
    else if (name =='Beef Burger') 
    {
    this.resturantListRef$= db.list('/Beef Burger').valueChanges();
    }
    else if (name =='chicken Burger') 
    {
    this.resturantListRef$= db.list('/chicken Burger').valueChanges();
    }
    else if (name =='Cold Drinks') 
    {
    this.resturantListRef$= db.list('/Cold Drinks').valueChanges();
    }
    else if (name =='Chips') 
    {
    this.resturantListRef$= db.list('/Chips').valueChanges();
    }
    else if (name =='Beef Burger Meals') 
    {
    this.resturantListRef$= db.list('/Beef Burger').valueChanges();
    }
    else if (name =='Chicken Burger Meals') 
    {
    this.resturantListRef$= db.list('/Beef Burger').valueChanges();
    }
    else {
      this.resturantListRef$= db.list('/Beef Burger').valueChanges();
      
      
    }
    }
   /* addtocart(name,img,price){
      console.log(name,img,price);
   // this.menulistref$= this.db.list('/item').valueChanges();
    this.navCtrl.setRoot('CartPage',{
    menu:name,
    pic:img,
    cost:price
    });
    }*/
    addtocart(name,img,price){ 
      // this.showprofile();
     this.peoplelist.push({
       name:name, 
       img:img,
       price : price,  
       quan:this.quantity,
       totalprice:price
     }).then(newPerson =>{
       this.navCtrl.push('PizzatimePage');
     },error =>{console.log(error)}); 
   }

  cart (){ 
    this.navCtrl.setRoot('CartPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PizzatimePage');
  }

}
