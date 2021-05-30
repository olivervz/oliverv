import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path='/' exact render={() => (
        <div style={{textAlign:'center'}}>
          <h1>Under Construction</h1>
          <a href="documents/Resume.pdf">
            <button>Resume</button>
          </a>
        </div>
      )}/>
    </Router>
  );
}

export default App;
