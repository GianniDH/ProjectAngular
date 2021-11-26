import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { List } from "../list";
import { Router } from "@angular/router";
import { ListService } from "../list.service";
import { Observable, Subscription } from "rxjs";
import { ItemService } from "../item.service";
import { Item } from "../item";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input() list: List = { id: 0, title: "", category: "" };

  constructor(
    private listService: ListService,
    private itemService: ItemService,
    private router: Router
  ) {
    this.list$ = this.listService
      .getListById(this.listId)
      .subscribe((result) => (this.list = result));
  }
  listId: number = 0;
  lists: List[] = [];
  list$: Subscription = new Subscription();
  lists$: Subscription = new Subscription();
  items$: Observable<Item[]> = new Observable<Item[]>();

  deleteList$: Subscription = new Subscription();
  putList$: Subscription = new Subscription();

  errorMessage: string = "";

  ngOnInit(): void {
    this.getLists();
    this.items$ = this.itemService.getItems();

    this.lists$ = this.listService.getLists().subscribe((result) => {
      this.lists = result;
    });
  }

  back(): void {
    window.history.back();
  }

  edit(id: number) {
    this.router.navigate(["admin/list/form"], {
      state: { id: id, mode: "edit" },
    });
  }

  delete(id: number) {
    if (
      confirm(
        "Are you sure you want to delete " +
          this.list.title +
          "? This will also delete all items in this list!"
      )
    ) {
      this.deleteList$ = this.listService.deleteList(id).subscribe(
        (result) => {
          this.getLists();
          window.location.reload();
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  getLists() {
    this.lists$ = this.listService
      .getLists()
      .subscribe((result) => (this.lists = result));
  }
}
