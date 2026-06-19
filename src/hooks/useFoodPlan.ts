import { useState } from 'react';
import type { FoodPlan } from '../types/foodPlan';
import { foodPlanFallback } from '../lib/foodPlan';

export function useFoodPlan() {
  return { plan: foodPlanFallback, loading: false };
}
