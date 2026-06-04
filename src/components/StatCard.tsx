type StatCardProps = {
  label: string;
  value: string | number;
  description: string;
};

const StatCard = ({ label, value, description }: StatCardProps) => {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{description}</p>
    </article>
  );
};

export default StatCard;
