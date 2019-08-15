import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Story } from "./Story.model";

@Injectable({ providedIn: "root" })
export class StoriesService {
  private stories: Story[] = [];
  private storiesUpdated = new Subject<Story[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getStories() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/stories")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.stories = transformedPosts;
        this.storiesUpdated.next([...this.stories]);
      });
  }
  getStoryUpdateListener() {
    return this.storiesUpdated.asObservable();
  }

  getStory(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(
      "http://localhost:3000/api/stories/" + id
    );
  }

  addStory(title: string, content: string, image: File) {
    const storyData = new FormData();
    storyData.append("title", title);
    storyData.append("content", content);
    storyData.append("image", image, title);
    this.http
      .post<{ message: string; story: Story }>(
        "http://localhost:3000/api/stories",
        storyData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateStory(id: string, title: string, content: string, image: File | string) {
    let storyData: Story | FormData;
    if (typeof image === "object") {
      storyData = new FormData();
      storyData.append("id", id);
      storyData.append("title", title);
      storyData.append("content", content);
      storyData.append("image", image, title);
    } else {
      storyData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http
      .put("http://localhost:3000/api/stories/" + id, storyData)
      .subscribe(response => {
        const updatedStories = [...this.stories];
        const oldStoryIndex = updatedStories.findIndex(p => p.id === id);
        const story: Story = {
          id: id,
          title: title,
          content: content,
          imagePath: ""
        };
        updatedStories[oldStoryIndex] = story;
        this.stories = updatedStories;
        this.storiesUpdated.next([...this.stories]);
        this.router.navigate(["/"]);
      });
  }

  deleteStory(storyId: string) {
    this.http
      .delete("http://localhost:3000/api/stories/" + storyId)
      .subscribe(() => {
        const updatedStories = this.stories.filter(story => story.id !== storyId);
        this.stories = updatedStories;
        this.storiesUpdated.next([...this.stories]);
      });
  }
}
