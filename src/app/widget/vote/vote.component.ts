import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  @Input() voteCount: number = 0;
  @Input() onVoteUp?: () => void;
  @Input() onVoteDown?: () => void;
  @Input() isMyVoteUp: boolean = false;
  @Input() isMyVoteDown: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
