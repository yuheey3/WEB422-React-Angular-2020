
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const perPage = 6;
@Injectable({
    providedIn: 'root'
  })
export class PostService {

    constructor(private http: HttpClient) { }
   
  getPosts(page, tag, category): Observable<BlogPost[]> {
    let params = {
      page: page,
      perPage: perPage.toString(),
    }

    if (tag != null || tag != undefined) {
      params["tag"] = tag;
    }

    if (category != null || category != undefined) {
      params["category"] = category;
    }
    return this.http.get<BlogPost[]>(`https://whispering-headland-13877.herokuapp.com/api/posts`,{ params });
  }

  getPostByID(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://whispering-headland-13877.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`https://whispering-headland-13877.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://whispering-headland-13877.herokuapp.com/api/tags`);
  }
}
