// import { Item } from './item.model';
export interface Invoice {
  // id: string,
  // status: string,
  // itemList: Item[]
  id: string,
  amount: number,
  purpose: string,
  redirect: string,
  status: string
}
