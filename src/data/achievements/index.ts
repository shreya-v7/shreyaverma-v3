import { sortAchievements } from '../../lib/achievements';
import { allAchievementEntries } from './entries';

export const achievementsData = sortAchievements(allAchievementEntries);
