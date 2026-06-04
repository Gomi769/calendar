import { Link } from 'react-router-dom';
import { categoryLabels, priorityLabels } from '../data/initialSchedules';
import type { Schedule } from '../types/schedule';
import { formatDateKorean } from '../utils/dateUtils';

type ScheduleCardProps = {
  schedule: Schedule;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const ScheduleCard = ({ schedule, onToggle, onDelete }: ScheduleCardProps) => {
  return (
    <article className={`schedule-card ${schedule.completed ? 'completed' : ''}`}>
      <div className="schedule-card-header">
        <div>
          <span className={`badge ${schedule.priority}`}>중요도 {priorityLabels[schedule.priority]}</span>
          <h3>{schedule.title}</h3>
        </div>
        <span className="category-badge">{categoryLabels[schedule.category]}</span>
      </div>

      <p className="schedule-time">
        {formatDateKorean(schedule.date)} / {schedule.startTime} ~ {schedule.endTime}
      </p>
      <p className="schedule-memo">{schedule.memo || '메모 없음'}</p>

      <div className="card-actions">
        <button type="button" onClick={() => onToggle(schedule.id)}>
          {schedule.completed ? '미완료로 변경' : '완료 처리'}
        </button>
        <Link to={`/schedules/${schedule.id}`}>상세보기</Link>
        <button type="button" className="danger" onClick={() => onDelete(schedule.id)}>
          삭제
        </button>
      </div>
    </article>
  );
};

export default ScheduleCard;
