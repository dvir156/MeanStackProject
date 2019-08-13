import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],

})
export class PostListComponent implements OnInit, OnDestroy {



  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  searchTermByName: string;
  searchTermByContent: string;
  recommendedPost: Post;
  likedPost: boolean;
  findRecPost: boolean = false;
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


  onLike(post: Post, userId: string) {
    let num = parseInt(post.numOflikes, 10);
    num += 1;
    post.numOflikes = String(num);
    if(post.userIdThatLiked =='null')
    {
      post.userIdThatLiked = userId;
    }
    else{
      post.userIdThatLiked +=userId;
    }
    this.postsService.updatePost(post.id, post.title, post.content, post.imagePath, post.numOflikes, post.userIdThatLiked);
  }

  onDislike(post: Post,userId: string) {
    let num = parseInt(post.numOflikes, 10);
    num -= 1;
    post.numOflikes = String(num);
    let str = post.userIdThatLiked.replace(userId,'');
    this.postsService.updatePost(post.id, post.title, post.content, post.imagePath, post.numOflikes, str);
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  updateLikeButton(post: Post,userId: string)
  {
      return post.userIdThatLiked.includes(userId);
  }

  statisticRecommended(userId: string)
  {
    let userPostLiked;
    let count = 0;
    for (let i = 0;i<this.posts.length;i++)
    {
      count +=1;
      if(this.posts[i].userIdThatLiked.includes(userId))
      {
        userPostLiked = this.posts[i].creator;
        break;
      }
    }
    for (let i = 0;i<this.posts.length;i++)
    {
      if(count!= i && this.posts[i].creator == userPostLiked && !(this.posts[i].userIdThatLiked.includes(userId)))
      {
        this.findRecPost = true;
        this.recommendedPost = this.posts[i];
        return;
      }
    }
    this.findRecPost = false;
  }


  onClickPost(post: Post, userId: string) {
      this.likedPost = !this.updateLikeButton(post,userId);
      this.statisticRecommended(userId);
  }
}
