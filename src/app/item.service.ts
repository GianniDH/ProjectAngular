import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private httpClient: HttpClient) { }

    getItems(): Observable<Item[]> {
        return this.httpClient.get<Item[]>("http://localhost:3000/items?_expand=list&_sort=date&_order=asc");
    }

    getItemsDescription(): Observable<Item[]> {
        return this.httpClient.get<Item[]>("http://localhost:3000/items?_expand=list&_sort=description&_order=asc");
    }

    getItemById(id: number): Observable<Item> {
        return this.httpClient.get<Item>("http://localhost:3000/items/" + id);
    }

    postItem(item: Item): Observable<Item> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.post<Item>("http://localhost:3000/items", item, {headers: headers});
    }

    putItem(id:number, item: Item): Observable<Item> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<Item>("http://localhost:3000/items/" + id, item, {headers: headers});
    }

    deleteItem(id: number): Observable<Item> {
        return this.httpClient.delete<Item>("http://localhost:3000/items/" + id);
    }
}