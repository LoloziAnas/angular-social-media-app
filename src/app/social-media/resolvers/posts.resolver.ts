import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../../core/models/post.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {PostsService} from "../../core/services/posts.service";

@Injectable()

export class PostsResolver implements Resolve<Post[]>{
  constructor(private postsService: PostsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> | Promise<Post[]> | Post[] {

    return this.postsService.getPosts();
  }

}
