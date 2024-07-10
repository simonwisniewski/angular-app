import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private users: User[] = [];

  constructor(private http: HttpClient) {}

  fetchInitialUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.data as User[]),
      tap((users) => (this.users = users)),
      catchError(this.handleError<User[]>('fetchInitialUsers', []))
    );
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      map((response) => {
        const newUser: User = {
          ...user,
          id: response.id,
          avatar: user.avatar || 'default-avatar-url',
        };
        this.users.push(newUser);
        return newUser;
      }),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user).pipe(
      map(() => {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
        }
        return user;
      }),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`).pipe(
      map(() => {
        this.users = this.users.filter((u) => u.id !== userId);
        return;
      })
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
