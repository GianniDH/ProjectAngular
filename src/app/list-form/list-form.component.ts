import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { List } from "../list";
import { ListService } from "../list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-form",
  templateUrl: "./list-form.component.html",
  styleUrls: ["./list-form.component.scss"],
})
export class ListFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  listId: number = 0;

  list: List = { id: 0, title: "", category: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  list$: Subscription = new Subscription();
  postList$: Subscription = new Subscription();
  putList$: Subscription = new Subscription();

  constructor(private router: Router, private listService: ListService) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.mode === "add";
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.mode === "edit";
    this.listId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.listId != null && this.listId > 0) {
      this.list$ = this.listService
        .getListById(this.listId)
        .subscribe((result) => (this.list = result));
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.list$.unsubscribe();
    this.postList$.unsubscribe();
    this.putList$.unsubscribe();
  }

  back(): void {
    window.history.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postList$ = this.listService.postList(this.list).subscribe(
        (result) => {
          //all went well
          window.history.back();
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
    if (this.isEdit) {
      this.putList$ = this.listService
        .putList(this.listId, this.list)
        .subscribe(
          (result) => {
            //all went well
            window.history.back();
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
  }
}
