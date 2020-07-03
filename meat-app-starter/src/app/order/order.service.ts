import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Order, OrderItem } from "./order.model";
import { MEAT_API } from "app/app.api";
import 'rxjs/add/operator/map'

@Injectable()
export class OrderService {
    
    constructor(private cartService : ShoppingCartService, private http: Http) {}

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)

    }

    remove(item: CartItem) {
       this.cartService.removeitem(item)
      }

      itemsValue(): number {
          return this.cartService.total()
      }

      clear() {
          this.cartService.clear()
      }

      checkOrder(order: Order) : Observable<string>{
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`, 
                               JSON.stringify(order), 
                               new RequestOptions({headers: headers}))
                               .map(reesponse=> reesponse.json())
                               .map(order => order.id)
      }

}