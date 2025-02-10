import React, { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
const ProjectSearch = ({ setSearchProject }) => {
    return (
        <>
            <div data-aos="fade-left" data-aos-duration="1000">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex justify-between items-center">
                    
                    <IoSearchOutline
                        className="bg-gray-500 bg-opacity-20 rounded-lg me-3 w-11 h-11 p-2 "
                    />
                    <div className="[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.purple.500)_86%,_theme(colors.purple.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] border-2 border-transparent rounded-lg animate-border">
                        <input
                            type="text"
                            placeholder="Search Project"
                            onChange={(e) => setSearchProject(e.target.value)}
                            className="p-2 rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProjectSearch;
