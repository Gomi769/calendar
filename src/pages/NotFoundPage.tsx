import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="panel">
      <h2>페이지를 찾을 수 없습니다</h2>
      <p>존재하지 않는 주소입니다.</p>
      <Link to="/">대시보드로 이동</Link>
    </section>
  );
};

export default NotFoundPage;
