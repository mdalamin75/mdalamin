import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from '../Admin/Spiner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteForever } from "react-icons/md";

export default function Portfolio(
    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        images: existingImages,
        description: existingDescription,
        client: existingClient,
        projectcategory: existingProjectcategory,
        tags: existingTags,
        livepreview: existingLivepreview,
        status: existingStatus,
    }
) {

    const [redirect, setRedirect] = useState(false);

    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [client, setClient] = useState(existingClient || '');
    const [projectcategory, setProjectcategory] = useState(existingProjectcategory || []);
    const [tags, setTags] = useState(existingTags || []);
    const [livepreview, setLivepreview] = useState(existingLivepreview || '');
    const [status, setStatus] = useState(existingStatus || '');

    // for image uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];

    async function createBlog(ev) {
        ev.preventDefault();

        // Add validation
        if (!title || !slug || !status) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            if (isUploading) {
                await Promise.all(uploadImagesQueue);
            }

            const data = { title, slug, images, description, client, projectcategory, tags, livepreview, status };

            if (_id) {
                await axios.put('/api/portfolio', { ...data, _id });
                toast.success('Data Updated');
            } else {
                await axios.post('/api/portfolio', data);
                toast.success('Project Created');
            }

            setRedirect(true);
        } catch (error) {
            toast.error('Error: ' + error.message);
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
                    data.append('file', file);

                    const promise = axios.post('/api/upload', data)
                        .then(res => {
                            setImages(oldImages => [...oldImages, ...res.data.links]);
                            return res.data.links;
                        });

                    uploadPromises.push(promise);
                }

                await Promise.all(uploadPromises);
                toast.success('Images Uploaded');
            } catch (error) {
                toast.error('Upload failed: ' + error.message);
            } finally {
                setIsUploading(false);
            }
        }
    }

    useEffect(() => {
        if (redirect) {
            router.push('/admin/portfolio');
        }
    }, [redirect, router]);

    // Remove the redirect check from the render function
    if (redirect) {
        return null;
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('Image Deleted Successfully')
    }

    // for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-') //replace spaces with hyphens

        setSlug(newSlug);
    }

    return <>
        <form className='addWebsiteform' onSubmit={createBlog}>
            {/* Portfolio Title */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Enter small title" value={title} onChange={ev => setTitle(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Portfolio slug url */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="slug">Slug (seo freindly url)</label>
                <input type="text" name="slug" id="slug" placeholder="Enter slug url" value={slug} onChange={handleSlugChange} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Project client Name */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="client">Client Name</label>
                <input type="text" name="client" id="client" placeholder="Enter client name" value={client} onChange={ev => setClient(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Project live preview */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="livepreview">Livepreview </label>
                <input type="text" name="livepreview" id="livepreview" placeholder="Enter livepreview url" value={livepreview} onChange={ev => setLivepreview(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Blog Category */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="category">Select Category (for multi select press ctr + mouse left key) </label>
                <select onChange={(e) => setProjectcategory(Array.from(e.target.selectedOptions, option => option.value))} value={projectcategory} name="category" id="category" multiple className="select select-bordered mt-3">
                    {/* <option value="">Select Category</option> */}
                    <option value="Website Development" className="text-base my-1 p-2">Website Development</option>
                    <option value="App Development" className="text-base my-1 p-2">App Development</option>
                    <option value="Design System" className="text-base my-1 p-2">Design System</option>
                    <option value="Website Migration" className="text-base my-1 p-2">Website Migration</option>
                    <option value="E-commerce Site" className="text-base my-1 p-2">E-commerce Site</option>
                    <option value="Performance Evaluation" className="text-base my-1 p-2">Performance Evaluation</option>
                    <option value="WordPress" className="text-base my-1 p-2">WordPress</option>
                </select>
            </div>

            {/* Blog Images */}
            <div className="flex mb-2">
                <div className="flex flex-col">
                    <label className="font-semibold text-lg" htmlFor="images">Images (first image will be show as thumbnail, you can drag)</label>
                    <input type="file" id="fileInput" className="file-input file-input-bordered mt-3" accept="image/*" multiple onChange={uploadImages} />
                </div>
                <div className="w-100 flex flex-left">
                    {isUploading && (<Spinner />)}
                </div>
            </div>

            {/* Image Preview and image sortable with delete image */}
            {!isUploading && (
                <div className="flex">
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1' >
                        {images?.map((link, index) => (
                            <div key={link} className='uploadedimg'>
                                <img src={link} alt="image" className='object-cover w-48' />
                                <div className="deleteimg">
                                    <button onClick={() => handleDeleteImage(index)}><MdDeleteForever /></button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}

            {/* markdown description */}
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="description">Project Content (for image: upload and copy link and paste in ![alt text](link))</label>
                <MarkdownEditor
                    value={description} onChange={(ev) => setDescription(ev.text)}
                    style={{ width: '100%', height: '400px' }} //you can adjust the height as needed
                    className="mt-3"
                    renderHTML={(text) => (

                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                // for code
                                const match = /language- (\w+)/.exec(className || '');

                                if (inline) {
                                    return <code>{children}</code>
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>copy code</button>
                                        </div>
                                    )
                                } else {
                                    return <code {...props}>{children}</code>
                                }
                            }
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>

            {/* Tags */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="tags">Tags</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} value={tags} name="tags" id="tags" multiple className="select select-bordered w-full mt-3">
                    <option value="html" className="text-base my-1 p-2">HTML</option>
                    <option value="css" className="text-base my-1 p-2">CSS</option>
                    <option value="javascript" className="text-base my-1 p-2">JavaScript</option>
                    <option value="nextjs" className="text-base my-1 p-2">Next Js</option>
                    <option value="reactjs" className="text-base my-1 p-2">React Js</option>
                    <option value="database" className="text-base my-1 p-2">Database</option>
                    <option value="WordPress" className="text-base my-1 p-2">WordPress</option>
                </select>
            </div>

            {/* Blog Status */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="status">Status</label>
                <select onChange={ev => setStatus(ev.target.value)} value={status} name="status" id="status" className="select select-bordered w-full mt-3">
                    <option value="" className="text-base my-1 p-2">No Select</option>
                    <option value="draft" className="text-base my-1 p-2">Draft</option>
                    <option value="publish" className="text-base my-1 p-2">Publish</option>
                </select>
            </div>

            <div className="w-100 mb-1">
                <button type='submit' className="btn w-full btn-success font-bold text-white text-lg uppercase">SAVE DATA</button>
            </div>
        </form>
    </>
}


