import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Story } from "../Story.model";
import { StoriesService } from "../stories.service";

@Component({
  selector: "app-story-list",
  templateUrl: "./story-list.component.html",
  styleUrls: ["./story-list.component.scss"]
})
export class StoryListComponent implements OnInit, OnDestroy {

  stories: Story[] = [];
  isLoading = false;
  private storiesSub: Subscription;
  imagesUrl:any[];
  constructor(public storiesService: StoriesService) {}

  ngOnInit() {

    this.isLoading = true;
    this.storiesService.getStories();
    this.storiesSub = this.storiesService.getStoryUpdateListener()
      .subscribe((stories: Story[]) => {
        this.isLoading = false;
        this.stories = stories;
      });
    for (let i = 0;i<this.stories.length;i++)
    {
      this.imagesUrl.push(this.stories[i].imagePath)
    }
  }

  onDelete(storyId: string) {
    this.storiesService.deleteStory(storyId);
  }

  ngOnDestroy() {
    this.storiesSub.unsubscribe();
  }
}
