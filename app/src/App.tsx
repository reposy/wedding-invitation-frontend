import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminApp } from './pages/AdminApp'
import { InvitationPage } from './pages/InvitationPage'
import { NotFound } from './pages/NotFound'

const router = createBrowserRouter([
	{ path: '/admin/*', element: <AdminApp /> },
	{ path: '/i/:invitationCode', element: <InvitationPage /> },
	{ path: '*', element: <NotFound /> },
])

function App() {
	return <RouterProvider router={router} />
}

export default App
