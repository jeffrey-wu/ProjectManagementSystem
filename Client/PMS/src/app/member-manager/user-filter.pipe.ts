import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Models/UserModel/user';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(userList: any[], searchText: string): any[] {
    if(!userList) return [];
    if(!searchText) return userList;

    return userList.filter(user => {
      return Object.keys(user).some(key => {
        return String (user[key]).includes(searchText)
      })
    })
  }

}
