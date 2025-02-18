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
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    image: [],
    description: "",
    cvUrl: "",
    status: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch existing data when component mounts
  useEffect(() => {
    async function fetchExistingData() {
      try {
        setLoading(true);
        const response = await axios.get('/api/home');
        if (response.data && response.data.length > 0) {
          const data = response.data[0];
          setFormData({
            _id: data._id,
            title: data.title.join(", "),
            image: data.image || [],
            description: data.description || "",
            cvUrl: data.cvUrl || "", // 🆕 Load existing CV URL
            status: data.status || "",
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
  }, []); // Empty dependency array means this only runs once on mount

  // 🆕 Upload PDF Function
  async function uploadPDF(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
  
      try {
        const data = new FormData();
        data.append("file", files[0]);  // ✅ Only upload one file
  
        const res = await axios.post("/api/upload", data);
        
        setFormData(prev => ({
          ...prev,
          cvUrl: res.data.links[0]  // ✅ Save only the first link as a string
        }));
  
        toast.success("PDF Uploaded Successfully");
      } catch (error) {
        toast.error("Upload failed: " + error.message);
      } finally {
        setIsUploading(false);
      }
    }
  }
  
  

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (!formData.title || !formData.status) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const titleArray = formData.title.split(",").map(item => item.trim());
      const data = {
        ...formData,
        title: titleArray,
        cvUrl: formData.cvUrl,
      };

      if (formData._id) {
        await axios.put(`/api/home?id=${formData._id}`, data);
        toast.success("Data Updated Successfully");
      } else {
        await axios.post("/api/home", data);
        toast.success("Data Created Successfully");
      }

      router.push("/admin/home");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const uploadPromises = [];

      try {
        for (const file of files) {
          const data = new FormData();
          data.append("file", file);

          const promise = axios.post("/api/upload", data).then((res) => {
            setFormData(prev => ({
              ...prev,
              image: [...prev.image, ...res.data.links]
            }));
            return res.data.links;
          });

          uploadPromises.push(promise);
        }

        await Promise.all(uploadPromises);
        toast.success("Images Uploaded Successfully");
      } catch (error) {
        toast.error("Upload failed: " + error.message);
      } finally {
        setIsUploading(false);
      }
    }
  }

  function updateImagesOrder(images) {
    setFormData(prev => ({
      ...prev,
      image: images
    }));
  }

  function handleDeleteImage(index) {
    setFormData(prev => {
      const updatedImages = [...prev.image];
      updatedImages.splice(index, 1);
      return {
        ...prev,
        image: updatedImages
      };
    });
    toast.success("Image Deleted Successfully");
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <form className="addWebsiteform" onSubmit={handleSubmit}>
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title" className="font-semibold text-lg">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder='Enter titles separated by commas, e.g., "Web Developer, Web Designer"'
          value={formData.title}
          onChange={(ev) => setFormData(prev => ({
            ...prev,
            title: ev.target.value
          }))}
          className="input input-bordered mt-3"
        />
      </div>

      <div className="my-7">
        <div className="w-100 flex flex-col">
          <label htmlFor="images" className="font-semibold text-lg mt-3">
            Hero Image
          </label>
          <input
            type="file"
            id="fileInput"
            className="mt-1 file-input file-input-bordered"
            accept="image/*"
            onChange={uploadImages}
          />
        </div>
      </div>

      {!isUploading && formData.image.length > 0 && (
        <div className="flex">
          <ReactSortable
            list={formData.image}
            setList={updateImagesOrder}
            animation={200}
            className="flex gap-1">
            {formData.image.map((link, index) => (
              <div key={link} className="uploadedimg">
                <Image src={link} alt="image" className="object-cover w-32" />
                <div className="deleteimg">
                  <button type="button" onClick={() => handleDeleteImage(index)}>
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
      )}

      {/* PDF Upload Field 🆕 */}
      <div className="my-7">
        <label htmlFor="cvUpload" className="font-semibold text-lg mr-5">
          Upload CV (PDF)
        </label>
        <input
          type="file"
          id="cvUpload"
          className="mt-1 file-input file-input-bordered"
          accept="application/pdf"
          onChange={uploadPDF}
        />
      </div>

      {/* Show Uploaded PDF Link */}
      {formData.cvUrl && (
        <div className="my-3">
          <p className="text-lg font-semibold">Uploaded CV:</p>
          <a href={formData.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Download CV
          </a>
        </div>
      )}

      <div className="my-7">
        <label htmlFor="description" className="font-semibold text-lg">
          Hero Content
        </label>
        <MarkdownEditor
          value={formData.description}
          onChange={(ev) => setFormData(prev => ({
            ...prev,
            description: ev.text
          }))}
          style={{ height: "400px" }}
          renderHTML={(text) => (
            <ReactMarkdown>
              {text}
            </ReactMarkdown>
          )}
        />
      </div>

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
        <button type="submit" className="btn w-full btn-success font-bold">
          {formData._id ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
}