import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'NameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(users: any[], searchTerm: string): any[] {
    if (!users || !searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
