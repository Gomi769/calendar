import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>나의 캘린더</h1>
      <nav className="nav">
        <NavLink to="/">대시보드</NavLink>
        <NavLink to="/calendar">캘린더</NavLink>
        <NavLink to="/schedules">일정목록</NavLink>
        <NavLink to="/add">일정추가</NavLink>
      </nav>
    </header>
  );
};

export default Header;
