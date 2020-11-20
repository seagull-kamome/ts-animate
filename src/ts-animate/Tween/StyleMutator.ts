/**
 * @file
 *
 * Copyright (C) 2020. HATTORI, Hiroki
 * All rights reserved.
 */

import { TweenListener, emptyListener } from '../Tween';
import { RGB, RGBA, formatRGBString, formatRGBAString } from '../ColorSpace';

export function mutateRGBStyle(sel: string, style: string, start: RGB, to: RGB): TweenListener {
  const elms = document.querySelectorAll(sel) as NodeListOf<HTMLElement>;
  if (! elms) return emptyListener;

  const f = (x: RGB) => elms.forEach(e => e.style.setProperty(style, formatRGBString(x)) );
  return ({
    onStart: () => f(start),
    onUpdate: (t, v) => f(start.map((x, i) =>  Math.floor(to[i] * v - x * (v - 1.0))) as RGB ),
    onComplete: () => f(to)
  });
}

export function mutateRGBAStyle(sel: string, style: string, start: RGBA, to: RGBA): TweenListener {
  const elms = document.querySelectorAll(sel) as NodeListOf<HTMLElement>;
  if (! elms) return emptyListener;

  const f = (x: RGBA) => elms.forEach(e => e.style.setProperty(style, formatRGBAString(x)) );
  return ({
    onStart: () => f(start),
    onUpdate: (t, v) => f(start.map((x, i) => Math.floor(to[i] * v - x * (v - 1.0))) as RGBA ),
    onComplete: () => f(to)
  });
}

