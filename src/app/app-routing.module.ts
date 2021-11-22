import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { ListFormComponent } from './list-form/list-form.component';
import { ListListComponent } from './list-list/list-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item', component: ItemComponent },
  { path: 'admin/item', component: ItemListComponent },
  { path: 'admin/item/form', component: ItemFormComponent },
  { path: 'admin/list', component: ListListComponent },
  { path: 'admin/list/form', component: ListFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
