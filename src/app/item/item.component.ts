import { Component, Input, OnInit } from "@angular/core";
import { Item } from "../item";
import { Router } from "@angular/router";
import { ItemService } from "../item.service";
import { Subscription } from "rxjs";
import { ListService } from "../list.service";
import { List } from "../list";
import { DatePipe, formatDate } from "@angular/common";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  viewProviders: [DatePipe],
})
export class ItemComponent implements OnInit {
  @Input() item: Item = {
    id: 0,
    listId: 0,
    description: "",
    date: new Date(),
    status: true,
  };

  constructor(
    private itemService: ItemService,
    private listService: ListService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.item$ = this.itemService
      .getItemById(this.itemId)
      .subscribe((result) => (this.item = result));
  }
  itemId: number = 0;

  items: Item[] = [];
  item$: Subscription = new Subscription();
  lists$: Subscription = new Subscription();

  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  errorMessage: string = "";

  lists: List[] = [];

  ngOnInit(): void {
    this.getItems();

    this.lists$ = this.listService.getLists().subscribe((result) => {
      this.lists = result;
    });
  }


  back(): void {
    window.history.back();
  }

  edit(id: number) {
    this.router.navigate(["admin/item/form"], {
      state: { id: id, mode: "edit" },
    });
  }

  delete(id: number) {
    if (
      confirm("Are you sure you want to delete " + this.item.description + "?")
    ) {
      this.deleteItem$ = this.itemService.deleteItem(id).subscribe(
        (result) => {
          this.getItems();
          window.location.reload();
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  onIsDone(value: boolean) {
    this.item.status = value;

    this.putItem$ = this.itemService.putItem(this.itemId, this.item).subscribe(
      (result) => {
        window.location.reload();
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  getItems() {
    this.items$ = this.itemService
      .getItems()
      .subscribe((result) => (this.items = result));
  }

  compare() {
    var myDate = formatDate(new Date(), "yyyy-MM-dd", "en-US");
    var date = formatDate(this.item.date, "yyyy-MM-dd", "en-US");

    if (myDate > date) {
      return "overdue";
    } else if (myDate == date) {
      return "today";
    } else {
      return "default";
    }
  }
}
