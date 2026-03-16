import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeTab = 'products';
  products: any[] = [];
  orders: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getFarmerProducts().subscribe(
      data => {
        this.products = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Failed to load products';
      }
    );
  }

  loadOrders(): void {
    this.loading = true;
    this.errorMessage = '';

    this.orderService.getFarmerOrders().subscribe(
      data => {
        this.orders = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Failed to load orders';
      }
    );
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'orders') {
      this.loadOrders();
    }
  }

  editProduct(productId: string): void {
    this.router.navigate(['/product-form', productId]);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.loadProducts();
          alert('Product deleted successfully');
        },
        error => {
          alert('Failed to delete product');
        }
      );
    }
  }

  addProduct(): void {
    this.router.navigate(['/product-form']);
  }

  updateOrderStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      () => {
        this.loadOrders();
        alert('Order status updated');
      },
      error => {
        alert('Failed to update order status');
      }
    );
  }

  getTotalProducts(): number {
    return this.products.length;
  }

  getTotalOrders(): number {
    return this.orders.length;
  }

  getTotalRevenue(): number {
    return this.products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
  }
}
