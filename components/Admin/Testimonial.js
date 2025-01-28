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

export default function Testimonial(
    {
        _id,
        clientName: existingClientName,
        date: existingDate,
        nationality: existingNationality,
        review: existingReview,
        star: existingStar,
        status: existingStatus,
    }
) {

    const [redirect, setRedirect] = useState(false);

    const router = useRouter();

    const [clientname, setClientName] = useState(existingClientName || '');
    const [date, setDate] = useState(existingDate || '');
    const [nationality, setNationality] = useState(existingNationality || '');
    const [review, setReview] = useState(existingReview || '');
    const [star, setStar] = useState(existingStar || '');
    const [status, setStatus] = useState(existingStatus || '');

    // for image uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];

    async function createBlog(ev) {
        ev.preventDefault();

        // Add validation
        if (!clientname || !review || !status) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            // if (isUploading) {
            //     await Promise.all(uploadImagesQueue);
            // }

            const data = { clientname, date, nationality, review, star, status };

            if (_id) {
                await axios.put('/api/testimonial', { ...data, _id });
                toast.success('Data Updated');
            } else {
                await axios.post('/api/testimonial', data);
                toast.success('Testimonial Created');
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
            router.push('/admin/testimonial');
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
            {/*Client Name */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="clientname">Client Name</label>
                <input type="text" name="clientname" id="clientname" placeholder="Enter client name" value={clientname} onChange={ev => setClientName(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Review Date */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="date">Date</label>
                <input type="text" name="date" id="date" placeholder="Enter review month and year" value={date} onChange={ev => setDate(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Client Nationality */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="nationality">Client Nationality</label>
                <input type="text" name="nationality" id="nationality" placeholder="Enter review month and year" value={nationality} onChange={ev => setNationality(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* markdown review */}
            <div className="review w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="review">Review</label>
                <MarkdownEditor
                    value={review} onChange={(ev) => setReview(ev.text)}
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

            {/* Review stars*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="star">Enter a Rating (1-5):</label>
                <input type="number" name="star" id="star" min="1" max="5" placeholder="Enter star number 1 to 5" value={star} onChange={ev => setStar(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Review Status */}
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


