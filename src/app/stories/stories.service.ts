import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Story} from './stories.model';

const BACKEND_URL = environment.apiUrl + '/stories/';

@Injectable({ providedIn: 'root' })
export class StoriesService {

  private stories: Story[] = [];
  private storiesUpdated = new Subject<{stories: Story[], storyCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getStories(storyPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${storyPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; stories: any, maxStories: number }>(BACKEND_URL + queryParams)
      .pipe(
        map(storiesData => {
          return {
            stories: storiesData.stories.map(story => {
              return {
                id: story._id,
                imageVideoPath: story.imagePath,
                date: story.date,
                creator: story.creator,
              };
            }), maxPosts: storiesData.maxStories
          };
        })
      )
      .subscribe(transformedStoriesData => {
        this.stories = transformedStoriesData.stories;
        this.storiesUpdated.next({stories: [...this.stories], storyCount: transformedStoriesData.maxPosts});
      });
    }
    getStory(id: string) {
      return this.http.get<{
        _id: string;
        imageVideoPath: string;
        date: Date;
        creator: string;
      }>(BACKEND_URL + id);
    }
  addStory(imageVideo: File) {
    const storyData = new FormData();
    storyData.append('imageVideo', imageVideo);
    this.http.post<{ message: string; story: Story }>(
      BACKEND_URL,
      storyData
    )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  getStoriesUpdateListener() {
    return this.storiesUpdated.asObservable();
  }

  deletePost(storyId: string) {
    return this.http
      .delete(BACKEND_URL + storyId);
  }
}
