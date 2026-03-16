import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingAddress = '';
  paymentMethod = 'credit-card';
  notes = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  paymentMethods = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'net-banking', label: 'Net Banking' }
  ];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      if (items.length === 0) {
        this.router.navigate(['/products']);
      }
    });
  }

  getTotal(): number {
    return this.cartService.getCartTotal();
  }

  placeOrder(): void {
    if (!this.shippingAddress) {
      this.errorMessage = 'Please enter shipping address';
      return;
    }

    if (this.cartItems.length === 0) {
      this.errorMessage = 'Cart is empty';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const orderData = {
      products: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      totalPrice: this.getTotal(),
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod,
      notes: this.notes
    };

    this.orderService.createOrder(orderData).subscribe(
      response => {
        this.loading = false;
        this.successMessage = 'Order placed successfully!';
        this.cartService.clearCart();
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
      },
      error => {
        this.loading = false;
        this.errorMessage = error.error.message || 'Failed to place order';
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }
}
