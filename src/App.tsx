import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PublicLayout from './components/PublicLayout'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import Dashboard from './features/dashboard/Dashboard'
import Dashboard2 from './features/dashboard/Dashboard2'

function App() {

  return (
    <div className="App h-screen">
       <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard2" element={<Dashboard2 />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="welcome" element={<Dashboard />} />
              <Route path="userslist" element={<Dashboard />} />
            </Route>

          </Route>
    </Routes>
    </div>
  )
}

export default App
