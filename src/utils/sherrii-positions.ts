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

