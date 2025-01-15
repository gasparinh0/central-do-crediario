import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AuthenticationPage from './pages/Authentication.jsx'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthenticationPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
