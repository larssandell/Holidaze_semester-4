import Router from './components/Router';
import './App.css';

// import { runFetchAuto } from './components/intervals';

function App() {
    // runFetchAuto();
    // setInterval(runFetchAuto(), 10 * 60 * 1000);
    return (
        <div className='App'>
            <Router />
        </div>
    );
}

export default App;
