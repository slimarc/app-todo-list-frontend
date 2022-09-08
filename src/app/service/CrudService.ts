import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

 serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:8000/api-auth/";
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }
  
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL+'create', task);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL+''+task.id,task);
  }

  completTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL+''+task.id,task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.serviceURL + 'delete/' + task.id);
  }
}
