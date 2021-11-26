import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { ServiceService } from "src/app/service/service.service"; //pulled from ass, dont even know if this is right
import { Project } from '../Models/Project/project';


import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  myDate = new Date()
  userList= []
  MemberList = []
  MemberList0 = ["6013a1669ce3a817b0f286ec", "60bc87e525451842740dbb2b"]   //change to emails
  userToAdd = null
  userToRemove = null
  currentUser = []
  index = -1
  ProjectName = null
  projectList = []
  currentProj: Project

  create_toggle_bol = false

  selectedId: number;
  selectedProject: Project

  constructor(
    private service: ServiceService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.getUserList()
    this.getProjects()

    // this.project = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     this.selectedId = Number(params.get('id'));
    //     return this.service.getAllProjects();
    //   })
    // );
  }

test(){
  console.log(this.userList[0].first_name)
  console.log(this.userList[0].last_name)
  console.log(this.userList[0].phone)
  this.getUserList()
}
selectProj_test(proj: Project){
  this.selectedProject = proj
  console.log(this.selectedProject)
}
create_toggle(){
  this.create_toggle_bol = !this.create_toggle_bol
}
load(id){
  this.service.getProject(id).subscribe( data => {
    console.log("load project success")
    console.log(data)
  }), err => {
    console.log("load project error")
    console.log(err)
  }
}

  getProjects(){
    this.service.getAllProjects()
    .subscribe( data => {
      this.projectList = data
      console.log("get projects success")
      console.log(this.projectList)
    }),
    err => {
      console.log("error in angular get project")
        console.log(err)
    }
  }

  createProject(p: NgForm): void{
    

    // id:"60dc6c6c336a9b26d46925e9"
    // first_name:"conan"
    // last_name:"edogawa"
    // phone:"52"

    const id = "60dc6c6c336a9b26d46925e9" //"this.currentUser._id" substitute/hardcode (id of user currently logged in and creating a project)
    
    const data={
      ProjectName: p.value.ProjectName,
      // Sprints: null,
      ProjectStart: this.myDate.toString(),
      ProjectEnd: null,
      Members: [{UserID: id}]
    }
    this.service.createProject(id, data)
    .subscribe(
      data => {
        console.log("create Project in angular success")
        console.log(data)
      },
      err => {
        console.log("error in angular create project")
        console.log(err)
      }
    )
  }

  setActiveUser(index): void {

    this.currentUser.push(this.userList[index]);
    this.index = index;
    console.log("currentUser in setActiveUser() START...\n")
    console.log(this.currentUser)
    console.log("currentUser in setActiveUser() END...\n")
    console.log(this.index)
  }

  getUserList() {
    this.service.getAllUsers()
      .subscribe(
        data => {
          this.userList = data
          // this.userList1 = data
          // // console.log(this.userList)
          // console.log(this.userList1[0])
          // this.userList1.forEach(e => {
          //   const obj = {
          //     first_name: e.first_name,
          //     last_name: e.last_name,
          //     phone: e.phone
          //   }
          //   console.log(obj)
          //   this.userList.push(obj)
          // });
          // console.log("yo")
          // console.log(this.userList)
          // console.log("yo")
        },
        err => {
          console.log(err)
        }
      )
      
  }

  addMember(i) {
    this.setActiveUser(i)
    this.MemberList.push(this.currentUser[0])


    console.log("MemberList in addMember() START...\n")
    console.log(this.MemberList)
    console.log("MemberList in addMember() END...\n")
    console.log(this.currentUser[0])
    this.currentUser.shift()        //shift not removing [currentUser list has an undefined object instead of empty]
    console.log(this.currentUser[0])
  }

  removeMember(user, i) {
    this.setActiveUser(i)
    this.MemberList.splice(i, 1, this.currentUser[0])
    
    
    console.log("MemberList in addMember() START...\n")
    console.log(this.MemberList)
    console.log("MemberList in addMember() END...\n")
    console.log(this.currentUser[0])
    this.currentUser.shift()        //shift not removing item think of something else
    console.log(this.currentUser[0])
  }
  
  // addMembersToProject(){
  //   const list = this.MemberList0
  //   const id = "60da9a5ef05c951704d8b389"
  //   // add member with email not id (currently adding with id)
  //   this.service.addMembers(id, list)
  //   .subscribe( 
  //     data => {
  //       console.log("Angular add members success")
  //     },
  //     err => {
  //       console.log("Error Angular add members")
  //       console.log(err)
  //     }
  //   )
  // }
  deleteProject(project){
    this.currentProj = project
    const id = this.currentProj._id
    console.log("Angular delete button initiated "+id)
    this.service.deleteProject(id)
      .subscribe( 
        data => {
          console.log("Angular DELETE project success")
          console.log("following project has been deleted: \n"+data)
        }, 
        err => {
          console.log("Error Angular DELETE project")
        }
      )
  }
}