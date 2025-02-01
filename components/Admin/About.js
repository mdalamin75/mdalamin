import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from 'react-hot-toast';
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import { LoadingScreen } from "./LoadingScreen";

export default function About() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    aboutimage: [],
    description: "",
    education: [{ name: "", date: "" }],
    skillimages: [{ src: "", label: "" }],
    experiencetitle: "",
    experiencedescription: "",
    status: ""
  });
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const [isUploadingSkills, setIsUploadingSkills] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch existing data when component mounts
  useEffect(() => {
    async function fetchExistingData() {
      try {
        setLoading(true);
        const response = await axios.get('/api/about');
        if (response.data && response.data.length > 0) {
          const data = response.data[0];
          setFormData({
            _id: data._id,
            aboutimage: data.aboutimage || [],
            description: data.description || "",
            education: data.education || [{ name: "", date: "" }],
            skillimages: data.skillimages || [{ src: "", label: "" }],
            experiencetitle: data.experiencetitle || "",
            experiencedescription: data.experiencedescription || "",
            status: data.status || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch existing data:", error);
        toast.error("Failed to fetch existing data");
      } finally {
        setLoading(false);
      }
    }

    fetchExistingData();
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
  
    // Validate required fields
    if (!formData.description || !formData.experiencedescription || !formData.experiencetitle || !formData.status) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    try {
      // Create data object with all fields correctly named
      const data = {
        _id: formData._id,
        aboutimage: formData.aboutimage,
        description: formData.description,
        education: formData.education.map(edu => ({
          name: edu.name,
          date: edu.date ? new Date(edu.date) : null
        })),
        skillimages: formData.skillimages.map(skill => ({
          src: skill.src,
          label: skill.label
        })),
        experiencetitle: formData.experiencetitle,
        experiencedescription: formData.experiencedescription,
        status: formData.status
      };
  
      console.log('Submitting data:', data); // For debugging
  
      if (formData._id) {
        await axios.put(`/api/about?id=${formData._id}`, data);
        toast.success("Data Updated Successfully");
      } else {
        await axios.post("/api/about", data);
        toast.success("Data Created Successfully");
      }
  
      router.push("/admin/about");
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  }
  

  async function uploadAboutImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploadingAbout(true);
      try {
        const uploadPromises = Array.from(files).map(file => {
          const data = new FormData();
          data.append("file", file);
          return axios.post("/api/upload", data);
        });

        const responses = await Promise.all(uploadPromises);
        const newLinks = responses.flatMap(res => res.data.links);

        setFormData(prev => ({
          ...prev,
          aboutimage: [...prev.aboutimage, ...newLinks]
        }));

        toast.success("About Images Uploaded Successfully");
      } catch (error) {
        toast.error("Upload failed: " + error.message);
      } finally {
        setIsUploadingAbout(false);
      }
    }
  }

  async function uploadSkillImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploadingSkills(true);
      try {
        const uploadPromises = Array.from(files).map(async file => {
          const data = new FormData();
          data.append("file", file);
          const response = await axios.post("/api/upload", data);
          const label = prompt('Enter a label for this skill image:', ''); // Prompt for label input
          return { src: response.data.links[0], label };
        });

        const newLinks = await Promise.all(uploadPromises);

        setFormData(prev => ({
          ...prev,
          skillimages: [...prev.skillimages, ...newLinks]
        }));

        toast.success("Skill Images Uploaded Successfully");
      } catch (error) {
        toast.error("Upload failed: " + error.message);
      } finally {
        setIsUploadingSkills(false);
      }
    }
  }

  function updateAboutImagesOrder(images) {
    setFormData(prev => ({
      ...prev,
      aboutimage: images
    }));
  }

  function updateSkillImagesOrder(images) {
    setFormData(prev => ({
      ...prev,
      skillimages: images
    }));
  }

  function handleDeleteAboutImage(index) {
    setFormData(prev => ({
      ...prev,
      aboutimage: prev.aboutimage.filter((_, idx) => idx !== index)
    }));
    toast.success("About Image Deleted Successfully");
  }

  function handleDeleteSkillImage(index) {
    setFormData(prev => ({
      ...prev,
      skillimages: prev.skillimages.filter((_, idx) => idx !== index)
    }));
    toast.success("Skill Image Deleted Successfully");
  }

  function handleEducationChange(index, event) {
    const newEducationList = [...formData.education];
    newEducationList[index][event.target.name] = event.target.value;
    setFormData({ ...formData, education: newEducationList });
  }

  function handleAddEducation() {
    setFormData({
      ...formData,
      education: [...formData.education, { name: "", date: "" }]
    });
  }

  function handleRemoveEducation(index) {
    const newEducationList = formData.education.filter((_, idx) => idx !== index);
    setFormData({ ...formData, education: newEducationList });
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <form className="addWebsiteform" onSubmit={handleSubmit}>
      {/* About Image */}
      <div className="my-7">
        <div className="w-100 flex flex-col">
          <label htmlFor="aboutImages" className="font-semibold text-lg mt-3">
            About Image
          </label>
          <input
            type="file"
            id="aboutImages"
            className="mt-1 file-input file-input-bordered"
            accept="image/*"
            onChange={uploadAboutImages}
          />
        </div>
      </div>
      {!isUploadingAbout && formData.aboutimage.length > 0 && (
        <div className="flex">
          <ReactSortable
            list={formData.aboutimage}
            setList={updateAboutImagesOrder}
            animation={200}
            className="flex gap-1">
            {formData.aboutimage.map((link, index) => (
              <div key={index} className="uploadedimg">
                <img src={link} alt="about image" className="object-cover w-32" />
                <div className="deleteimg">
                  <button type="button" onClick={() => handleDeleteAboutImage(index)}>
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
      )}

      {/* About Description */}
      <div className="my-7">
        <label htmlFor="description" className="font-semibold text-lg">
          About Content
        </label>
        <MarkdownEditor
          value={formData.description}
          onChange={({ text }) => setFormData(prev => ({
            ...prev,
            description: text
          }))}
          style={{ height: "400px" }}
          renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
        />
      </div>

      {/* Education Section */}
      <div className="my-7">
        <label htmlFor="title" className="font-semibold text-lg">
          Education
        </label>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Education Name"
              value={edu.name}
              onChange={(e) => handleEducationChange(index, e)}
              className="input input-bordered my-2"
            />
            <input
              type="date"
              name="date"
              placeholder="Education Date"
              value={edu.date}
              onChange={(e) => handleEducationChange(index, e)}
              className="input input-bordered my-2 ms-5"
            />
            <button
              type="button"
              className="btn btn-error ms-5 text-white"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success text-white mt-3"
          onClick={handleAddEducation}
        >
          Add More
        </button>
      </div>

      {/* Skill Images */}
      <div className="my-7">
        <div className="w-100 flex flex-col">
          <label htmlFor="skillImages" className="font-semibold text-lg mt-3">
            Skill Images
          </label>
          <input
            type="file"
            id="skillImages"
            className="mt-1 file-input file-input-bordered"
            accept="image/*"
            onChange={uploadSkillImages}
            multiple
          />
        </div>
        {!isUploadingSkills && formData.skillimages.length > 0 && (
          <div className="flex">
            <ReactSortable
              list={formData.skillimages}
              setList={updateSkillImagesOrder}
              animation={200}
              className="flex gap-1">
              {formData.skillimages.map((item, index) => (
                <div key={index} className="uploadedimg">
                  <img src={item.src} alt="skill image" className="object-cover w-32" />
                  <div className="deleteimg">
                    <button type="button" onClick={() => handleDeleteSkillImage(index)} className="btn btn-warning text-lg">
                      <MdDeleteForever />
                    </button>
                  </div>
                  <span className="">{item.label}</span>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}
      </div>

      {/* Experience Title */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="experiencetitle" className="font-semibold text-lg">
          Experience Title
        </label>
        <input
          type="text"
          name="experiencetitle"
          id="experiencetitle"
          placeholder='Enter title'
          value={formData.experiencetitle}
          onChange={(ev) => setFormData(prev => ({
            ...prev,
            experiencetitle: ev.target.value
          }))}
          className="input input-bordered mt-3"
        />
      </div>

      {/* Experience Description */}
      <div className="my-7">
        <label htmlFor="experiencedescription" className="font-semibold text-lg">
          Experience Content
        </label>
        <MarkdownEditor
          value={formData.experiencedescription}
          onChange={({ text }) => setFormData(prev => ({
            ...prev,
            experiencedescription: text
          }))}
          style={{ height: "400px" }}
          renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
        />
      </div>

      {/* Status */}
      <div className="my-7">
        <label htmlFor="status" className="font-semibold text-lg">
          Status
        </label>
        <select
          onChange={(ev) => setFormData(prev => ({
            ...prev,
            status: ev.target.value
          }))}
          value={formData.status}
          name="status"
          id="status"
          className="select select-bordered w-full mt-3">
          <option value="">No Select</option>
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
        </select>
      </div>

      <div className="w-100 mb-1">
        <button
          type="submit"
          className="btn w-full btn-success font-bold text-white text-xl uppercase"
        >
          {formData._id ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
}