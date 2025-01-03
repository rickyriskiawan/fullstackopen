export default function Total({ parts }) {
  const TotalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total of exercises {TotalExercises}</p>;
}
