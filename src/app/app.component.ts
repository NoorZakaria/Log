import { Component,ViewChild } from '@angular/core';
import { Platform ,Nav,Navbar,NavController,NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {LogoutPage} from '../pages/logout/logout';
import{LoggedinPage} from '../pages/loggedin/loggedin';
import { ResturantPage } from '../pages/resturant/resturant';
import { SettingPage } from '../pages/setting/setting';
import { OrderPage } from '../pages/order/order';
import { CartPage } from '../pages/cart/cart';
import { Profile } from '../models/profile/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Observable } from 'rxjs/Observable';
@Component({
  templateUrl: 'app.html' 
})  
export class MyApp {
 
 
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon:string}>;
  item: Observable<any>;

  constructor(public platform: Platform, public statusBar: StatusBar,
     public splashScreen: SplashScreen, private db: AngularFireDatabase,
    public ofAuth : AngularFireAuth,private toast:ToastController) {
    this.initializeApp();
    //this.item = db.object('people').valueChanges();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Restaurant', component: ResturantPage, icon:'restaurant' },
      { title: 'My Cart', component: CartPage, icon:'cart' },
      { title: 'Orders', component: OrderPage, icon:'list-box' },
      { title: 'Settings', component: SettingPage, icon:'settings' },
      { title: 'Logout', component: LogoutPage, icon:'log-out' }

    ];

  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
