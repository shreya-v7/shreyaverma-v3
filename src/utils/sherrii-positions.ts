/**
 * Position utilities for Sherrii bubble
 * Separated from main component logic
 */
import { Corner } from '../types';

export const corners: Corner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export const getCornerClasses = (corner: Corner): string => {
  switch (corner) {
    case 'top-left': return 'top-6 left-6';
    case 'top-right': return 'top-6 right-6';
    case 'bottom-left': return 'bottom-6 left-6';
    case 'bottom-right': return 'bottom-6 right-6';
    default: return 'bottom-6 right-6';
  }
};

export const getRandomCorner = (): Corner => corners[Math.floor(Math.random() * corners.length)];

/** Bubble corner away from the edge the dock button is snapped to (avoids clipping). */
export function getBubbleCornerFromDock(
  left: number,
  top: number,
  buttonWidth: number,
  buttonHeight: number
): Corner {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = left + buttonWidth / 2;
  const cy = top + buttonHeight / 2;
  const dLeft = cx;
  const dRight = vw - cx;
  const dTop = cy;
  const dBottom = vh - cy;
  const m = Math.min(dLeft, dRight, dTop, dBottom);
  if (m === dLeft) return cy < vh / 2 ? 'top-right' : 'bottom-right';
  if (m === dRight) return cy < vh / 2 ? 'top-left' : 'bottom-left';
  if (m === dTop) return cx < vw / 2 ? 'bottom-right' : 'bottom-left';
  return cx < vw / 2 ? 'top-right' : 'top-left';
}

