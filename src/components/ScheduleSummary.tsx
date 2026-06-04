import StatCard from './StatCard';

type ScheduleSummaryProps = {
  totalCount: number;
  completedCount: number;
  incompleteCount: number;
};

const ScheduleSummary = ({ totalCount, completedCount, incompleteCount }: ScheduleSummaryProps) => {
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <section className="summary-grid">
      <StatCard label="전체 일정" value={totalCount} description="등록된 모든 개인 스케줄" />
      <StatCard label="완료" value={completedCount} description="체크 완료한 일정" />
      <StatCard label="미완료" value={incompleteCount} description="아직 처리해야 할 일정" />
      <StatCard label="완료율" value={`${completionRate}%`} description="전체 일정 대비 완료 비율" />
    </section>
  );
};

export default ScheduleSummary;
