import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {List} from '../list';
import {ListService} from '../list.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.scss']
})
export class ListListComponent implements OnInit, OnDestroy {
  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteCategorie$: Subscription = new Subscription();
  color: string = "";


  errorMessage: string = '';

  constructor(private listService: ListService, private router: Router) {
  }

  ngOnInit(): void {
    this.getLists();
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteCategorie$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/list/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/list/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteCategorie$ = this.listService.deleteList(id).subscribe(result => {
      //all went well
      this.getLists();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => this.lists = result);
  }
}