import React from 'react';

const Navbar = ({ onFilterChange }) => {
    return (
        <div className="">
            <nav className='flex flex-col sm:flex-row justify-between bg-slate-700 text-white py-2 px-4'>
                <div className="logo">
                    <span className='font-bold text-xl'>Task Manager</span>
                </div>
                <div className="flex justify-between sm:justify-end items-center mt-4 sm:mt-0">
                    <ul className="flex gap-4 sm:gap-9">
                        <li className='cursor-pointer hover:font-bold transition-all duration- 80' onClick={() => onFilterChange("all")}>All</li>
                        <li className='cursor-pointer hover:font-bold transition-all duration- 80' onClick={() => onFilterChange("Not Started")}>Not Started</li>
                        <li className='cursor-pointer hover:font-bold transition-all duration- 80' onClick={() => onFilterChange("In Progress")}>In Progress</li>
                        <li className='cursor-pointer hover:font-bold transition-all duration- 80' onClick={() => onFilterChange("Completed")}>Completed</li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
