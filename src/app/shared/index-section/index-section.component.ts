import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

interface VideoInfoLite {
  id: string;
  name: string;
  thumbnail: string;
  latest: string;
  generated_at: string;
}

interface SectionItem {
  id: string;
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
  items: SectionItem[];
  @Input()
  index = 0;
  constructor(private router: Router) {
  }

  titles: string[] = ['电影', '电视剧', '综艺', '动漫'];

  ngOnInit() {
  }

  handleItemClick(id: string) {
    this.router.navigate(['/video', id]);
    console.log(id);
  }
}
