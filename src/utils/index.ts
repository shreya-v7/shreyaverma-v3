export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const getCompanyDuration = (roles: Array<{ duration: string }>): string => {
  if (roles.length <= 1) return roles[0]?.duration || '';
  
  const parseDate = (dateStr: string): Date => {
    if (dateStr.toLowerCase() === 'present') return new Date(9999, 11, 31);
    const parts = dateStr.trim().split(' ');
    if (parts.length !== 2) return new Date(0);
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const month = monthMap[parts[0]];
    const year = parseInt(parts[1]);
    return isNaN(year) || month === undefined ? new Date(0) : new Date(year, month);
  };

  const formatDate = (date: Date): string => {
    if (date.getFullYear() === 9999) return 'Present';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  let earliestStart: Date | null = null;
  let latestEnd: Date | null = null;

  roles.forEach(role => {
    const [startStr, endStr] = role.duration.split(' - ').map(s => s.trim());
    const startDate = parseDate(startStr);
    const endDate = parseDate(endStr);
    if (!earliestStart || startDate < earliestStart) earliestStart = startDate;
    if (!latestEnd || endDate > latestEnd) latestEnd = endDate;
  });

  return earliestStart && latestEnd ? `${formatDate(earliestStart)} - ${formatDate(latestEnd)}` : roles[0].duration;
};

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

export const generateTechStackColors = (
  items: Array<{ roles?: Array<{ techStack: string[] }>; techStack?: string[] }>
): Record<string, string> => {
  const colors: Record<string, string> = {};
  items.forEach((item) => {
    (item.roles ? item.roles.flatMap(r => r.techStack) : item.techStack || []).forEach((tech) => {
      if (!colors[tech]) colors[tech] = getRandomColor();
    });
  });
  return colors;
};
