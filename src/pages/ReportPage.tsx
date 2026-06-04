const ReportPage = () => {
  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Project Report</p>
        <h2>과제 조건 충족 설명</h2>
        <p>제출 시 그대로 참고할 수 있도록 적용 내용을 정리했습니다.</p>
      </section>

      <section className="report-grid">
        <article className="report-card">
          <h3>컴포넌트 5개 이상</h3>
          <p>Header, Layout, ScheduleCard, ScheduleForm, ScheduleSummary, TodayPanel, CategoryFilter, StatCard 등을 사용했습니다.</p>
        </article>
        <article className="report-card">
          <h3>React Router 3개 이상 URL</h3>
          <p>/, /calendar, /schedules, /schedules/:scheduleId, /add, /report 화면으로 이동합니다.</p>
        </article>
        <article className="report-card">
          <h3>Hook 3개 이상</h3>
          <p>useState는 검색/폼 상태, useEffect는 localStorage 저장, useMemo는 필터/통계 계산, useReducer는 일정 변경 로직, useContext는 전역상태 공유에 사용했습니다.</p>
        </article>
        <article className="report-card">
          <h3>전역상태 적용</h3>
          <p>ScheduleContext에서 일정 목록, 추가, 완료 처리, 삭제 기능을 관리합니다. 여러 페이지가 같은 일정 데이터를 사용하므로 전역상태가 필요합니다.</p>
        </article>
        <article className="report-card">
          <h3>TypeScript 적용</h3>
          <p>전체 프로젝트를 TypeScript로 작성했고, Schedule, ScheduleInput, ScheduleCategory 타입을 분리했습니다.</p>
        </article>
        <article className="report-card">
          <h3>배포 가능</h3>
          <p>Vite 기반 프로젝트이므로 npm run build 후 Vercel 또는 Netlify에 배포할 수 있습니다.</p>
        </article>
      </section>
    </div>
  );
};

export default ReportPage;
