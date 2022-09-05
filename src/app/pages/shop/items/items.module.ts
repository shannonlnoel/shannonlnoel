import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsPageRoutingModule } from './items-routing.module';

import { ItemsPage } from './items.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../search.pipe';
import { SortPipe } from '../sort.pipe';
import { FilterPipe } from './filter-pipe.pipe';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsPageRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
      
  ],
  declarations: [ItemsPage,  SearchPipe,
    SortPipe,
    FilterPipe]
})
export class ItemsPageModule {}
