import {Action} from '@ngrx/store';
/**
 * Created by kelvin on 7/29/17.
 */
export const ADD_SCORE_CARDS = 'ADD_SCORE_CARDS';
export const SET_SELECTED_PERIOD = 'SET_SELECTED_PERIOD';
export const SET_SELECTED_OU = 'SET_SELECTED_OU';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export class AddScorecardsAction implements Action {
  type = ADD_SCORE_CARDS;
  constructor ( public payload: any ) {}
}

export class SetSelectedPeriodAction implements Action {
  type = SET_SELECTED_PERIOD;
  constructor ( public payload: any ) {}
}

export class SetSelectedOuAction implements Action {
  type = SET_SELECTED_OU;
  constructor ( public payload: any ) {}
}

export class SetPageAction implements Action {
  type = SET_CURRENT_PAGE;
  constructor ( public payload: any ) {}
}
