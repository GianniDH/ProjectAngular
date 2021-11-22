import { Item } from "./item";

export interface List {
    id: number;
    title: string;
    category: string;
    items?: Item[];
}