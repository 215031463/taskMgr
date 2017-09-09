import { AnimationEntryMetadata } from '@angular/core';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

export const listAnim: AnimationEntryMetadata = trigger('list', [
  transition('* => *', [
    query(':enter', style({ 'opacity': 0 }), {optional: true}),
    query(':enter', stagger(500, [
      animate('1s', style({ 'opacity': 1 }))
    ]), {optional: true}),
    query(':leave', style({ 'opacity': 1 }), {optional: true}),
    query(':leave', stagger(500, [
      animate('1s', style({ 'opacity': 0 }))
    ]), {optional: true})
  ])
]);
