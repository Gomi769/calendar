import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { useSchedule } from '../context/ScheduleContext';
import { priorityLabels } from '../data/initialSchedules';
import { getTodayString, formatDateKorean, sortByDateTime } from '../utils/dateUtils';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const createMonthDate = (dateKey: string) => {
  const [year, month] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, 1);
};

const CalendarPage = () => {
  const { schedules } = useSchedule();
  const today = getTodayString();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(() => createMonthDate(today));

  const schedulesByDate = useMemo(() => {
    return sortByDateTime(schedules).reduce<Record<string, typeof schedules>>((acc, schedule) => {
      acc[schedule.date] = [...(acc[schedule.date] || []), schedule];
      return acc;
    }, {});
  }, [schedules]);

  const monthCells = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(year, month, 1 - firstDay.getDay());

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);

      return {
        date,
        dateKey: toDateKey(date),
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month
      };
    });
  }, [currentMonth]);

  const selectedSchedules = schedulesByDate[selectedDate] || [];
  const monthLabel = `${currentMonth.getFullYear()}년 ${String(currentMonth.getMonth() + 1).padStart(2, '0')}월`;

  const moveMonth = (amount: number) => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + amount, 1);
    setCurrentMonth(nextMonth);
    setSelectedDate(toDateKey(nextMonth));
  };

  const selectDate = (date: Date) => {
    setSelectedDate(toDateKey(date));

    if (date.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Calendar</p>
        <h2>월간 캘린더</h2>
        <p>날짜 안의 일정은 중요도 색상 배지로 표시되며, 날짜를 선택하면 하단에 해당 일자의 일정 목록이 표시됩니다.</p>
      </section>

      <section className="month-calendar panel">
        <div className="calendar-header-row">
          <button type="button" onClick={() => moveMonth(-1)}>이전 달</button>
          <h3>{monthLabel}</h3>
          <button type="button" onClick={() => moveMonth(1)}>다음 달</button>
        </div>

        <div className="weekday-grid">
          {weekDays.map((day) => (
            <strong key={day}>{day}</strong>
          ))}
        </div>

        <div className="month-grid">
          {monthCells.map((cell) => {
            const daySchedules = schedulesByDate[cell.dateKey] || [];
            const visibleSchedules = daySchedules.slice(0, 3);
            const hiddenCount = daySchedules.length - visibleSchedules.length;

            return (
              <button
                key={cell.dateKey}
                type="button"
                className={`calendar-day ${cell.isCurrentMonth ? '' : 'muted-day'} ${cell.dateKey === selectedDate ? 'selected' : ''} ${cell.dateKey === today ? 'today' : ''}`}
                onClick={() => selectDate(cell.date)}
              >
                <span className="day-number">{cell.day}</span>
                <span className="day-badge-list">
                  {visibleSchedules.map((schedule) => (
                    <span key={schedule.id} className={`calendar-badge ${schedule.priority}`} title={schedule.title}>
                      {schedule.title}
                    </span>
                  ))}
                  {hiddenCount > 0 && <span className="calendar-badge more">+{hiddenCount}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="date-group selected-date-section">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Selected Date</p>
            <h3>{formatDateKorean(selectedDate)} 일정</h3>
          </div>
          <Link to="/add" className="primary-button compact-button">일정 추가</Link>
        </div>

        {selectedSchedules.length > 0 ? (
          <div className="date-items">
            {selectedSchedules.map((schedule) => (
              <Link key={schedule.id} to={`/schedules/${schedule.id}`} className="date-item">
                <span>{schedule.startTime} ~ {schedule.endTime}</span>
                <strong>{schedule.title}</strong>
                <em className={`badge ${schedule.priority}`}>중요도 {priorityLabels[schedule.priority]}</em>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="선택한 날짜의 일정이 없습니다" description="상단 메뉴의 일정추가 화면에서 새 일정을 등록할 수 있습니다." />
        )}
      </section>
    </div>
  );
};

export default CalendarPage;
