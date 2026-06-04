import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">React 개인 스케줄 관리</p>
        <h1>나의 캘린더</h1>
      </div>
      <nav className="nav">
        <NavLink to="/">대시보드</NavLink>
        <NavLink to="/calendar">캘린더</NavLink>
        <NavLink to="/schedules">일정목록</NavLink>
        <NavLink to="/add">일정추가</NavLink>
        <NavLink to="/report">설명</NavLink>
      </nav>
    </header>
  );
};

export default Header;
