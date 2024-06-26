import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();
    const [isAnimating, setIsAnimating] = useState(false);


    const imageBackground = {
        backgroundImage: `url(${require('../images/welcome.webp')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    const imageBackgroundLogo = {
        backgroundImage: `url(${require('../images/logo.webp')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const handleExploreClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            navigate('/Home');
        }, 1000);
    };


    return (
        <div className='h-[100vh] p-16'>
            <div className='flex flex-row h-full justify-center items-center'>
                <div
                    style={imageBackground}
                    className={`w-full h-full rounded-3xl transition-transform duration-1000 ${isAnimating ? 'transform -translate-x-[200%]' : ''}`}
                ></div>
                <div
                    className={`w-full flex flex-col items-center gap-4 transition-transform duration-1000 ${isAnimating ? 'transform translate-x-full' : ''}`}
                >
                    <div style={imageBackgroundLogo} className='rounded-full w-20 h-20'></div>
                    <div className='titleFont font-extrabold text-4xl'>Recipe Book</div>
                    <div className='titleFont font-thin text-l'>Discover Recipes</div>
                    <button
                        onClick={handleExploreClick}
                        className='buttonColor text-white text-sm titleFont p-4 rounded-md mt-4 hover:scale-110 transition-all'
                    >
                        Explore
                    </button>
                </div>
            </div>
        </div>
    );
}
