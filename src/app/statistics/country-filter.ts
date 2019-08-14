import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilter implements PipeTransform {
  transform(users: any[], searchTerm: string): any[] {
    if (!users || !searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.countryName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
