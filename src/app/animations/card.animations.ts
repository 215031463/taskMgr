import { AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export const cardAnim: AnimationEntryMetadata = trigger('card', [
  state('out', style({ 'transform': 'scale(1)', 'box-shadow': 'none' })),
  state('hover', style({ 'transform': 'scale(1.1)', 'box-shadow': '3px 3px 5px 6px #ccc' })),
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out'))
]);