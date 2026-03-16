import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  isEditMode = false;
  productId: string | null = null;
  product: any = {
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'supplements',
    tags: ''
  };
  loading = false;
  errorMessage = '';
  successMessage = '';
  categories = ['herbal-medicine', 'supplements', 'oils', 'powders', 'capsules', 'other'];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  loadProduct(): void {
    if (!this.productId) return;

    this.loading = true;
    this.productService.getProductById(this.productId).subscribe(
      data => {
        this.product = {
          ...data,
          tags: data.tags?.join(', ') || ''
        };
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Failed to load product';
      }
    );
  }

  saveProduct(): void {
    if (!this.product.name || !this.product.description || !this.product.price || this.product.stock === '') {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const productData = {
      name: this.product.name,
      description: this.product.description,
      price: parseFloat(this.product.price),
      stock: parseInt(this.product.stock),
      category: this.product.category,
      tags: this.product.tags ? this.product.tags.split(',').map((tag: string) => tag.trim()) : []
    };

    const request = this.isEditMode
      ? this.productService.updateProduct(this.productId!, productData)
      : this.productService.createProduct(productData);

    request.subscribe(
      response => {
        this.loading = false;
        this.successMessage = this.isEditMode ? 'Product updated successfully' : 'Product created successfully';
        if (!this.isEditMode) {
          this.product = {
            name: '',
            description: '',
            price: '',
            stock: '',
            category: 'supplements',
            tags: ''
          };
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = error.error.message || 'Failed to save product';
      }
    );
  }
}
