import { useNavigate } from 'react-router-dom';
import ScheduleForm from '../components/ScheduleForm';
import { useSchedule } from '../context/ScheduleContext';
import type { ScheduleInput } from '../types/schedule';

const AddSchedulePage = () => {
  const { addSchedule } = useSchedule();
  const navigate = useNavigate();

  const handleSubmit = (input: ScheduleInput) => {
    addSchedule(input);
    navigate('/schedules');
  };

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Add Schedule</p>
        <h2>새 일정 추가</h2>
        <p>제목, 날짜, 시간, 카테고리, 중요도, 메모를 입력하여 개인 일정을 등록합니다.</p>
      </section>
      <ScheduleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddSchedulePage;
