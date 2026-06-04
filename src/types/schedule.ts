export type ScheduleCategory = 'study' | 'work' | 'personal' | 'exercise' | 'etc';
export type SchedulePriority = 'low' | 'normal' | 'high';

export type Schedule = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: ScheduleCategory;
  priority: SchedulePriority;
  memo: string;
  completed: boolean;
};

export type ScheduleInput = Omit<Schedule, 'id' | 'completed'>;
