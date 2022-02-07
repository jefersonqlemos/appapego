import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss'],
})

export class VariablesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}

export function userLocationApi(): string {
  return 'https://www.aapego.com.br/api/';
}

export function userLocationUrl(): string {
  return 'https://www.aapego.com.br';
}