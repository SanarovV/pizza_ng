import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // использование общего сервиса
  product: string = '';
  constructor() { }
}
