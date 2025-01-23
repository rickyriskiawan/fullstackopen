import Content from './Content';
import Header from './Header';
import Total from './TotalExercises';

export default function Course({ courses }) {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
}
