export type MealItem = {
  title: string;
  description: string;
  macros: string;
};

export type RecipeBlock = {
  title: string;
  lines: string[];
};

export type FoodPlan = {
  title: string;
  dailyDefaults: string[];
  dailyTarget: {
    summary: string;
    floor: string;
  };
  weeklyFocus?: string[];
  breakfasts: MealItem[];
  lunches: MealItem[];
  dinners: MealItem[];
  snacks: string[];
  recipes: RecipeBlock[];
  sundayPrep: string[];
  grocery: {
    produce: string;
    protein: string;
    pantry: string;
    budget: string;
  };
  rules: string[];
};

export type FoodPlanPayload = {
  plan: FoodPlan;
  source: 'default' | 'claude' | 'cache';
  updatedAt: string;
};
