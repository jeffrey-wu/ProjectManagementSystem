import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from "src/app/service/service.service"; //pulled from ass, dont even know if this is right
import { Project } from '../Models/Project/project';



// import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { observable, Observable } from 'rxjs';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../Models/UserModel/user';
import { Sprint } from '../Models/Sprint/sprint';
import { UserStory } from '../Models/UserStoryModel/user-story';
import { FormControl, Validators } from '@angular/forms';



// @Input() project$: Project
// @Input() project_item?: Project;


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  // @Input() project_item: Project
  project_object: string;
  memberList = [User]
  testv: Project
  lookyhere = "supbro"
  project_item: string;



  // sprintList = [Sprint]
  // usList = [UserStory]

  constructor(
    // private FormControl: FormControl,
    // private Validators: Validators,
    private service: ServiceService,
    private route: ActivatedRoute,
    private location: Location
    
    // private router: Router 
  ) { }

  ngOnInit(): void {
    this.getProject();     //no error when removed
    //cant use project_object when it is getting assigned in getProject() function
    //since its an async function it'll continue executing ngOnInit()
    this.project_item = String(this.route.snapshot.paramMap.get('id'));
    // const heroId = this.project.snapshot.paramMap.get('id');
    // this.project = this.service.getProject(heroId);
  }
  test(){
    // this.testv = this.project_item
    console.log("testing BTN")
    console.log(this.memberList)
    console.log(this.project_object)
    console.log("testing BTN")
    // this.getProject()
    // console.log(this.sprintList)
    // console.log(this.usList)
    // console.log(this.testv.ProjectName)
    // this.getProject()
  }
  //getProject() not working (output is null for some reason)
  getProject(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.service.getProject(id)
    //   .subscribe(proj => this.project = proj);
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.service.getProject(id).subscribe(data => {
      console.log(data)
      
      this.project_object = data._id
      this.memberList = data.Members
      console.log("inside of get project")
      console.log(this.project_object)
      console.log(this.memberList)
      //like above do same for userstories and sprint (might be cleaner this way)
      console.log("get project success")
    }), err => {
      console.log(err)
      console.log("didnt get project")
    }
  }
  
  goBack(): void {
    this.location.back();
  }
}