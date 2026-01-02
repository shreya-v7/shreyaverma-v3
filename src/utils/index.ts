// Utility functions

/**
 * Generates a random hex color
 */
export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Formats a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats a date string with relative time
 */
export const formatDateWithRelative = (dateString: string): string => {
  const currentDate = new Date();
  if (!dateString.includes('T')) {
    dateString = `${dateString}T00:00:00`;
  }
  const targetDate = new Date(dateString);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} (${formattedDate})`;
};

/**
 * Sorts items by date (newest first)
 */
export const sortByDate = <T extends { date?: string; duration?: string }>(
  items: T[],
  dateField: 'date' | 'duration' = 'date'
): T[] => {
  return [...items].sort((a, b) => {
    const getDate = (item: T): number => {
      const value = dateField === 'date' ? item.date : item.duration;
      if (!value) return 0;
      const dateStr = dateField === 'duration' 
        ? value.split(' - ')[1] || 'Present' 
        : value;
      return new Date(dateStr).getTime();
    };
    return getDate(b) - getDate(a);
  });
};

/**
 * Generates color map for tech stack items
 */
export const generateTechStackColors = (
  items: Array<{ roles?: Array<{ techStack: string[] }>; techStack?: string[] }>
): Record<string, string> => {
  const colors: Record<string, string> = {};
  items.forEach((item) => {
    const techStacks = item.roles 
      ? item.roles.flatMap(role => role.techStack)
      : item.techStack || [];
    
    techStacks.forEach((tech) => {
      if (!colors[tech]) {
        colors[tech] = getRandomColor();
      }
    });
  });
  return colors;
};

