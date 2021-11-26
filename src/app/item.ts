import { List } from "./list";

export interface Item {
  id: number;
  listId: number;
  list?: List;
  description: string;
  date: Date;
  status: boolean;
}
