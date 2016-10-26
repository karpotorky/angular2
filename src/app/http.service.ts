import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  // private todos_url : string = "https://todo-f6017.firebaseio.com/todos.json";
  private data_url : string = "https://todo-f6017.firebaseio.com/data";


  constructor(private http : Http) {}

  getAllData() {
    return this.http.get(this.data_url + ".json")
      .map((response : Response) => response.json());
  }

  sendData(toive : any) {
    const body = JSON.stringify(toive);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.data_url + ".json", body, {
      headers: headers
    })
      .map( (data : Response) => data.json() )
  }

  update(toive : any) {
    const body = JSON.stringify(toive);
    return this.http.patch(this.data_url + "/" + toive.id + ".json", body)
      .map( (data : Response) => data.json() )
  }

  delete(key : string) {
    return this.http.delete(this.data_url + "/" + key + ".json");
  }



  
}
