// 28 new added
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '@/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService {
constructor(private http: HttpClient) { }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${config.apiUrl}/role`, role);
  }

  getAllRole() {
    return this.http.get<Role[]>(`${config.apiUrl}/role`);
  }

  deleteRole(role: Role | number): Observable<Role> {
    const id = typeof role === 'number' ? role : role.id;
    return this.http.delete<Role>(`${config.apiUrl}/role/${id}`);
  }

}