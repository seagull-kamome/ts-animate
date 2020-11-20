/**
 * @file
 * @brief Variouse Tweens for Typescript.
 *
 * Copyright (C) 2020. HATTORI, Hiroki.
 * All rights reserved.
 */

export interface EasingFunction { (t: number): number; }

export interface TweenListener {
  onStart(): void;
  onUpdate(t: number, x: number): void;
  onComplete?(): void;
}

export const emptyListener: TweenListener = {
  onStart: () => {},
  onUpdate: (t, x) => {}
};

enum TweenState { STOPPED, RUNNING, STOP_PENDING };

export class Tween {
  private state: TweenState = TweenState.STOPPED;

  constructor(
    private readonly easing: EasingFunction,
    private readonly duration: number,
    private readonly repeat: boolean,
    private readonly listenner: TweenListener) {
  }

  start(): boolean {
    if (this.state != TweenState.STOPPED) return false;

    this.listenner.onStart();

    let starttime: number|null = null;
    this.state = TweenState.RUNNING;
    const cb = (t: DOMHighResTimeStamp) => {
      if (!starttime) starttime = t;

      const t1 = t - starttime;

      if (this.state == TweenState.STOP_PENDING) {
        if (!! this.listenner.onComplete) this.listenner.onComplete();
        this.state = TweenState.STOPPED;
      } else if (this.repeat || t1 < this.duration) {
        const tt = t1 % this.duration / this.duration;
        this.listenner.onUpdate(tt, this.easing(tt));
        window.requestAnimationFrame(cb);
      } else if (t1 >= this.duration) {
        this.listenner.onUpdate(1, this.easing(1));
        if (!! this.listenner.onComplete) this.listenner.onComplete();
        this.state = TweenState.STOPPED;
      } };
    window.requestAnimationFrame(cb);
    return true;
  }

  stop(): boolean {
    if (this.state != TweenState.RUNNING) return true;
    this.state = TweenState.STOP_PENDING;
    return false;
  }

  isRunning(): boolean { return this.state != TweenState.STOPPED? true : false; }
}

export const easeLinear: EasingFunction = t => t;

export const easeInQuad: EasingFunction = t => t * t;
export const easeOutQuad: EasingFunction = t => t * (2 - t);
export const easeInOutQuad: EasingFunction = t =>
  ((t *= 2) < 1)? (0.5 * t * t) : (0.5 * (-t * (t - 2) -1) );

export const easeInCubic: EasingFunction = t => t * t * t;
export const easeOutCubic: EasingFunction = t => --t * t * t + 1;
export const easeInOutCubic: EasingFunction = t =>
  ((t *= 2) < 1)? (0.5 * t * t * t) : (0.5 * (t - 2) * t * t - 2);

export const easeInSinusodial: EasingFunction = t => 1 - Math.cos((t * Math.PI) / 2);
export const easeOutSinusodial: EasingFunction = t => Math.sin((t * Math.PI) / 2);
export const easeInOutSinusodial: EasingFunction = t => 0.5 * (1 - Math.cos(Math.PI * t));

export const easeInExponential: EasingFunction = t => (t == 0)? 0 : Math.pow(1024, t - 1);
export const easeOutExponential: EasingFunction = t => (t == 1)? 1 : 1 - Math.pow(2, -10 * t);
export const easeInOutExponential: EasingFunction = t =>
  (t == 0)? 0
    : (t == 1)? 1
    : ((t *= 2) < 1)? (0.5 * Math.pow(1024, t - 1))
    : (0.5 * (-Math.pow(2, -10 * (t - 1)) + 2));

export const easeInCircular: EasingFunction = t => 1 - Math.sqrt(1 - t * t);
export const easeOutCircular: EasingFunction = t => Math.sqrt(1 - --t * t);
export const easeInOutCircular: EasingFunction = t =>
  ((t *= 2) < 1)? (-0.5 * (Math.sqrt(1 - t * t) - 1))
    : (0.5 * Math.sqrt(1 - (t -= 2) * t) + 1);

export const easeInElastic: EasingFunction = t =>
  (t == 0)? 0 : (t == 1)? 1 : (Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI));
export const easeOutElastic: EasingFunction = t =>
  (t == 0)? 0 : (t == 1)? 1 : (Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1);
export const easeInOutElastic: EasingFunction = t =>
  (t == 0)? 0 : (t == 1)? 1 :
    ((t *= 2) < 1)?  (-0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI))
    :  (0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1);

export const easeInBounce: EasingFunction = t => 1 - easeOutBounce(1 - t);
export const easeOutBounce: EasingFunction = t =>
  (t < 1 / 2.75)? 7.5625 * t * t
    : (t < 2 / 2.75)? 7.5625 * (t -= 1.5 / 2.75) * t * 0.75
    : (t < 2.5 / 2.75)? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    : 7.5625 * (t - 2.625 / 2.75) * t + 0.984375;
export const easeInOUtBounce: EasingFunction = t =>
  (t < 0.5)? easeInBounce(t * 2) * 0.5 : easeOutBounce(t * 2 - 1) * 0.5 + 0.5;




