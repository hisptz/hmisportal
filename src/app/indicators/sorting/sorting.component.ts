import {Component, Input, OnInit} from '@angular/core';
import {Indicator} from '../../shared/models/indicator';
import {IndicatorGroup} from '../../shared/models/indicatorGroup';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/reducers/index';
import * as indicatorAction from '../../store/actions/indicator.actions';
import * as indicatorGroupAction from '../../store/actions/indicatorGroup.actions';


@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  @Input() indicators: Indicator[] = [];
  @Input() indicator_group: IndicatorGroup;
  newIndicator: any = {
    id: 'new',
    title: 'Untitled Indicator',
    cardClass: 'col-sm-4'
  };
  constructor(private store: Store<ApplicationState>) { }



  ngOnInit() {
  }

  trackItem(index, item) {
    return item ? item.id : undefined;
  }

  resizeCard(indicator: Indicator) {
    if (indicator.cardClass === 'col-sm-12') {
      this.setClass('col-sm-12 col-md-6 col-lg-6', indicator.id);
    } else if (indicator.cardClass === 'col-sm-12 col-md-6 col-lg-6') {
      this.setClass('col-sm-12 col-md-12 col-lg-12', indicator.id);
    } else if (indicator.cardClass === 'col-sm-12 col-md-12 col-lg-12') {
      this.setClass('col-sm-12 col-md-6 col-lg-6', indicator.id);
    } else {
      this.setClass('col-sm-12 col-md-6 col-lg-6', indicator.id);
    }
  }

  setClass(classValue,  id) {
    this.store.dispatch(new indicatorAction.UpdateIndicator({
      indicator: {
        id: id,
        changes: {
          cardClass: classValue
        }
      }
    }));
  }

  onDropSuccess() {
    this.store.dispatch(new indicatorGroupAction.UpdateIndicatorGroup({
      indicatorGroup: {
        id: this.indicator_group.id,
        changes: {
          indicators: this.indicators.map(indicator => indicator.id)
        }
      }
    }));
  }

}
