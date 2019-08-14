import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {StoriesService} from '../stories.service';
import {Story} from '../stories.model';


@Component({
  selector: 'app-story-list',
  templateUrl: './Stories-list.component.html',
  styleUrls: ['./Stories-list.component.css'],

})

export class StoriesListComponent implements OnInit, OnDestroy {

  constructor(
    public storiesService: StoriesService,
    private authService: AuthService
  ) {}
  slideIndex:number = 1;
  stories: Story[] = [];
  isLoading = false;
  totalStories = 0;
  storiesPerPage = 1;
  currentPage = 1;
  currentStoryImage:string = "";
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private storiesSub: Subscription;
  private authStatusSub: Subscription;

  ngOnInit() {
    this.isLoading = true;
    this.storiesService.getStories(this.storiesPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.storiesSub = this.storiesService
      .getStoriesUpdateListener()
      .subscribe((storiesData: { stories: Story[]; storyCount: number }) => {
        this.isLoading = false;
        this.totalStories = storiesData.storyCount;
        this.stories = storiesData.stories;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    if(this.stories[0] != null)
    {
      this.currentStoryImage = this.stories[0].imageVideoPath;
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.storiesPerPage = pageData.pageSize;
    this.storiesService.getStories(this.storiesPerPage, this.currentPage);
  }

  onDelete(storyId: string) {
    this.isLoading = true;
    this.storiesService.deletePost(storyId).subscribe(() => {
      this.storiesService.getStories(this.storiesPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }



   plusDivs(n:number) {
     if (this.stories[this.currentPage+n-1]!=null)
     {
     this.currentPage += n;
     this.currentStoryImage = this.stories[this.currentPage - 1].imageVideoPath;
     }
     else
     {
       if(this.stories[0]!=null)
       {
       this.currentStoryImage = this.stories[0].imageVideoPath;
       }
     }
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n:number) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = x.length}
    for (i = 0; i < x.length; i++)
    {
      x[i].setAttribute("style","display:none")
    }
    x[this.slideIndex-1].setAttribute("style","display:block")
  }
  ngOnDestroy() {
    this.storiesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
