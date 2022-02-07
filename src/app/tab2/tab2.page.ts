import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { userLocationApi } from '../components/variables/variables.component';
const { Keyboard } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public array: string[];
  public next_page_url;

  public pedidos;

  loading: HTMLIonLoadingElement;

  constructor(private http: HTTP, 
              public loadingController: LoadingController,
              ) {
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    this.getPedidos();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async searchId(searchValue: string) {
    this.http.get(userLocationApi()+'searchpedidos', {'search': searchValue}, {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiMDhmYzhjM2E3MDI2ZWIyZTliYjkxNzZlMWEzNjI5MmYxNjViYjUwYWY2ODdjYTAzZTE2M2U1YzY5NjRkZWViMzIwNjQ2N2YzYzE3NGU0NTYiLCJpYXQiOiIxNjE0Mjg5MjExLjQxMjY5MCIsIm5iZiI6IjE2MTQyODkyMTEuNDEyNjk2IiwiZXhwIjoiMTY0NTgyNTIxMS40MDU1OTEiLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.n1hNW52g8qxLHf88VmG8KajYUc8V7x-wPIwdbgU8Wwzhlvaf9g6T8dVNRF5lyu1sJiCA-VeuW3URx0_IiSI2IjXWlHg2hewg72jIQ13yCnbjOcA_mTGOCVUDMm6Yz_cbI0hyzgtBSWk8s8sSqdc43wjn3R881-MaMUajTR0ZtR50S-5BJqe4S4y8C8Dq8z6izsa9bmyLG3CclGiQ1PenIhuAfLZuYSIIo-HmLSNRB4AD9Bxejh5x0YRMUXuRqdkq6YKjhcmqBBP74QGWjlNjLur9u2q8STEbznFBbYJo7fl_GVZ09sjE5bTEvl2gRTxv8MkQ9bxZFVrE6-wRYA3EyaBt4ZM4WhyUDQQ4Cu7usgfX7R3CLWJksOgUCVUCYHTWBErgvmfi7-UGppuf6LkIVrNYG5LyhmtSPcJ80FaoFXdGRjur-e5-XJEmyssFFLshxKu_in5uABmbj1Ps7A1U5Ow4XgTBf8I3zFl0z-LBA0lHJRT0rZ4T12w7ib0SVHBAb1Mfdem05fGR4ZH6ymho2r0Nw8gzC2XbbgH2yKGcOd2EHv2e5JsKin_A7oDSWkqsRmKFck65N4fsG0o1ooGo99gqmOakB4pO4z34tJroKYUiTgxCD6FxRxbdYfE7rqz_d2ZbaGbQTro2L1EgokxqKC2O345ShPiHdawmudm3RQE'})
      .then(data => {

        console.log(data.status);
        let obj = JSON.parse(data.data);
        console.log(obj.current_page); // data received by server
        this.array = obj.data;
        this.next_page_url = obj.next_page_url;
  
        console.log(data.headers);
        
        console.log('Loading dismissed!');

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  async searchIdKeyboardHide() {
  
      Keyboard.hide();

  }

  async getPedidos() {

    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await this.loading.present();

    this.http.get(userLocationApi()+'listapedidos', {}, {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiMDhmYzhjM2E3MDI2ZWIyZTliYjkxNzZlMWEzNjI5MmYxNjViYjUwYWY2ODdjYTAzZTE2M2U1YzY5NjRkZWViMzIwNjQ2N2YzYzE3NGU0NTYiLCJpYXQiOiIxNjE0Mjg5MjExLjQxMjY5MCIsIm5iZiI6IjE2MTQyODkyMTEuNDEyNjk2IiwiZXhwIjoiMTY0NTgyNTIxMS40MDU1OTEiLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.n1hNW52g8qxLHf88VmG8KajYUc8V7x-wPIwdbgU8Wwzhlvaf9g6T8dVNRF5lyu1sJiCA-VeuW3URx0_IiSI2IjXWlHg2hewg72jIQ13yCnbjOcA_mTGOCVUDMm6Yz_cbI0hyzgtBSWk8s8sSqdc43wjn3R881-MaMUajTR0ZtR50S-5BJqe4S4y8C8Dq8z6izsa9bmyLG3CclGiQ1PenIhuAfLZuYSIIo-HmLSNRB4AD9Bxejh5x0YRMUXuRqdkq6YKjhcmqBBP74QGWjlNjLur9u2q8STEbznFBbYJo7fl_GVZ09sjE5bTEvl2gRTxv8MkQ9bxZFVrE6-wRYA3EyaBt4ZM4WhyUDQQ4Cu7usgfX7R3CLWJksOgUCVUCYHTWBErgvmfi7-UGppuf6LkIVrNYG5LyhmtSPcJ80FaoFXdGRjur-e5-XJEmyssFFLshxKu_in5uABmbj1Ps7A1U5Ow4XgTBf8I3zFl0z-LBA0lHJRT0rZ4T12w7ib0SVHBAb1Mfdem05fGR4ZH6ymho2r0Nw8gzC2XbbgH2yKGcOd2EHv2e5JsKin_A7oDSWkqsRmKFck65N4fsG0o1ooGo99gqmOakB4pO4z34tJroKYUiTgxCD6FxRxbdYfE7rqz_d2ZbaGbQTro2L1EgokxqKC2O345ShPiHdawmudm3RQE'})
      .then(data => {

        console.log(data.status);
        let obj = JSON.parse(data.data);
        console.log(obj.current_page); // data received by server
        this.array = obj.data;
        this.next_page_url = obj.next_page_url;
  
        console.log(data.headers);
        
        this.loading.dismiss();
        console.log('Loading dismissed!');

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
      
  }

  async loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.http.get(this.next_page_url, {}, {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiMDhmYzhjM2E3MDI2ZWIyZTliYjkxNzZlMWEzNjI5MmYxNjViYjUwYWY2ODdjYTAzZTE2M2U1YzY5NjRkZWViMzIwNjQ2N2YzYzE3NGU0NTYiLCJpYXQiOiIxNjE0Mjg5MjExLjQxMjY5MCIsIm5iZiI6IjE2MTQyODkyMTEuNDEyNjk2IiwiZXhwIjoiMTY0NTgyNTIxMS40MDU1OTEiLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.n1hNW52g8qxLHf88VmG8KajYUc8V7x-wPIwdbgU8Wwzhlvaf9g6T8dVNRF5lyu1sJiCA-VeuW3URx0_IiSI2IjXWlHg2hewg72jIQ13yCnbjOcA_mTGOCVUDMm6Yz_cbI0hyzgtBSWk8s8sSqdc43wjn3R881-MaMUajTR0ZtR50S-5BJqe4S4y8C8Dq8z6izsa9bmyLG3CclGiQ1PenIhuAfLZuYSIIo-HmLSNRB4AD9Bxejh5x0YRMUXuRqdkq6YKjhcmqBBP74QGWjlNjLur9u2q8STEbznFBbYJo7fl_GVZ09sjE5bTEvl2gRTxv8MkQ9bxZFVrE6-wRYA3EyaBt4ZM4WhyUDQQ4Cu7usgfX7R3CLWJksOgUCVUCYHTWBErgvmfi7-UGppuf6LkIVrNYG5LyhmtSPcJ80FaoFXdGRjur-e5-XJEmyssFFLshxKu_in5uABmbj1Ps7A1U5Ow4XgTBf8I3zFl0z-LBA0lHJRT0rZ4T12w7ib0SVHBAb1Mfdem05fGR4ZH6ymho2r0Nw8gzC2XbbgH2yKGcOd2EHv2e5JsKin_A7oDSWkqsRmKFck65N4fsG0o1ooGo99gqmOakB4pO4z34tJroKYUiTgxCD6FxRxbdYfE7rqz_d2ZbaGbQTro2L1EgokxqKC2O345ShPiHdawmudm3RQE'})
      .then(data => {

        console.log(data.status);
        let obj = JSON.parse(data.data);
        console.log(obj.current_page); // data received by server

        this.array = this.array.concat(obj.data);
        //this.array = obj.data;
        this.next_page_url = obj.next_page_url;
  
        console.log(data.headers);
        
        console.log('Loading dismissed!');

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  }

  ngOnInit(): void {
    
    this.getPedidos();
    
  }

}
