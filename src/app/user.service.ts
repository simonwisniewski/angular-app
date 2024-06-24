import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private users: any[] = [];

  constructor(private http: HttpClient) {}

  fetchInitialUsers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.data),
      tap((users) => (this.users = users)),
      catchError(this.handleError<any[]>('fetchInitialUsers', []))
    );
  }

  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      map((response) => {
        const newId =
          this.users.length > 0
            ? Math.max(...this.users.map((u) => u.id)) + 1
            : 1;
        const newUser = {
          ...user,
          id: newId,
          avatar: user.avatar || 'default-avatar-url',
        };
        this.users.push(newUser);
        return newUser;
      }),
      catchError(this.handleError<any>('addUser'))
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user).pipe(
      map((response) => {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
        }
        return user;
      }),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`).pipe(
      map(() => {
        this.users = this.users.filter((u) => u.id !== userId);
        return userId;
      }),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
