import { MinhaToolbarComponent } from './minha-toolbar/minha-toolbar.component';
import { MeuMenuComponent } from './meu-menu/meu-menu.component';
import { VariablesComponent } from './variables/variables.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
  MinhaToolbarComponent,
  MeuMenuComponent,
  VariablesComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [
    COMPONENTS
  ],
})
export class ComponentsModule { }
