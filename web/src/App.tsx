import { Habit } from './components/Habit';

export function App() {
  return (
    <div className='bg-zinc-900'>
      <h1>Hello, world!</h1>
      <Habit completed={2}/>
    </div>
  );
}
