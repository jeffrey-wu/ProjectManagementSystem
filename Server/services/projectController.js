import Project from '../Schema/Project.js'
import User from '../Schema/User.js'

function createProj(req, res) {
      try{

        // TODO(line: 5): for loop to concatenate a string to make a members list

        User.findById(req.params.id).then( user => {
          console.log(user._id)
          const proj_1 = new Project({
            ProjectName: req.body.ProjectName,
            ProjectStart: req.body.ProjectStart,
            ProjectEnd: null,

            // Members: [{ first_name: user.first_name, last_name: user.last_name, phone: user.phone }]
            Members: [user]
          })

          proj_1.save().then( data => {
            res.send(data)
            console.log("Data saved")
          }).catch( err => {
            console.log("Error in createPROJ in PROJ-Controller.js. ")
            console.log("Error type: "+err)
          })
          
        }).catch( err => {
            console.log("Could not find UserID\nError description: "+err)
        })
    }
    catch(err){
        console.log("Error at try block creating project\nError Description: "+err)
    }

        
}

function updateProj_US(req,res){
  Project.findById(req.params.id).then( proj => {
    const targetUS = JSON.stringify(req.body.userStoryID)
    const USlist = proj.ProjectUserStories
    let found = false
    let i = 0
    
    // const USID = JSON.stringify(USlist[i]._id)
    // const compare = USID.localeCompare(targetUS)
    // console.log(targetUS)
    // console.log("UserStory ID: "+USID)
    // console.log("Comparing strings")
    // console.log("Current_USID: "USID+" <==> Target_USID"+targetUS)
    // console.log("localeCompare result: "+compare)
    console.log("USlist.length = "+USlist.length)
    
    //while loop is buggy and crashes alot making me refresh the page alot
    // found == false || i <= USlist.length-1
    console.log("begin")
    while(found == false){
      console.log("in")
      if(JSON.stringify(USlist[i]._id).localeCompare(targetUS) == 1 || JSON.stringify(USlist[i]._id).localeCompare(targetUS) == -1){
        i++
        console.log("Current_USID: "+JSON.stringify(USlist[i]._id)+" != Target_USID"+targetUS+" "+found+" "+i)
      }
      else if(JSON.stringify(USlist[i]._id).localeCompare(targetUS) == 0){
        found = true
        console.log("Current_USID: "+JSON.stringify(USlist[i]._id)+" == Target_USID"+targetUS+" "+found+" "+i)
      }
      else{
        console.log("something went wrong")
      }
    }
    console.log("out")
    console.log("i = "+i)

    //SPLICE ARRAY WORKING
    USlist.splice(i,1)
    console.log("found = "+found)
    console.log("UserStory array location: "+i)

    // everything below works as intended
    const updatedProj = {
      _id: proj._id,
      ProjectUserStories: USlist,
      Members: proj.Members,
      ProjectName: proj.ProjectName,
      ProjectStart: proj.ProjectStart,
      ProjectEnd: proj.ProjectEnd
    }

    Project.findByIdAndUpdate(req.params.id, updatedProj, {useFindAndModify: false}).then(data => {
      console.log("Project USlist Updated")
    }).catch(err => {
      console.log("Error Domain: projectController (express)\nError location: PROJ_UPDATE (US_D)\nError description: "+err)
    })

  }).catch(err => {
    console.log("Error Domain: projectController (express)\nError location: FindById (Project)\nError description: "+err)
  })
}

// function updateProj_M(req,res){
//   Project.findById(req.params.id).then( proj => {
//     const targetM = JSON.stringify(req.body.userID)
//     const Memeberlist = proj.Members
//     let found = false
//     let i = 0
    
//     // const USID = JSON.stringify(USlist[i]._id)
//     // const compare = USID.localeCompare(targetUS)
//     // console.log(targetUS)
//     // console.log("UserStory ID: "+USID)
//     // console.log("Comparing strings")
//     // console.log("Current_USID: "USID+" <==> Target_USID"+targetUS)
//     // console.log("localeCompare result: "+compare)
//     console.log("Memeberlist.length = "+Memeberlist.length)
    
