import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'lastNameFilter'
})
export class LastnameFilter implements PipeTransform {
  transform(users: any[], searchTerm: string): any[] {
    if (!users || !searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
