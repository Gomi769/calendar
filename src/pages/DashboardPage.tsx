import { useMemo } from 'react';
import ScheduleSummary from '../components/ScheduleSummary';
import TodayPanel from '../components/TodayPanel';
import { useSchedule } from '../context/ScheduleContext';
import { getTodayString, sortByDateTime } from '../utils/dateUtils';

const DashboardPage = () => {
  const { schedules, totalCount, completedCount, incompleteCount } = useSchedule();
  const today = getTodayString();

  const todaySchedules = useMemo(() => schedules.filter((schedule) => schedule.date === today), [schedules, today]);
  const upcomingSchedules = useMemo(
    () => sortByDateTime(schedules.filter((schedule) => !schedule.completed && schedule.date >= today)).slice(0, 5),
    [schedules, today]
  );

  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>개인 스케줄을 간단하게 등록하고 관리합니다.</h2>
          <p>오늘 일정, 미완료 일정, 완료율을 한 화면에서 확인할 수 있습니다.</p>
        </div>
      </section>

      <ScheduleSummary totalCount={totalCount} completedCount={completedCount} incompleteCount={incompleteCount} />
      <TodayPanel schedules={todaySchedules} />

      <section className="panel">
        <h2>다가오는 미완료 일정</h2>
        <div className="mini-list">
          {upcomingSchedules.map((schedule) => (
            <div key={schedule.id} className="mini-item">
              <strong>{schedule.date}</strong>
              <span>{schedule.startTime}</span>
              <p>{schedule.title}</p>
            </div>
          ))}
          {upcomingSchedules.length === 0 && <p className="muted">다가오는 미완료 일정이 없습니다.</p>}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
