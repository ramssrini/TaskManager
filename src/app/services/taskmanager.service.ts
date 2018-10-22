import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { TaskVO } from '../task';
import { Subscription } from 'rxjs';

@Injectable() 
export class TaskManagerService{

    constructor(public http:Http)
    {

    }
baseUrl: string = 'http://127.0.0.1:8080/';
getTasks(): Promise<any>{
  return this.http.get(this.baseUrl+"getTasks")
   .toPromise()
   .then(res=>res.json());
   
}

// getTasksById(id): Promise<TaskVO>{
//   console.log(id);
//   return this.http.get(this.baseUrl+"getTask?id="+id)
//    .toPromise()
//    .then(res=>res.json());
   
// }

getTasksById(id): any{
  console.log(id);
  
   this.http.get(this.baseUrl+"getTask?id="+id)
  .subscribe((res) => {
    let resSTR = JSON.stringify(res);
    let resJSON = JSON.parse(resSTR);
    return resJSON._body;
  })
}

delete(id): Promise<any>{
  console.log(id);
  return this.http.delete(this.baseUrl+"delete?id="+id)
   .toPromise()
   .then(res=>res.json());
}

 addTaskInfo(
    task : TaskVO): Promise<any>{

      let body = JSON.stringify( task );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"addTask", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }

  updateTaskInfo(
    task : TaskVO): Promise<any>{

      let body = JSON.stringify( task );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"updateTask", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }
}