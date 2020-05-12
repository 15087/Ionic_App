import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCategoryPageRoutingModule } from './delete-category-routing.module';

import { DeleteCategoryPage } from './delete-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteCategoryPageRoutingModule
  ],
  declarations: [DeleteCategoryPage]
})
export class DeleteCategoryPageModule {}
