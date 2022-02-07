
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public url: string, public http: HttpClient) {

  }

  // getAll() {
  //   return this.http.get(this.url);
  // }

  // create(resource) {
  //   return this.http.post(this.url, resource);
  // }

  // update(resource) {
  //   return this.http.put(this.url + '/' + resource.orgId, resource);
  // }
  // updatelegallist(resource) {
  //   return this.http.put(this.url + '/' + resource.id, resource);
  // }
  // delete(id) {
  //   console.log(this.url + '/' + id);
  //   // , this.httpOptions
  //   return this.http.delete(this.url + '/' + id, { responseType: 'text' });
  // }

}
