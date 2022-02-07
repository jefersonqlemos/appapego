import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';

@Component({
  selector: 'app-minha-toolbar',
  templateUrl: './minha-toolbar.component.html',
  styleUrls: ['./minha-toolbar.component.scss'],
})
export class MinhaToolbarComponent implements OnInit {

  constructor(
    private menu: MenuController
  ) {}

  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
