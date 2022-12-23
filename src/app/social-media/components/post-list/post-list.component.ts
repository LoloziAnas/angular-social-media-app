import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {Post} from "../../../core/models/post.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(map(data => data['posts']));
  }

}
