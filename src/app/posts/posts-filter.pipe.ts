import { PipeTransform, Pipe } from '@angular/core';
import { Post} from './post.model';

@Pipe({
  name: 'postFilter'
})
export class PostsFilterPipe implements PipeTransform {
  transform(posts: Post[], searchTerm: string): Post[] {
    if (!posts || !searchTerm) {
      return posts;
    }

    return posts.filter(post =>
      post.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
