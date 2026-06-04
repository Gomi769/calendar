import { useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';
import ScheduleCard from '../components/ScheduleCard';
import { useSchedule } from '../context/ScheduleContext';
import type { ScheduleCategory } from '../types/schedule';
import { sortByDateTime } from '../utils/dateUtils';

const ScheduleListPage = () => {
  const { schedules, toggleComplete, deleteSchedule } = useSchedule();
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory | 'all'>('all');
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  const filteredSchedules = useMemo(() => {
    return sortByDateTime(
      schedules.filter((schedule) => {
        const matchKeyword = schedule.title.includes(keyword) || schedule.memo.includes(keyword);
        const matchCategory = selectedCategory === 'all' || schedule.category === selectedCategory;
        const matchComplete = !showOnlyIncomplete || !schedule.completed;
        return matchKeyword && matchCategory && matchComplete;
      })
    );
  }, [schedules, keyword, selectedCategory, showOnlyIncomplete]);

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Schedules</p>
        <h2>일정 목록</h2>
        <p>검색, 카테고리 필터, 미완료 보기 기능을 적용했습니다.</p>
      </section>

      <section className="toolbar">
        <div className="filter-box wide">
          <label htmlFor="keyword">검색</label>
          <input id="keyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="제목 또는 메모 검색" />
        </div>
        <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
        <label className="checkbox-filter">
          <input type="checkbox" checked={showOnlyIncomplete} onChange={(event) => setShowOnlyIncomplete(event.target.checked)} />
          미완료만 보기
        </label>
      </section>

      <section className="card-grid">
        {filteredSchedules.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} onToggle={toggleComplete} onDelete={deleteSchedule} />
        ))}
      </section>

      {filteredSchedules.length === 0 && <EmptyState title="검색 결과가 없습니다" description="검색어 또는 필터 조건을 변경해 보세요." />}
    </div>
  );
};

export default ScheduleListPage;
