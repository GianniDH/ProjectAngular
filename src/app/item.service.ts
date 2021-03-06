import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timer } from "rxjs";
import {switchMap} from "rxjs/operators";
import { Item } from "./item";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  getItems(): Observable<Item[]> {
    return timer(1, 1000).pipe(switchMap(() => this.httpClient.get<Item[]>("http://localhost:3000/items?_expand=list&_sort=date&_order=asc")));
  }

  getItemsDone(): Observable<Item[]> {
    return timer(1, 1000).pipe(switchMap(() => this.httpClient.get<Item[]>(
      "http://localhost:3000/items?_expand=list&_sort=status&_order=asc"
    )));
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:3000/items/" + id);
  }

  postItem(item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient.post<Item>("http://localhost:3000/items", item, {
      headers: headers,
    });
  }

  putItem(id: number, item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient.put<Item>(
      "http://localhost:3000/items/" + id,
      item,
      { headers: headers }
    );
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>("http://localhost:3000/items/" + id);
  }

  updateItemCB(itemID: number, value: boolean): Observable<Item> {
    return this.httpClient.patch<Item>("http://localhost:3000/items/" + itemID, {status: value})
  }
}
