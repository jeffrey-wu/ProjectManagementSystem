import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Project } from '../Models/Project/project';
import { User } from '../Models/UserModel/user';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-member-manager',
  templateUrl: './member-manager.component.html',
  styleUrls: ['./member-manager.component.css']
})
export class MemberManagerComponent implements OnInit {
  @Input() memberList: [User]
  @Input() currentProj
  userList
  email = new FormControl('', [Validators.required, Validators.email]);
  targetUser: string

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe( data => {
      this.userList = data
    }), err => {
      console.log(err)
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getMembers(){
    this.service.getMembers(this.currentProj).subscribe(
      data => {
        this.memberList = data
        console.log("getMembers Success")
      }, err => {
        console.log("getMembers Failed")
      }
    )
  }

  addMember(user) {
    //DONE
    //req.body.targetID works
    //req.params works
    //this.targetUser = id: string
    //this.currentProj = id: string
    console.log("Adding member")
    this.targetUser = user._id
    console.log("target UserID is: "+this.targetUser)
    const data = {targetID: this.targetUser}
    console.log("currentProj: "+this.currentProj)
    const projID = this.currentProj
    console.log(projID)
    // adding member with user-obj
    this.service.addMember(this.currentProj, data)
    .subscribe( 
      data => {
        console.log("Angular add members success")
      },
      err => {
        console.log("Error Angular add members")
        console.log(err)
      }
    )
  }
  removeMember(user) {
    console.log("Removing member")
    this.targetUser = user._id
    const data = {targetID: this.targetUser}
    const projID = this.currentProj
    //need to send targetUser._id to service for delete process
    this.service.removeMember(projID, data)
    .subscribe(
      data =>{
        console.log("Angular remove member success")
      },
      err => {
        console.log("Error Angular remove member")
        console.log(err)
      }
    )
  }
}
