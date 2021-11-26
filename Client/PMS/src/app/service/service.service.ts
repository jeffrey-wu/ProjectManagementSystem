import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/UserModel/user';

// import { user } from '../Models/UserModel/user'

const baseURL0 = "http://localhost:3000/api/UserStory/"
const baseURL00 = "http://localhost:3000/api/Project/"
const baseURL001 = "http://localhost:3000/api/Projects/"
const addMemberURL = "http://localhost:3000/api/Project"

//testing
const addMemberURL1 = "http://localhost:3000/api/Project/"

const baseURL = "http://localhost:3000/users"
const baseURL1 = "http://localhost:3000/api/userList"
const baseURL2 = "http://localhost:3000/api/updateUser"
const baseURL3 = "http://localhost:3000/api/deleteUser"

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  //USER API SERVICES
  createUser(data): Observable<any> {
    return this.http.post(baseURL, data)
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseURL1)
  }

  get(id): Observable<any> {
    return this.http.get<any>('${baseURL}/$id')
  }

  // updateUser(id, data): Observable<any> { //transfer id and data to express somehow
  //   return this.http.post('${baseURL2}/$id', data)
  // }

  // updateUser(id, data): Observable<any> { //transfer id and data to express somehow
  //     return this.http.post(baseURL2,id, data)
  //   }

  updateUser(id:any, data:any): Observable<any> { //done
    let API_URL = baseURL2+id;
    return this.http.put(API_URL, data)
  }

  deleteUser(id:any): Observable<any> {
    // return this.http.delete(baseURL3,Query)
    let API_URL = baseURL3+id;
      return this.http.delete(API_URL)
  }


  
  //USERSTORIES API SERVICES
  createUS(data): Observable<any>{
    return this.http.post(baseURL0, data)
  }
  getAllUS(proj): Observable<any>{
    return this.http.get(baseURL0+proj)
  }
  deleteUS(userStoryID: any): Observable<any>{    
    return this.http.delete(baseURL0+userStoryID)
  }
  updateUS(id: any, data:any): Observable<any>{
    return this.http.put(baseURL0+id,data)
  }


  //SPRINT API SERVICES
  createSprint(data): Observable<any>{
    return this.http.post(baseURL00, data)
  }
  getAllSprints(): Observable<any>{
    return this.http.get(baseURL00)
  }
  // deleteSprint(id: any): Observable<any>{
  //   return this.http.delete(baseURL00+id)
  // }
  // updateSprint(id: any, data:any): Observable<any>{
  //   return this.http.put(baseURL00+id,data)
  // }


  //PROJECT API SERVICES
  createProject(id, data): Observable<any>{
    return this.http.post(baseURL00+id, data)
  }
  getAllProjects(): Observable<any>{
    return this.http.get(baseURL001)
  }
  getProject(id): Observable<any>{
    return this.http.get(baseURL001+id)
  }
  deleteProject(id: any): Observable<any>{
    return this.http.delete(baseURL001+id)
  }
  updateProject(projID: any, data:any): Observable<any>{
    return this.http.put(baseURL00+projID, data)
  }
  addMember(id: any, data): Observable<any>{
    return this.http.put(addMemberURL1+"addMember/"+id, data)
  }
  removeMember(id: any, data): Observable<any>{
    //how do you delete an obj from and obj's array?
    //still dont know & working on it
    return this.http.put(addMemberURL1+"removeMember/"+id, data)
  }
  getMembers(id): Observable<any>{
    return this.http.get(baseURL00+id)
  }
  addUserStory(id: any, data): Observable<any>{
    return this.http.put(baseURL00+id,data)
  }
  getProjUS(id): Observable<any>{
    return this.http.get(baseURL00+id)
  }
}
