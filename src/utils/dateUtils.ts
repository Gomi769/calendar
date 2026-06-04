export const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};

export const formatDateKorean = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${year}년 ${month}월 ${day}일`;
};

export const sortByDateTime = <T extends { date: string; startTime: string }>(items: T[]) => {
  return [...items].sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`));
};
