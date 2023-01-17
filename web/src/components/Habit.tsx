interface IHabitProps {
  completed: number
}

export function Habit(props: IHabitProps) {
  return (
    <div>
      <h1>{props.completed}</h1>
    </div>
  );
}
