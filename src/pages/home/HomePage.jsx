import { Outlet } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='home'>
        <Outlet/>
    </div>
  )
}

export default HomePage