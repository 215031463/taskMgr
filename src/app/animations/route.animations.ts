import { AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

export const routeAnim: AnimationEntryMetadata = trigger('slideToRight', [
  state('void', style({ 'position': 'fixed', 'width': '100%', 'height': '80%' })),
  state('*', style({ 'position': 'fixed', 'width': '100%', 'height': '80%' })),
  transition(':enter', [
    style({ 'transform': 'translateX(-100%)', 'opacity': 0 }),
    group([
      animate('.3s ease-in', style({ 'opacity': 1 })),
      animate('.3s ease-in', style({ 'transform': 'translateX(0)' }))
    ])
  ]),
  transition(':leave', [
    style({ 'transform': 'translateX(0)', 'opacity': 1 }),
    group([
      animate('.3s ease-in', style({ 'opacity': 0 })),
      animate('.3s ease-out', style({ 'transform': 'translateX(100%)' }))
    ])
  ])
]);
