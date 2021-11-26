import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Item } from "../item";
import { ItemService } from "../item.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();

  errorMessage: string = "";

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.getItemsDone();
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.deleteItem$.unsubscribe();
  }

  add() {
    this.router.navigate(["admin/item/form"], { state: { mode: "add" } });
  }

  edit(id: number) {
    this.router.navigate(["admin/item/form"], {
      state: { id: id, mode: "edit" },
    });
  }

  delete(id: number) {
    this.deleteItem$ = this.itemService.deleteItem(id).subscribe(
      (result) => {
        this.getItemsDone();
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  getItemsDone() {
    this.items$ = this.itemService
      .getItemsDone()
      .subscribe((result) => (this.items = result));
  }
}
