import UserStory from "../Schema/UserStory.js"
import Project from "../Schema/Project.js"

//WORKING (creates US & add US obj to project US-List)
//need to work on the reverse of this (aka deleting)
function createUS(req,res) {
    try{
        const us_1 = new UserStory({
          UserStory: req.body.UserStory,
          Description: req.body.Description,
          Difficulty: req.body.Difficulty,
          Time: req.body.Time,
          Priority: req.body.Priority,
          ProjectID: req.body.ProjectID
        })
        const proj_id = req.body.ProjectID
        us_1.save().then( data => {
          console.log("projectid is: "+proj_id)
          console.log("data is: "+data)
          const userStory_id = data._id
          console.log("userStory_id: "+userStory_id)
          // find project and add UserStory into it's UserStory[]   (will also do something similar for delete)
          // use findByIdAndUpdate() (WORKING)
          // test1: updating projName to "penis" (WORKING)
          // test2: push proj_id into UserStory[]
          //{$push: {ProjectUserStories: [userStory_id]}}
          //updating proj's USList works!!!
          //decided to changed to adding entire US object to "ProjectUserStories"
          Project.findByIdAndUpdate(proj_id, {$push: {ProjectUserStories: [data]}}, {useFindAndModify: false}).then( targetProj => {
            //trying to push UserStory to proj-US-list
            // targetProj.ProjectUserStories.push(data.id)
            
            //checking whether data is a project
            console.log("ProjectName: { "+targetProj.ProjectName+" }")
            //checking UserStory list (works for any array/list)
            console.log("UserStory List: ["+targetProj.ProjectUserStories+"]")
          }).catch(err => {
            console.log("Something happened in find proj CreateUS()")
            console.log(err)
          })

          

          //upon success output result
          res.send(data)
          console.log("Data saved")
          console.log("UserStory:\nProcess: Create\nLocation: Express\nSuccess: TRUE")
        }).catch( err => {
          console.log("Error in createUserStory in userStoryController.js.\nError type: "+err)
        })
      }
      catch(err){
        console.log("Error caught in userController line: 26: "+err)
      }
}

//WORKING (successfully gets list of US objects)
function getAllUS(req,res){
  //find project
  Project.findById(req.params.id).then( data => {
    //temp list
    const list = [] = data.ProjectUserStories
    // console.log(list)   //list is working fine as intented
    //final list
    // var newList = []
    // var dk = "dk"
    //iterating through "temp" to get object into "final"
    //START FOR-LOOP
    // for(var i=0;i<list.length;i++){
    //   //finding US
    //   UserStory.findById(list[i]).then( data => {
    //     //pushing US to "final"
    //     // console.log(data)
    //     // newList.push(data)
    //     // newList.concat(data)
    //     console.log("Start "+newList.push(data)+" END")
    //     //FFFFFFFFFFFFFIIIIIIIIIIIIIIXXXXXXXXXXXXXX MMMMMMMMMEEEEEEEE!!!!!!!!!!!
    //     //somehow IS logging newList with items (but checking after every loop)
    //     console.log("Checking "+newList+" Checking")
    //   }).catch(err => {
    //     //errors
    //     console.log(err)
    //   })
    //   //ending loop
    // }
    //END FOR-LOOP
    //sending US list to angular
    //currently NOT logging newList with items
    //FFFFFFFFFFFFFIIIIIIIIIIIIIIXXXXXXXXXXXXXX MMMMMMMMMEEEEEEEE!!!!!!!!!!!
    // console.log("this is newList "+newList+" end of newList")
    // res.send(newList)
    res.send(list)
  }).catch(err => {
    console.log(err)
  })

  //GETS ALL USER STORIES (ORIGINAL)
  // try{
  //   UserStory.find({}).then( data => {
  //     res.send(data)
  //   }).catch( err => {
  //     console.log("Error at USERSTORY-CONTROLLER GETALLUS method\nError description: "+err)
  //   })
  // }
  // catch(err){
  //   console.log(err)
  // }
}

function deleteUS(req,res){
  try{
    //WORKING: DELETES US FROM userstory collection (but not from project)
    UserStory.findByIdAndDelete({_id: req.params.id}, { userFindAndModify: false }).then(data => {
      console.log("Item Id: "+data._id+"\nProcess: Delete\nLocation: Express\nSuccess: TRUE")
    }).catch(err => {
      console.log("Error in try block UserStory controller\nError message: "+err)
    })
  }
  catch(err){
    console.log("Error in US controller DELETE EXPRESS\nError type: "+err)
  }
  // console.log("DELETING UserStory from userStoryController")
}

function removingUSfromProj(req,res){
  try{
    //INPROG: REMOVING US FROM CURRENT PROJECT
    Project.findByIdAndUpdate({}).then (proj => {
      console.log("found project and removing US")
    }).catch(err => {
      console.log("Error in finding Project for deleting userstory\nError: "+err)
    })    
  }
  catch(err){
    console.log("Error: "+err)
  }
}

function updateUS(req,res){
  try{
    const data = {
      UserStory: req.body.UserStory,
      Description: req.body.Description,
      Difficulty: req.body.Difficulty,
      Time: req.body.Time,
      Priority: req.body.Priority
    }
    UserStory.findByIdAndUpdate(req.params.id,data,{ useFindAndModify: false }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log("error in try block of updateUS: "+err)
    })
    console.log("EXITING UPDATEUS")
  }
  catch(err){
    console.log(err)
  }
}

// {, getUS}
export default { createUS, getAllUS, deleteUS, updateUS, removingUSfromProj } //addUserStoryToProject