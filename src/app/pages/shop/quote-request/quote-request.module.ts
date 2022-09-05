import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteRequestPageRoutingModule } from './quote-request-routing.module';

import { QuoteRequestPage } from './quote-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuoteRequestPageRoutingModule
  ],
  declarations: [QuoteRequestPage]
})
export class QuoteRequestPageModule {}
