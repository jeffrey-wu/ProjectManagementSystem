import { Sprint } from "../Sprint/sprint"
import { User } from "../UserModel/user"
import { UserStory } from "../UserStoryModel/user-story"
export class Project {
    _id: string
    ProjectName: string
    // Sprints: Sprint[]
    ProjectStart: string
    ProjectEnd: string
    ProjectUserStories: UserStory[]
    Members: any[]      //change array from any to user
                        //once adding account session 
                        //is a success
}
