import { PipeTransform, Pipe } from '@angular/core';
import { Post} from './post.model';

@Pipe({
  name: 'postImageFilter'
})
export class PostImageFilter implements PipeTransform {
  transform(posts: Post[], Image: boolean): Post[] {
    if (!posts || !Image) {
      return posts;
    }
    return null;
  }
}
