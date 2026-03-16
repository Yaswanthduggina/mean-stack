import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkStoredToken();
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  register(name: string, email: string, password: string, role: string, phone?: string, address?: string): Observable<any> {
    return this.http.post<{token: string, user: any}>(`${this.apiUrl}/register`, {
      name, email, password, role, phone, address
    }).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{token: string, user: any}>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private checkStoredToken(): void {
    const token = this.getToken();
    if (token) {
      this.getCurrentUser().subscribe(
        (user: any) => this.currentUserSubject.next(user),
        () => this.logout()
      );
    }
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUserValue(): any {
    return this.currentUserSubject.value;
  }
}
