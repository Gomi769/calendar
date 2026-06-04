import { categoryLabels } from '../data/initialSchedules';
import type { ScheduleCategory } from '../types/schedule';

type CategoryFilterProps = {
  selectedCategory: ScheduleCategory | 'all';
  onChange: (category: ScheduleCategory | 'all') => void;
};

const CategoryFilter = ({ selectedCategory, onChange }: CategoryFilterProps) => {
  return (
    <div className="filter-box">
      <label htmlFor="category-filter">카테고리</label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) => onChange(event.target.value as ScheduleCategory | 'all')}
      >
        <option value="all">전체</option>
        {Object.entries(categoryLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
