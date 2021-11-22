import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';
import {Subscription} from 'rxjs';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isThroughList: boolean = false;
  itemId: number = 0;

  item: Item = { id: 0, listId: 0, description: "", date: new Date(), status: true};

  isSubmitted: boolean = false;
  errorMessage: string = "";

  item$: Subscription = new Subscription();
  lists$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  lists: List[] = [];
  
  constructor(private router: Router, private listService: ListService, private itemService: ItemService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.itemId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.itemId != null && this.itemId > 0) {
      this.item$ = this.itemService.getItemById(this.itemId).subscribe(result => this.item = result);
    }

  }

  ngOnInit(): void {
    this.lists$ = this.listService.getLists().subscribe(result => {
      this.lists = result;
    });
  }

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
    this.lists$.unsubscribe();

  }

  back(): void {
    window.history.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postItem$ = this.itemService.postItem(this.item).subscribe(result => {
                //all went well
                window.history.back();
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putItem$ = this.itemService.putItem(this.itemId, this.item).subscribe(result => {
                //all went well
                window.history.back();
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

}