//     //while loop is buggy and crashes alot making me refresh the page alot
//     // found == false || i <= USlist.length-1
//     console.log("begin")
//     while(found == false){
//       console.log("in")
//       if(JSON.stringify(Memeberlist[i]._id).localeCompare(targetM) == 1 || JSON.stringify(Memeberlist[i]._id).localeCompare(targetM) == -1){
//         i++
//         console.log("Current_USERID: "+JSON.stringify(Memeberlist[i]._id)+" != Target_USERID"+targetM+" "+found+" "+i)
//       }
//       else if(JSON.stringify(Memeberlist[i]._id).localeCompare(targetM) == 0){
//         found = true
//         console.log("Current_USERID: "+JSON.stringify(Memeberlist[i]._id)+" == Target_USERID"+targetM+" "+found+" "+i)
//       }
//       else{
//         console.log("something went wrong")
//       }
//     }
//     console.log("out")
//     console.log("i = "+i)

//     //SPLICE ARRAY WORKING
//     Memeberlist.splice(i,1)
//     console.log("found = "+found)
//     console.log("Memeberlist array location: "+i)

//     // everything below works as intended
//     const updatedProj = {
//       _id: proj._id,
//       ProjectUserStories: proj.ProjectUserStories,
//       Members: Memeberlist,
//       ProjectName: proj.ProjectName,
//       ProjectStart: proj.ProjectStart,
//       ProjectEnd: proj.ProjectEnd
//     }

//     User.findByIdAndUpdate(req.params.id, updatedProj, {useFindAndModify: false}).then(data => {
//       console.log("Project Memeberlist Updated")
//     }).catch(err => {
//       console.log("Error Domain: projectController (express)\nError location: PROJ_UPDATE (US_D)\nError description: "+err)
//     })

//   }).catch(err => {
//     console.log("Error Domain: projectController (express)\nError location: FindById (Project)\nError description: "+err)
//   })
// }

function updateProject(req,res) {

  const type = req.body.UpdateType

  console.log(type)

  //type == P_U
  //P_U SECTION INCOMPLETE
  if(type.localeCompare("P_U") == 0){
    // const data = {
    //   ProjectID: req.body.ProjectID,
    //   ProjectName: req.body.ProjectName
    //   etc.....
    // }
    Project.findByIdAndUpdate(req.params.id, data, {userFindAndModify: false}).then( proj => {
      console.log("Project Update success")
    }).catch(err => {
      console.log("Error Domain: projectController (express)\nError location: PROJ_UPDATE (P_U)\nError description: "+err)
    })
  }
  //type == US_D
  //ALL OF US_D IS WORKING
  else if(type.localeCompare("US_D") == 0){
    updateProj_US(req)
  }
  // else if(type.localeCompare("M_D") == 0){
  //   updateProj_M(req)
  // }
  else{
    console.log("outside of UPDATE boundaries")
  }


}

function getMembers(req, res) {
  Project.findById(req.params.id).then( proj => {
    let memberList = []
    memberList = proj.Members
    res.send(memberList)
  }).catch(err => {
    console.log("Error in get members in ProjectController")
    console.log(err)
  })
}

