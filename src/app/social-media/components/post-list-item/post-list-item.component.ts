import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../core/models/post.model";

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() postComment = new EventEmitter<{comment: string, postId: number}>();
  constructor() { }

  ngOnInit(): void {
  }

  onNewComment(comment: string) {
    this.postComment.emit({comment, postId: this.post.id});
    console.log(comment);
  }
}
