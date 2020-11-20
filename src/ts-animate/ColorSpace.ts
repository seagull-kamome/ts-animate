/**
 * @file
 * @brief Implemntation file of color spaces.
 *
 * Copyright (C) 2020, HATTORI, Hiroki
 */

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

export function rgbToRgba(x: RGB, alpha: number): RGBA { return [x[0], x[1], x[2], alpha]; }
export function rgbaToRgb(x: RGBA): [RGB, number] { return [[x[0], x[1], x[2]], x[3]]; }

export function formatRGBString(x: RGB): string {
  return  'RGB(' + x[0] + ',' + x[1] + ',' + x[2] + ')'; }
export function formatRGBAString(x: RGBA):  string {
  return 'RGBA(' + x[0] + ',' + x[1] + ',' + x[2] + ',' + x[3] + ')'; }


