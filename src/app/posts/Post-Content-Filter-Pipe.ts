import { PipeTransform, Pipe } from '@angular/core';
import { Post} from './post.model';

@Pipe({
  name: 'postContentFilter'
})
export class PostContentFilterPipe implements PipeTransform {
  transform(posts: Post[], searchTerm: string): Post[] {
    if (!posts || !searchTerm) {
      return posts;
    }

    return posts.filter(post =>
      post.content.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
