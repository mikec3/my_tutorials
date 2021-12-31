import logo from './logo.svg';
import './App.css';
import LineChart from './LineChart';
import TimeSeries from './TimeSeries';
import Histogram from './Histogram'

function App() {
  return (
    <div className="App">
        <h2> React & D3 Chart Examples </h2>
    <div className='row'>
    <LineChart width={400} height={400}/>
    <TimeSeries width={400} height={400}/>
    <Histogram width={400} height={400}/>
    </div>
    </div>
  );
}

export default App;
