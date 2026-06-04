import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddSchedulePage from './pages/AddSchedulePage';
import CalendarPage from './pages/CalendarPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ReportPage from './pages/ReportPage';
import ScheduleDetailPage from './pages/ScheduleDetailPage';
import ScheduleListPage from './pages/ScheduleListPage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/schedules" element={<ScheduleListPage />} />
        <Route path="/schedules/:scheduleId" element={<ScheduleDetailPage />} />
        <Route path="/add" element={<AddSchedulePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
