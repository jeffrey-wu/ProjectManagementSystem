import { DataSource } from "@angular/cdk/collections";
import { merge,of as observableOf, Observable, ReplaySubject } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from "../Models/UserModel/user";
import { ServiceService } from '../service/service.service';


export class datasource extends DataSource<User> {
    // data: Observable<User[]>
    private _dataStream = new ReplaySubject<User[]>();
  
    constructor(initialData: User[]) {
      super();
      this.setData(initialData);
    }

    // initialiseData() {
    //     this.data = this.service.getAllUsers()
    //     .subscribe(
    //       response => {
    //         console.log(response);
    //       },error => {
    //         console.log(error);
    //       });
    // }
  
    connect(): Observable<User[]> {
        // this.getUserList()
        return this._dataStream;
    }
  
    disconnect() {}
  
    setData(data: User[]) {
      this._dataStream.next(data);
    }
    // getUserList() {
    //     this.service.getAllUsers()
    //       .subscribe(
    //         daGoods => {
    //           this.data = daGoods
    //         },
    //         err => {
    //           console.log(err)
    //         }
    //       )
    // }
  }