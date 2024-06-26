import React from 'react'
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function NavbarAdd() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-row p-8 justify-between items-center'>
        <div className='titleFont text-3xl font-extrabold'>
            RecipeBoo
        </div>
        <div className='flex flex-row'> 
            <FaHome onClick={() => navigate('/home')} size={20} color='black' className='hover:scale-110 transition-all'/>
                       
        </div>
    </div>
  )
}
