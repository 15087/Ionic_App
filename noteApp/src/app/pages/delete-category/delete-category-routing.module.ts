import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteCategoryPage } from './delete-category.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteCategoryPageRoutingModule {}
