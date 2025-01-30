export default function NotAuthorized({ message }) {
  return (
    <div className="not-authenticated">
      <h2>{message}</h2>
    </div>
  );
}
