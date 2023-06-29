import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private http:HttpClient) { }
  url ="http://localhost:3000/posts";
  getAllPost():Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
 
  createPost(data:any):Observable<any>{
    return this.http.post(this.url,data)
  }
  getPost(id:any):Observable<any>{
    const url = `${this.url}/${id}`;
  return this.http.get(url);
  }
 updatePost(id:any,data:any):Observable<any>{
  const url = `${this.url}/${id}`;
  return this.http.put(url,data);
 }
  deletePost(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
