import { Component } from '@angular/core';
import { Location } from "@angular/common";

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins, 
  PushNotification,
  PushNotificationActionPerformed } from '@capacitor/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
const { App, PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private location: Location,
    private router: Router,
    private nativeAudio: NativeAudio
  ) {
    this.initializeApp();

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Handler was called!');
      
      if(this.router.url === '/tabs/tab1' || this.router.url === '/login'){
        App.exitApp();
      }else{
        this.location.back();
      }

    });
  }

  initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.initializeFirebase();

        //if(5>0) { // if not login
        //this.router.navigateByUrl('/login');
        /*}else{ // if login
        this.router.navigateByUrl('/app');
      }*/
    });
  }
  
  getTokenApi(){
     
  }

  initializeFirebase(){

    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
    
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        this.nativeAudio.preloadSimple('uniqueId1', 'public/assets/pedido.wav');
        this.nativeAudio.play('uniqueId1');
        alert('Agora Mesmo Foi realizado um novo pedido pelo Site...');
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
        this.router.navigate(['/tabs/tab2']);
      },
    );

    }
}