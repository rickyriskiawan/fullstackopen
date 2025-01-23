import Part from './PartContent';

export default function Content({ parts }) {
  return (
    <>
      {parts.map((part, index) => {
        return <Part part={part.name} exercises={part.exercises} key={index} />;
      })}
    </>
  );
}
