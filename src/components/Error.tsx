import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
export default function Error() {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/")
      console.log("ok")
    }, 1000)
    // return clearTimeout(timeout)
  }, [navigate])
  return (
    <main className='grid min-h-screen place-content-center'>
      <div className=' text-center text-lg space-y-5'>
        <h1 className='text-4xl'>Seems like you're lost</h1>
        <p>click on link blow to navigate to home page</p>
        <NavLink to='/' className='font-medium text-blue-500 underline'>
          home page
        </NavLink>
      </div>
    </main>
  )
}
