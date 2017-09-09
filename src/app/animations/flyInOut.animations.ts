import { AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const flyInOut: AnimationEntryMetadata = trigger('flyInOut', [
  state('*', style({ opacity: 1, transform: 'translateX(0)' })),
  transition(':enter', animate('300ms ease-in',
    keyframes([
      style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
      style({ opacity: 1, transform: 'translateX(25px)', offset: .7 }),
      style({ opacity: 1, transform: 'translateX(0)', offset: 0 })
    ])
  )),
  transition(':leave', animate('300ms ease-in',
    keyframes([
      style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
      style({ opacity: 1, transform: 'translateX(-25px)', offset: .6 }),
      style({ opacity: 1, transform: 'translateX(100%)', offset: 0 })
    ])
  ))
]);
