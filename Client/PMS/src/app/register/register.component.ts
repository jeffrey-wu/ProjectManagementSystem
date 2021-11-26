import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"

import { ServiceService } from "src/app/service/service.service"; //pulled from ass, dont even know if this is right
import { NgForm } from '@angular/forms';
import { User } from '../Models/UserModel/user'; //not a module apparently
import { datasource } from '../register/datasource'
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userList: User[] = []
  currentUser = null;
  currentIndex = -1;
  myDate = new Date()   //testing purposes

  dataSource = new MatTableDataSource<User>(this.userList)    //working

  // dataSource = new datasource(this.userList)

  displayedColumns = ['id','first_name', 'last_name', 'phone', 'Edit', 'Delete'];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getUserList()
    this.test()    //working
    // this.dataSource = new DataSource();
  }

  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);

    const data = {
        first_name: f.value.first,
        last_name: f.value.last,
        phone: f.value.phone
    };
    
    this.service.createUser(data)
    .subscribe(
      response => {
        console.log(response);
      },error => {
        console.log(error);
      });
  }
  
  getUserList() {
    this.service.getAllUsers()
      .subscribe(
        data => {
          this.userList = data
          // this.userList.keys()
          console.log(this.userList)
          // this.userList = Object.entries(data) //something works but not quite
          //https://www.cloudhadoop.com/2018/08/typescript-how-to-convert-object-to.html
        },
        err => {
          console.log(err)
        }
      )
  }

  //Working----->>>
  test() {
    this.service.getAllUsers()
      .subscribe(
        daGoods => {
          this.dataSource.data = daGoods
        },
        err => {
          console.log(err)
        }
      )
  }

  //original
  setActiveUser(user): void {
    this.currentUser = user;
    console.log(JSON.stringify(this.myDate))    //testing purposes
    console.log(this.myDate.toString())   //testing purposes
  }

  // setActiveUser(user, element): number {
  //   if(this.userList.includes(element)){
  //     for(let i=0;i<this.userList.length;i++){
  //       if(user[i]==element){
  //         this.currentUser = this.userList[i]
  //         return 1
  //       }
  //     }
  //   }
  //   else{
  //     console.log("User not found in current DB")
  //     return -1
  //   }
  // }

  updateUser(e: NgForm) {
    const data = {
      first_name: e.value.first_name,
      last_name: e.value.last_name,
      phone: e.value.phone
  };
    this.service.updateUser(this.currentUser._id, data) //get this instance of user to edit their details
    .subscribe(
      data => {
        console.log("update in angular success")
      },
      err => {
        console.log("Error in angular update"+err)
        console.log(JSON.stringify(err))
      }
    )
  }

  //original
  // deleteUser(user, i) {
  // //   const Query = {
  // //     first_name: e.value.first_name,
  // //     last_name: e.value.last_name
  // // };
  //   this.setActiveUser(user, i)
  //   const id = this.currentUser._id
  //   console.log("Item Id: "+this.currentUser._id+"\nProcess: Delete\nLocation: Angular\nSuccess: TRUE")
  //   this.service.deleteUser(id) //get this instance of user to edit their details
  //   .subscribe(
  //     data => {
  //       console.log("delete in angular success")
  //     },
  //     err => {
  //       console.log("Error in angular delete"+err)
  //       console.log(JSON.stringify(err))
  //     }
  //   )
  // }

  // deleteUser(i) {
      // if(this.setActiveUser(this.userList, object)==1){
      //   const id = this.currentUser._id
      //   console.log("Item Id: "+id+"\nProcess: Delete\nLocation: Angular\nSuccess: TRUE")
      //   this.service.deleteUser(id) //get this instance of user to edit their details
      //   .subscribe(
      //     data => {
      //       console.log("delete in angular success")
      //     },
      //     err => {
      //       console.log("Error in angular delete"+err)
      //       console.log(JSON.stringify(err))
      //     }
      //   )
      // }
      // else{
      //   console.log("Ain't working mate")
      // }
    // }


     deleteUser(user) {
    this.setActiveUser(user)
    const id = this.currentUser._id
    console.log("Item Id: "+this.currentUser._id+"\nProcess: Delete\nLocation: Angular\nSuccess: TRUE")
    this.service.deleteUser(id) //get this instance of user to edit their details
    .subscribe(
      data => {
        console.log("delete in angular success")
      },
      err => {
        console.log("Error in angular delete"+err)
        console.log(JSON.stringify(err))
      }
    )
  }
  // getUser(): User{
    
    
  //   return u
  // }
}
