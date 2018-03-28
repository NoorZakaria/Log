import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth'; 
import { Geolocation} from '@ionic-native/geolocation';
//import {GoogleMaps,GoogleleMap} from '@ionic-native/google-maps';
//import { Device } from '@ionic-native/device';
import{CartPage} from '../cart/cart';


@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
}) 
export class LoggedinPage {
   
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  constructor(public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.initMap();
    });
  }
  cart (){
    this.navCtrl.setRoot('CartPage');
  }
  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/blue-bike.jpg';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
    });
  } 
  addMarker(location, image) {
    let marker = new google.maps.Marker({ 
      position: location,  
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }
  
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

}
 