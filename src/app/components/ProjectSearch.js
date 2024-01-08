import React, { useContext } from 'react'
import { IoSearchOutline } from "react-icons/io5";
const ProjectSearch = ({ setSearchProject }) => {
    return (
        <>
            <div data-aos="fade-left" data-aos-duration="1000">
                <form onSubmit={(e) => e.preventDefault()} className="flex justify-between items-center">
                    <IoSearchOutline className="bg-gradient-to-r from-sky-700 to-indigo-800 text-2xl me-3 rounded-lg text-white w-11 p-2 h-11" />
                    <input type="text" placeholder='Search Project' onChange={(e) => setSearchProject(e.target.value)} className="bg-transparent border-2 border-sky-500 p-2 rounded-lg" />
                </form>
            </div>
        </>
    )
}

export default ProjectSearch;
