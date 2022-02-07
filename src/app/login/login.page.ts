import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Plugins,
  PushNotificationToken} from '@capacitor/core';
import { userLocationApi } from '../components/variables/variables.component';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
const { PushNotifications } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:any;
  password:any;
  loading: HTMLIonLoadingElement;
  tokenApi;
  tokenPush;

  constructor(
    private sqlite: SQLite,
    private http: HTTP,
    public loadingController: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async login(){

    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await this.loading.present();

    this.initializePushNotification();
    
  }

  initializePushNotification(){
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log(token.value);
        alert('Push registration success, token: ' + token.value);
        this.tokenPush = token.value;

        this.getTokenApi();

      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });
  }

  getTokenApi(){
    this.http.post(userLocationApi()+'authadmin/login', {email: this.email, password: this.password}, {})
      .then(data => {

        console.log(data.status);
        let obj = JSON.parse(data.data);
        console.log(obj.access_token); // data received by server
        
        this.tokenApi = obj.token_type+" "+obj.access_token;

        this.createDatabaseSqlite();

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  createDatabaseSqlite(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    
      db.executeSql('create table data(id INTEGER PRIMARY KEY ASC, tokenApi TEXT, tokenPush TEXT)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
      
      db.executeSql('insert or replace into data(id, tokenApi, tokenPush) values(?, ?, ?)', [1, this.tokenApi, this.tokenPush])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    
    })
    .catch(e => console.log(e));

    this.loading.dismiss();

    console.log(this.tokenApi+"+++++++++"+this.tokenPush);

    this.router.navigateByUrl('/tabs/tab1');
  }

}
