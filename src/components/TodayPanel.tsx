import { Link } from 'react-router-dom';
import EmptyState from './EmptyState';
import type { Schedule } from '../types/schedule';
import { sortByDateTime } from '../utils/dateUtils';

type TodayPanelProps = {
  schedules: Schedule[];
};

const TodayPanel = ({ schedules }: TodayPanelProps) => {
  const sorted = sortByDateTime(schedules);

  if (sorted.length === 0) {
    return <EmptyState title="오늘 일정이 없습니다" description="일정추가 화면에서 새로운 스케줄을 등록해 보세요." />;
  }

  return (
    <section className="panel">
      <div className="panel-title-row">
        <h2>오늘의 일정</h2>
        <Link to="/schedules">전체 보기</Link>
      </div>
      <div className="today-list">
        {sorted.map((schedule) => (
          <Link key={schedule.id} to={`/schedules/${schedule.id}`} className="today-item">
            <strong>{schedule.startTime}</strong>
            <span>{schedule.title}</span>
            <em>{schedule.completed ? '완료' : '진행 전'}</em>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TodayPanel;
