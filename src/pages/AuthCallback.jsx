import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')

    if (token) {
      localStorage.setItem('token', token)
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      Signing you in...
    </div>
  )
}