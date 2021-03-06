import {FormGroup, FormBuilder} from '@angular/forms'

import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {


  orderForm: FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão de Refeição', value: 'REF'}
  ]


  constructor(private orderService: OrderService, 
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      emmail: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOptions: this.formBuilder.control('')
    })
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems() : CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: any) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: any) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item:CartItem)=> new OrderItem(item.quantity, item.menuItem.id))
      this.orderService.checkOrder(order)
        .subscribe((orderId: string) => {
          this.router.navigate(['/order-summary'])
          this.orderService.clear()}) 
    console.log(order)
  }

}
