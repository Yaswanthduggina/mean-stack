import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  loading = false;
  errorMessage = '';
  searchTerm = '';
  selectedCategory = '';
  categories = ['herbal-medicine', 'supplements', 'oils', 'powders', 'capsules'];
  isLoggedIn = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
        this.applyFilters();
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Failed to load products';
      }
    );
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCategory = !this.selectedCategory || product.category === this.selectedCategory;
      return matchSearch && matchCategory;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  addToCart(product: any): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    const cartItem: CartItem = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: 1
    };

    this.cartService.addToCart(cartItem);
    alert(`${product.name} added to cart!`);
  }

  viewDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
