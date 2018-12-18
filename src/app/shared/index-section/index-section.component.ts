import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

interface VideoInfoLite {
  _id: string;
  name: string;
  thumbnail: string;
  latest: string;
  generated_at: string;
}
interface SectionItem {
  _id: string;
  name: string;
  children: VideoInfoLite[];
}

@Component({
  selector: 'app-index-section',
  templateUrl: './index-section.component.html',
  styleUrls: ['./index-section.component.scss']
})
export class IndexSectionComponent implements OnInit {
  @Input()
  item: SectionItem;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  handleItemClick(id: string) {
    this.router.navigate(['/video', id]);
    console.log(id);
  }
}
