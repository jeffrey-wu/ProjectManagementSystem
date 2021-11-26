import express from "express"
import renderService from "../services/render.js"
import userController from "../services/userController.js"
import userStoryController from "../services/userStoryController.js"
import projectController from "../services/projectController.js"
const route = express.Router()

// USER api here
route.get('/api/userList', userController.getAllUsers)   //DONE
// route.get('/api/userID', userController.findUser)   //TO DO
route.post('/users', userController.createUser)  //DONE
route.put('/api/updateUser/:id', userController.updateUser) //DONE
route.delete('/api/deleteUser/:id', userController.deleteUser)  //DONE (delete from list by id)



//USERSTORY api here
route.post('/api/UserStory', userStoryController.createUS)   //DONE
route.get('/api/UserStory/:id', userStoryController.getAllUS)   //DONE
// route.put('/api/UserStory/:id', projectController.addUserStoryToProject)
// route.get('/api/UserStory/:id', userStoryController.getUS)   //3RD TODO
route.put('/api/UserStory/:id', userStoryController.updateUS)    //IN-PROG
route.delete('/api/UserStory/:id', userStoryController.deleteUS)    //IN-PROG
route.put('api/UserStory/:id', userStoryController.removingUSfromProj)  //helper for deleteUS (removing userstory from project)



//PROJECT api here
route.get('/api/Projects', projectController.getProjects)
route.get('/api/Projects/:id', projectController.getProject)     //DONE
route.post('/api/Project/:id', projectController.createProj)    //DONE
route.put('/api/Project/:id', projectController.updateProject)  //IN-PROG
route.put('/api/Project/addMember/:id', projectController.addMember)     //DONE
route.put('/api/Project/removeMember/:id', projectController.removeMember)      //DONE
route.get('/api/Project/:id', projectController.getMembers)
route.get('/api/Project/:id', projectController.getProjUS)
route.delete('/api/Projects/:id', projectController.deleteProject)   //DONE [basic deletion]



//SPRINT api here
// route.post('/api/Sprint', sprintController.createSprint)     //TODO
// route.put('/api/Sprint/:id', sprintController.editSprint)    //TODO
// route.delete('/api/Sprint/:id', sprintController.deleteSprint)   //TODO
export default route
