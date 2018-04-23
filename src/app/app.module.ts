 import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component'; 
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact'; 
import { HomePage } from '../pages/home/home'; 
import { TabsPage } from '../pages/tabs/tabs'; 
//import { AngularFireDatabase} from 'angularfire2/database';     
import { StatusBar } from '@ionic-native/status-bar'; 
import { SplashScreen } from '@ionic-native/splash-screen';  
import { IonicImageViewerModule} from 'ionic-img-viewer';   
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth'; 
import { AngularFireModule } from 'angularfire2';   
//import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login'; 
import { LoggedinPage } from '../pages/loggedin/loggedin'; 
//import { ProfilePage} from '../pages/profile/profile'; 
import { Geolocation } from '@ionic-native/geolocation'; 
import {AngularFireList} from 'angularfire2/database';     
import {AngularFireDatabase} from 'angularfire2/database';      
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {LoginPageModule} from '../pages/login/login.module'; 
import {RegisterPageModule} from '../pages/register/register.module';
import {TabsPageModule} from '../pages/tabs/tabs.module';
import { LoggedinPageModule } from '../pages/loggedin/loggedin.module';
import { ResturantPage } from '../pages/resturant/resturant';
import {ResturantPageModule} from '../pages/resturant/resturant.module';
import { SettingPage } from '../pages/setting/setting';
import { OrderPage } from '../pages/order/order';
import { CartPage } from '../pages/cart/cart';  
import { LogoutPage } from '../pages/logout/logout';
import { MenuPage } from '../pages/menu/menu';
import { MenuPageModule } from '../pages/menu/menu.module';
import { CartPageModule } from '../pages/cart/cart.module';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestPage } from '../pages/test/test';
import { Camera } from '@ionic-native/camera';
import { TestPageModule } from '../pages/test/test.module';
import { OrderPageModule } from '../pages/order/order.module';
import { EditPage } from '../pages/edit/edit';
import { EditPageModule } from '../pages/edit/edit.module';
import { SettingPageModule } from '../pages/setting/setting.module';
import{PlacePage} from '../pages/place/place';
import {TabePage} from '../pages/tabe/tabe';
import { Device } from '@ionic-native/device';
import { RoomPage } from '../pages/room/room';
//import { UsersServiceProvider } from '../providers/users-service/users-service';
export const firebaseAuth =  
{

        apiKey: "AIzaSyCs4Qni-uWpCrb1bHy8qJ8KWoSyw7z5dyo",
      authDomain: "fir-auth-a6780.firebaseapp.com",
      databaseURL: "https://fir-auth-a6780.firebaseio.com",
      projectId: "fir-auth-a6780",
      storageBucket: "fir-auth-a6780.appspot.com",
      messagingSenderId: "554680742007"  
    };   
  
@NgModule({  
  declarations: [  
    MyApp, 
    AboutPage,  
    ContactPage,
    HomePage, 
  // SettingPage, 
   //OrderPage,
   //CartPage, 
   LogoutPage,
   PlacePage,
   TabePage,
   RoomPage
  // EditPage
   //TestPage
//ProfilePage
   //MenuPage  
 
  ],
  imports: [ 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    IonicImageViewerModule, 
    AngularFireDatabaseModule, 
    LoginPageModule , 
    RegisterPageModule,
    TabsPageModule,
    LoggedinPageModule,
    ResturantPageModule,
    MenuPageModule,
    CartPageModule,
    ProfilePageModule,
    HttpClientModule,
   HttpModule,
   TestPageModule,
   OrderPageModule,
   EditPageModule,
   SettingPageModule
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,  
    TabsPage,
    RegisterPage,
    LoginPage,
    LoggedinPage,
    TabsPage,
    ResturantPage, 
    SettingPage,
   OrderPage,    
   CartPage,
   LogoutPage,
   MenuPage,
   ProfilePage,
   TestPage,
   EditPage,
   PlacePage,
   TabePage,
   RoomPage
  ], 
  providers: [
    AngularFireAuth, 
    Geolocation,
    StatusBar,  
    SplashScreen,
    Camera,
    Device,
    AngularFireDatabase, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ] 
})

export class AppModule {}
