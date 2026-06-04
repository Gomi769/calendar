import { FormEvent, useState } from 'react';
import { categoryLabels, priorityLabels } from '../data/initialSchedules';
import type { ScheduleCategory, ScheduleInput, SchedulePriority } from '../types/schedule';
import { getTodayString } from '../utils/dateUtils';

type ScheduleFormProps = {
  onSubmit: (input: ScheduleInput) => void;
};

const ScheduleForm = ({ onSubmit }: ScheduleFormProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getTodayString());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [category, setCategory] = useState<ScheduleCategory>('study');
  const [priority, setPriority] = useState<SchedulePriority>('normal');
  const [memo, setMemo] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      alert('일정 제목을 입력하세요.');
      return;
    }

    onSubmit({
      title: title.trim(),
      date,
      startTime,
      endTime,
      category,
      priority,
      memo: memo.trim()
    });

    setTitle('');
    setMemo('');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-row full">
        <label htmlFor="title">일정 제목</label>
        <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="예: React 과제 제출" />
      </div>

      <div className="form-row">
        <label htmlFor="date">날짜</label>
        <input id="date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="startTime">시작 시간</label>
        <input id="startTime" type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="endTime">종료 시간</label>
        <input id="endTime" type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="category">카테고리</label>
        <select id="category" value={category} onChange={(event) => setCategory(event.target.value as ScheduleCategory)}>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="priority">중요도</label>
        <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value as SchedulePriority)}>
          {Object.entries(priorityLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row full">
        <label htmlFor="memo">메모</label>
        <textarea id="memo" value={memo} onChange={(event) => setMemo(event.target.value)} placeholder="일정에 필요한 간단한 메모" />
      </div>

      <button className="primary-button" type="submit">
        일정 등록
      </button>
    </form>
  );
};

export default ScheduleForm;
