import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  address = '';
  role = 'customer';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    if (!this.name || !this.email || !this.password || !this.role) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.name, this.email, this.password, this.role, this.phone, this.address).subscribe(
      response => {
        this.loading = false;
        this.router.navigate([this.role === 'farmer' ? '/farmers/dashboard' : '/products']);
      },
      error => {
        this.loading = false;
        this.errorMessage = error.error.message || 'Registration failed';
      }
    );
  }
}
