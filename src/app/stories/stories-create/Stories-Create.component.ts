import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Story} from '../stories.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {StoriesService} from '../stories.service';
import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-stories-create',
  templateUrl: './Stories-Create.component.html',
  styleUrls: ['./Stories-Create.component.css']
})

export class StoriesCreateComponent implements OnInit, OnDestroy{

  story: Story;
  isLoading = false;
  form: FormGroup;
  imageVideoPreview: string;
  private mode = 'create';
  private storyId: string;
  private authStatusSub: Subscription;
  constructor(public storiesService:StoriesService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      imageVideo: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.storyId = paramMap.get('storyId');
        this.isLoading = true;
        this.storiesService.getStory(this.storyId).subscribe(storyData => {
          this.isLoading = false;
          this.story = {
            id: storyData._id,
            imageVideoPath: storyData.imageVideoPath,
            creator: storyData.creator,
            date: storyData.date
          };
          this.form.setValue({
            imageVideo: this.story.imageVideoPath,
          });
        });
      } else {
        this.mode = 'create';
        this.storyId = null;
      }
    });
  }
  onImageVideoPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imageVideo: file });
    this.form.get('imageVideo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageVideoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveStory() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.storiesService.addStory(
        this.form.value.imageVideo
      );
    }
    this.form.reset();

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }



}
