import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {classes, sources, sorts, years, areas, querys} from '../../routes/type/types';

export interface FilterParams {
  pid: string;
  query?: string;
  year: string;
  area: string;
  sort: string;
  source: string;
}

@Component({
  selector: 'app-video-filter',
  templateUrl: './video-filter.component.html',
  styleUrls: ['./video-filter.component.scss']
})

export class VideoFilterComponent implements OnInit {
  @Input('hasQuery') hasQuery = false;
  @Input('classes') classes = [];
  @Input('filterParams') filterParams: FilterParams;
  @Output() filterParamsChange: EventEmitter<FilterParams> = new EventEmitter<FilterParams>();
  searchClasses = classes;
  sources = sources;
  sorts = sorts;
  years = years;
  areas = areas;
  querys = querys;
  constructor() {
  }

  ngOnInit() {
  }

  handleEmit() {
    this.filterParamsChange.emit(this.filterParams);
  }

  handleChangePid(pid: string) {
    this.filterParams.pid = pid;
    this.handleEmit();
  }

  handleChangeSort(sort: string) {
    this.filterParams.sort = sort;
    this.handleEmit();
  }

  handleChangeSource(source: string) {
    this.filterParams.source = source;
    this.handleEmit();
  }

  handleChangeYear(year: string) {
    this.filterParams.year = year;
    this.handleEmit();
  }

  handleChangeArea(area: string) {
    this.filterParams.area = area;
    this.handleEmit();
  }
  handleChangeQuery(query: string) {
    this.filterParams.query = query;
    this.handleEmit();
  }
}
