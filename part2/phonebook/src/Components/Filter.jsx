export default function Filter({ setFilter }) {
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div>
      filter shown with a <input onChange={filterHandler} />
    </div>
  );
}
