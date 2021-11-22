import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ListService } from '../list.service';
import { List } from '../list';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items$: Observable<Item[]> = new Observable<Item[]>();
  lists$: Observable<List[]> = new Observable<List[]>();


  constructor(private itemService: ItemService, private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.items$ = this.itemService.getItems();
    this.lists$ = this.listService.getLists();
  }
  addItem() {
    //Navigate to form in add mode
    this.router.navigate(['admin/item/form'], {state: {mode: 'add'}});
  }
  addList() {
    //Navigate to form in add mode
    this.router.navigate(['admin/list/form'], {state: {mode: 'add'}});
  }
  

}