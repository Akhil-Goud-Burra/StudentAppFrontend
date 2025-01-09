import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dto } from './dto';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private readonly baseUrl = 'https://localhost:7145/api/Students';

  constructor(private http: HttpClient) {}

  // Create a student
  createStudent(student: Partial<dto>): Observable<dto> {
    return this.http.post<dto>(this.baseUrl, student);
  }

  // Fetch all students
  getStudentDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Update a student
  updateStudent(id: number, student: Partial<dto>): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