function addMember(req,res){
//DONE
//ON TO SOMETHING KEEP UP THE WORK
//req.body.targetID works
//req.params works
  const id = req.params.id
  //req.body.targetID = id: string
  //req.params.id = id: string
  //this is projectID
  console.log(req.params+" is of type: "+typeof req.params)
  console.log(req.body.targetID+" is of type: "+typeof req.body.targetID)
  // console.log(req.params)
  // console.log(req.params.id)
  // console.log(req.body.targetID)
  // console.log(JSON.stringify(req.params))
  // console.log(JSON.stringify(req.params.id))
  // console.log(JSON.stringify(req.body.targetID))

  //----------START OLD CODE---------------
  // const memberlist = []

  // req.body.forEach(f => {
  //   memberlist.push(f)
  //   console.log("current item "+f)
  // });

  // //still need polishing ([1: separate ownerID's from memberIDs], [2: add projectID to Members/Owner UserAccounts])
  // memberlist.forEach(p => {
  //   console.log("2nd forloop item "+p)
  //   //TIP remember to do this when updating array {$push: {Members: [{UserID: p}]}} ... ffs
  //   Project.findByIdAndUpdate(id, {$push: {Members: [{UserID: p}]}}, {useFindAndModify: false}).then( proj => {
  //     console.log("Member to add: "+p)
  //     console.log("Member list after adding: "+proj.Members)
  //   }).catch(err => {
  //     console.log("Error in add member \nError description: "+err)
  //   })
  // });
//----------END OLD CODE---------------


//------------START NEW CODE--------------
  User.findById(req.body.targetID).then(isfound => {
    console.log("Member to add FOUND\nProceeding to add member")
    const usertoadd = isfound
    console.log(usertoadd)
    Project.findByIdAndUpdate(id, {$push: {Members: [usertoadd]}}, {useFindAndModify: false}).then( proj => {
      console.log("adding member to proj is success in express")
    }).catch(err => {
      console.log("Error in add member \nError description: "+err)
    })
  }).catch(err => {
    console.log("User not found when adding member")
  })
//-------------END NEW CODE---------------
}

function removeMember(req,res){
  console.log("printing from remove member express")
  Project.findById(req.params.id).then( proj => {
    //while loop might be better cause it exit when condition is met
    //unlike for loops where it searches all of array even when condition is met
    for(let i = 0;i<proj.Members.length;i++){
      if(req.body.targetID.localeCompare(proj.Members[i]._id)==0){
        //splice user from member list
        proj.Members.splice(i,1)
        Project.findByIdAndUpdate(req.params.id, {Members: proj.Members}, {useFindAndModify: false}).then( data => {
          console.log("removing member success")
        }), err => {
          console.log("error in removing user from project")
          console.log(err)
        }
      }
    }
  }), err => {
    console.log("error in finding project")
    console.log(err)
  }
}

function getProjUS(req, res){
  Project.findById(req.params.id).then( data => {
    res.send(data)
  }).catch(err => {
    console.log(err)
  })
}

function deleteProject(req,res){
  const id = req.params.id
  Project.findByIdAndDelete(id).then( data => {
    console.log("Delete in progress")
    console.log("Currently deleting: [Project : \n"+data+"\n]")
  }).catch(err => {
    console.log("Error in deleteProject\nError type: "+err)
  })
}


function getProjects(req,res){
  Project.find({}).then( data => {
        res.send(data)
      }), err => {
        console.log("getProjects FAILED in projectController.js: "+err)
      }
}

function getProject(req,res){
  const id = req.params.id
  console.log(req.params.id)
  console.log(id)
  Project.findById({_id: id}).then( data => {
        // console.log(+data)   //testing: prints project object
        res.send(data)
      }), err => {
        console.log("loading single project FAILED in projectController.js: "+err)
      }
  //top and bottom essentially the same thing
  // const fk = "60da9a5ef05c951704d8b389"
  // Project.findById(id, function(err, proj_target) {
  //   if(err){
  //     console.log(err)
  //   }
  //   else if(proj_target!=null){
  //     console.log("we found something")
  //     console.log(proj_target)
  //     res.send(data)
  //   }
  //   else{ 
  //     console.log("project not found")
  //   }
  // })
}



// export default {createProj}
export default {createProj, updateProject, addMember, removeMember, getProjUS, deleteProject, getProjects, getProject, getMembers}
// export default {createProj, addMember, removeMember}
