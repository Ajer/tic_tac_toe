import './App.css';
import BoardGame from './components/BoardGame';

function App() {

  let player = 'player1';
  return (
    <div className="App">
      <header className="App-header">
        <BoardGame />
      </header>
    </div>
  );
}

export default App;
