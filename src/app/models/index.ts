export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  balance: number;
  email: string;
  id: number;
  name: string;
}

export interface User {
  id: string,
  name: string
}

export interface UserInfo {
  user_info_token: {
    id: number,
    name: string,
    email: string,
    balance: number
  }
}
export interface TransactionItem {
  amount: number,
  balance: number,
  date: "string",
  id: number,
  username: "string"
}

export interface Transaction {
  trans_token: TransactionItem
}

export interface TransactionList {
  trans_token: TransactionItem[]
}

export enum STATUS {
  VALID = 'VALID',
  INVALID = 'INVALID',
}
