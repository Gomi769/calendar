import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSchedule } from '../context/ScheduleContext';
import { formatDateKorean, sortByDateTime } from '../utils/dateUtils';

const CalendarPage = () => {
  const { schedules } = useSchedule();

  const groupedSchedules = useMemo(() => {
    return sortByDateTime(schedules).reduce<Record<string, typeof schedules>>((acc, schedule) => {
      acc[schedule.date] = [...(acc[schedule.date] || []), schedule];
      return acc;
    }, {});
  }, [schedules]);

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Calendar</p>
        <h2>날짜별 스케줄</h2>
        <p>간단한 과제용 캘린더 화면으로, 등록된 일정을 날짜별로 묶어서 표시합니다.</p>
      </section>

      <div className="calendar-list">
        {Object.entries(groupedSchedules).map(([date, items]) => (
          <section key={date} className="date-group">
            <h3>{formatDateKorean(date)}</h3>
            <div className="date-items">
              {items.map((schedule) => (
                <Link key={schedule.id} to={`/schedules/${schedule.id}`} className="date-item">
                  <span>{schedule.startTime} ~ {schedule.endTime}</span>
                  <strong>{schedule.title}</strong>
                  <em>{schedule.completed ? '완료' : '미완료'}</em>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
