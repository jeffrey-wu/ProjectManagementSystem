import { stringify } from '@angular/compiler/src/util';
import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../Models/Project/project';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.css']
})
export class UserStoriesComponent implements OnInit {

  @Input() proj_id: String
  public userStoryList = []
  currentUS = null
  currentIndex = -1

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    console.log("printing from userstories "+this.proj_id)
  }

  createUS(us: NgForm) {   //IN-PROG (need to create USERSTORY enitity in mongodb)
    console.log(us.value)

    const data = {
      UserStory: us.value.userStory,
      Description: us.value.descr,
      Difficulty: us.value.diff,
      Time: us.value.time,
      Priority: us.value.prio,
      ProjectID: this.proj_id
    }

    this.service.createUS(data)
    .subscribe(
      res => {
        //add userstory to project
        //working in progress (might be wrong way to approach)
        // this.addUserStoryToProject(res._id)
        console.log(res._id)
        console.log(res)
      },err => {
        console.log(err)
      }
    )
  }

  //working in progress (might be wrong way to approach)
  // addUserStoryToProject(us_id){
  //   this.service.getProject(this.proj_id)
  //     .subscribe(
  //       proj => {
  //         proj(this.proj_id, us_id)
  //       }, err => {
  //         console.log(err)
  //       }
  //     )
  // }

  //WORKING (gets list of US from current project)
  getUSList() {
    //GETS ALL USER STORIES (need list from specific proj)
    //adding param to locate proj
    this.service.getAllUS(this.proj_id)
      .subscribe(
        data => {
          if(data!=null){
            this.userStoryList = data
            // console.log(this.userStoryList)  //NOT SHOWING ANYTHING IN LIST
            console.log("UserStory array length: ["+this.userStoryList.length+"]")
          }
          else{
            console.log("userStoryList is empty")
          }
          
        }, err => {
          console.log(err)
        }
      )

  }

  setActiveUserStory(us, i): void {
    this.currentUS = us;
    this.currentIndex = i;
  }

  deleteUS(user,i) {
    this.setActiveUserStory(user,i)
    const userStoryID = this.currentUS._id
    const projID = this.proj_id
    const UpdateTypeID = "US_D"
    console.log("Item Id: "+this.currentUS._id+"\nProcess: Delete\nLocation: Angular\nSuccess: TRUE")
    //need "data" to be read from backend
    const data={
      UpdateType: UpdateTypeID,
      userStoryID: userStoryID
    }
    
    // console.log(data)
    //DELETING US
    this.service.deleteUS(userStoryID)
      .subscribe(
        data => {
          console.log("UserStory id: "+userStoryID+"\nDeleted in angular")
        }
      )
    
    //UPDATING PROJECT WITH NEW US_LIST
    this.service.updateProject(projID, data) //need to incorperate const data = { updateType: US_D }
      .subscribe(
        data => {
          console.log("Project id: "+projID+"\nUpdated in angular")
        }
      )
  }

  updateUS(f: NgForm): void{
    const data={
      UserStory: f.value.UserStory,
      Description: f.value.Description,
      Difficulty: f.value.Difficulty,
      Time: f.value.Time,
      Priority: f.value.Priority
    }
    const projID = this.proj_id
    const US_ID = this.currentUS._id
    const UpdateTypeID = "P_U"
    const data1={
      UpdateType: UpdateTypeID,
      userStoryID: US_ID,
      data: data
    }

    this.service.updateUS(this.currentUS._id, data)
    .subscribe(
      data => {
        console.log("update in angular success")
      },
      err => {
        console.log("Error in angular update "+err)
      }
    )

    this.service.updateProject(projID, data1)
      .subscribe(
        data => {
          console.log("Project id: "+projID+"\nUpdated in angular")
        }
      )
  }
}
