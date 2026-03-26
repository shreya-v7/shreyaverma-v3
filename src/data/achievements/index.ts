import { sortAchievements } from '../../lib/achievements';
import { allAchievementEntries } from './entries';

export {
  CTX,
  GROUP,
  ACHIEVEMENT_GROUP_ORDER,
  achievementGroupSortIndex,
} from './contexts';
export { allAchievementEntries } from './entries';

export const achievementsData = sortAchievements(allAchievementEntries);
