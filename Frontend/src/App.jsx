import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Messagebox from "./messageBox"
import Registration from "./registration"
import Login from "./login"
import Feed from "./feed"
function App() {
 

  return (
    <>
    <Router>
      <Routes>

    <Route path="/:username"  element={<Messagebox/>}/>
    <Route path="/register"  element={<Registration/>}/>
    <Route path="/"  element={<Login/>}/>
    <Route path="/feed"  element={<Feed/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
