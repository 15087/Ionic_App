import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },

  {
    path: 'add-category',
    loadChildren: () => import('./pages/add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'categories/:id',
    loadChildren: () => import('./pages/edit-category/edit-category.module').then( m => m.EditCategoryPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./pages/notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'notes/:id',
    loadChildren: () => import('./pages/note-details/note-details.module').then( m => m.NoteDetailsPageModule)
  },
  {
    path: 'add-note',
    loadChildren: () => import('./pages/add-note/add-note.module').then( m => m.AddNotePageModule)
  },
  {
    path: 'notes/:id/edit',
    loadChildren: () => import('./pages/edit-note/edit-note.module').then( m => m.EditNotePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: "reload" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
