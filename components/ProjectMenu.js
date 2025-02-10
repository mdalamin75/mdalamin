import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import useFetch from "../hooks/useFetch";

const ProjectMenu = ({ initialData }) => {
  const { alldata, loading } = useFetch('portfolio', initialData);

  const publishedData = alldata[0].filter(ab => ab.status === "publish");

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fileredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
      // filter projects based on selectedCategory
      if (selectedCategory === "All") {
          setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
      } else {
          setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectedCategory));
      }
  }, [selectedCategory, alldata])

  return (
    <>
      <div data-aos="fade-right" data-aos-duration="1000" className="[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] border-2 border-transparent rounded-lg animate-border">
        <select onChange={(e) => filterItem(e.target.value)} className="w-64 uppercase p-3 rounded-lg sticky top-0 z-40">
          <div className="project_buttons">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'E-commerce site' ? 'active' : ''} onClick={() => setSelectedCategory('E-commerce Site')}>Digital</button>
            <button className={selectedCategory === 'Performance Evaluation' ? 'active' : ''} onClick={() => setSelectedCategory('Performance Evaluation')}>Content</button>
          </div>
        </select>
      </div>
    </>
  );
};

export default ProjectMenu;