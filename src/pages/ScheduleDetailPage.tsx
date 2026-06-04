import { Link, useNavigate, useParams } from 'react-router-dom';
import { categoryLabels, priorityLabels } from '../data/initialSchedules';
import { useSchedule } from '../context/ScheduleContext';
import { formatDateKorean } from '../utils/dateUtils';

const ScheduleDetailPage = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { schedules, toggleComplete, deleteSchedule } = useSchedule();
  const schedule = schedules.find((item) => item.id === scheduleId);

  if (!schedule) {
    return (
      <section className="panel">
        <h2>일정을 찾을 수 없습니다</h2>
        <p>삭제되었거나 존재하지 않는 일정입니다.</p>
        <Link to="/schedules">목록으로 돌아가기</Link>
      </section>
    );
  }

  const handleDelete = () => {
    deleteSchedule(schedule.id);
    navigate('/schedules');
  };

  return (
    <div className="page-stack">
      <section className="detail-card">
        <p className="eyebrow">Schedule Detail</p>
        <h2>{schedule.title}</h2>
        <dl>
          <div>
            <dt>날짜</dt>
            <dd>{formatDateKorean(schedule.date)}</dd>
          </div>
          <div>
            <dt>시간</dt>
            <dd>{schedule.startTime} ~ {schedule.endTime}</dd>
          </div>
          <div>
            <dt>카테고리</dt>
            <dd>{categoryLabels[schedule.category]}</dd>
          </div>
          <div>
            <dt>중요도</dt>
            <dd>{priorityLabels[schedule.priority]}</dd>
          </div>
          <div>
            <dt>상태</dt>
            <dd>{schedule.completed ? '완료' : '미완료'}</dd>
          </div>
          <div>
            <dt>메모</dt>
            <dd>{schedule.memo || '메모 없음'}</dd>
          </div>
        </dl>
        <div className="card-actions">
          <button type="button" onClick={() => toggleComplete(schedule.id)}>
            {schedule.completed ? '미완료로 변경' : '완료 처리'}
          </button>
          <button type="button" className="danger" onClick={handleDelete}>
            삭제
          </button>
          <Link to="/schedules">목록으로</Link>
        </div>
      </section>
    </div>
  );
};

export default ScheduleDetailPage;
