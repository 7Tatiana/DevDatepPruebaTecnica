import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
