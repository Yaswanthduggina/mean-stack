import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  quantity = 1;
  loading = false;
  errorMessage = '';
  isLoggedIn = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe(
      data => {
        this.product = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Failed to load product';
      }
    );
  }

  addToCart(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.quantity > this.product.stock) {
      alert('Quantity exceeds available stock');
      return;
    }

    const cartItem: CartItem = {
      productId: this.product._id,
      productName: this.product.name,
      price: this.product.price,
      quantity: this.quantity
    };

    this.cartService.addToCart(cartItem);
    alert(`${this.quantity}x ${this.product.name} added to cart!`);
    this.router.navigate(['/cart']);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
