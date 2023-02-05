import { Route, Routes } from "react-router-dom";
import Add from "./Add";
import Info from "./Info";
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Info />} />
        <Route path='/add' element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
