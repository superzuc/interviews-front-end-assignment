import React from 'react';
import { useNavigate } from 'react-router-dom';

type NavbarProps = {
    toggleSearch: () => void;
};

export default function Navbar({ toggleSearch }: NavbarProps) {
    const navigate = useNavigate()
  return (
    <div className='w-full p-8 grid grid-cols-6 items-center gap-4 md:grid-cols-4 border-b-2 shadow-lg'>
        <div className='titleFont text-3xl font-extrabold'>
            RecipeBoo
        </div>
        <div className='flex flex-row justify-around items-center'>
            <div className='font-thin'>Main</div>
            <div className='font-thin ml-5'>Cuisines</div>
            <div className='font-thin ml-5'>Delivery</div>
        </div>
        <div className='col-start-6 md:col-start-4 w-full flex flex-row gap-4 justify-around'>
            <button
                className='buttonColor p-2 pl-8 pr-8 rounded-3xl text-white hover:scale-110 transition-all'
                onClick={toggleSearch}
            >
                Filter
            </button>
            <button onClick={() => navigate('/add-item')} className='p-2 pr-8 pl-8 border border-slate-800 rounded-3xl hover:scale-110 transition-all'>
                Add
            </button>
        </div>
    </div>
  );
}
