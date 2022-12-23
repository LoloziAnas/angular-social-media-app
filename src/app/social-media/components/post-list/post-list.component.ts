import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {Post} from "../../../core/models/post.model";
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../../../core/services/posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>
  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(map(data => data['posts']));
  }

  onPostComment(postComment: {comment: string; postId: number}) {
    this.postsService.addNewComment(postComment);
  }
}
