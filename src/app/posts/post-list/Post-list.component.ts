import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

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
  likedPost = true;
  usersThatLiked:Array<string> = [];

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
    this.likedPost = false;
    post.numOflikes = String(num);
    //add the user id to users
    //TODO

    this.postsService.updatePost(post.id, post.title, post.content, post.imagePath, post.numOflikes,userId);
  }

  onDislike(post: Post,userId: string) {
    let num = parseInt(post.numOflikes, 10);
    num -= 1;
    this.likedPost = true;
    post.numOflikes = String(num);
    //TODO
    //delete this user from the list
    //this.usersThatLiked.filter(e => e !== userId);
    this.postsService.updatePost(post.id, post.title, post.content, post.imagePath, post.numOflikes, userId);
  }

  UserLikedThisPost(post: Post, userId: string) {
    return !post.userIdThatLiked.includes(userId);
  }

  updateList(post: Post) {
    this.usersThatLiked = [];
    this.usersThatLiked.push(post.userIdThatLiked);
  }
}
