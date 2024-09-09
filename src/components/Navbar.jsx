import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bggrid items-center text-white py-2 w-full'>
        <div className="logo mx-10 text-xl sm:text-3xl">
            <span className='font-bold text-yellow-300 cursor-pointer  hover:text-green-500 transition-all'>iTask</span>
        </div>
        <ul className="flex gap-10 items-center">
            <li className='sm:text-xl font-bold cursor-pointer hover:text-green-500 transition-all'>Home</li>
            <li className='sm:text-xl font-bold cursor-pointer hover:text-green-500 transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
