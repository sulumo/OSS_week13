import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import List from "./components/List";
import Update from "./components/Update";
import Detail from "./components/Detail";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<List/>}/>
          <Route path="/Update" element={<Update/>}/>
          <Route path="/Detail" element={<Detail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;