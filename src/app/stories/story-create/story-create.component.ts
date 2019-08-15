import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { StoriesService } from "../stories.service";
import { Story } from "../Story.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-story-create",
  templateUrl: "./story-create.component.html",
  styleUrls: ["./story-create.component.css"]
})
export class StoryCreateComponent implements OnInit {
  story: Story;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private storyId: string;

  constructor(
    public storiesService: StoriesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: []
      }),
      content: new FormControl(null, { validators: [] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("storyId")) {
        this.mode = "edit";
        this.storyId = paramMap.get("storyId");
        this.isLoading = true;
        this.storiesService.getStory(this.storyId).subscribe(storyData => {
          this.isLoading = false;
          this.story = {
            id: storyData._id,
            title: storyData.title,
            content: storyData.content,
            imagePath: storyData.imagePath
          };
          this.form.setValue({
            title: this.story.title,
            content: this.story.content,
            image: this.story.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.storyId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.storiesService.addStory(
        'null',
        'null',
        this.form.value.image
      );
    } else {
      this.storiesService.updateStory(
        this.storyId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
