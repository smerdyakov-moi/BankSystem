import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../api/axiosConfig'

export default function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    axios.get('/mydetails')
      .then(() => setAuth(true))
      .catch(() => setAuth(false))
  }, [])

  if (auth === null) return <div>Loading...</div>
  return auth ? children : <Navigate to="/login" />
}
