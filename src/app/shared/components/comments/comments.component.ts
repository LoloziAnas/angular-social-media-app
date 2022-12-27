import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../core/models/comment.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {animate, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem',[
      state('default', style({transform:'scale(1)', 'background-color': 'white', 'z-index': 1})),
      state('active', style({transform:'scale(1.05)', 'background-color': 'rgb(201,157,242)', 'z-index': 2})),
      transition('default => active',[animate('100ms ease-in-out')]),
      transition('active => default', [animate('500ms ease-in-out')]),
      transition('void => *', [
        style({transform:'translateX(-100%)', opacity:0, 'background-color':'rgb(201,157,247)',}),
        animate('250ms ease-in-out', style({transform:'translateX(0)', opacity:1, 'background-color':'white'}))]
      ),
      transition(':enter',[
        query('.comment-text, .comment-date',[style({opacity:0})]),
        style({transform:'translateX(-100%)', opacity:0, 'background-color':'rgb(201, 157, 242)',}),
        animate('250ms ease-out', style({transform:'translateX(0)', opacity:1, 'background-color':'white'})),
        query('span',[
          style({opacity:0}),
          animate('500ms', style({opacity:1}))])
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {
  @Input() comments!: Comment[];
  //Instantiate an Event Emitter of type string.
  @Output() newComment = new EventEmitter<string>;
  commentCtrl!: FormControl;
  // For animations
  animationStates: {[key: number]: 'default' | 'active'} = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //Build a comment form control by formBuilder object
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
    for(let index in this.comments){
      this.animationStates[index] = 'default';
    }
  }
  /*Method for leaving a comment in a specific post*/
  onLeaveComment() {
    //If the form control not valid
    if(this.commentCtrl.invalid) return;
    //Return the max identifier in post's comment
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    //Add the new comment to the beginning of the comment's array
    this.comments.unshift({
      id: maxId + 1, comment: this.commentCtrl.value, createdDate: new Date().toISOString(), userId: 1
    });
    //Emit the event
    this.newComment.emit(this.commentCtrl.value);
    //Reset the form control
    this.commentCtrl.reset();
  }
  onListItemMouseEnter(index: number){
    this.animationStates[index] = 'active';
  }
  onListItemMouseLeave(index: number){
    this.animationStates[index] = 'default';
  }
}
