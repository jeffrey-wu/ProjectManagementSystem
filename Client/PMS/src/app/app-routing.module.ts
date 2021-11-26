import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';
import { UserStoriesComponent } from './user-stories/user-stories.component';
//1. import more components

const routes: Routes = [
  { path: 'api/userList/', component: RegisterComponent },
  { path: 'api/Projects', component: ProjectManagerComponent },   //fixing naming conventions
  { path: 'api/Projects/:id', component: ProjectComponent
  
  //still testing child routing
  // children: [
  //   {
  //     path: 'Project/:id/userstories', // child route path
  //     component: UserStoriesComponent, // child route component that the router renders
  //   }
  // ]
  //still testing child routing

},      //(i.e URL projects for single proj??? really???)
  { path: 'api/Project/userstories', component: UserStoriesComponent },
  {path: '', redirectTo: 'api/Projects', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
