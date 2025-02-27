import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Service(
    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        description: existingDescription,
        btnurl: existingBtnurl,
        tags: existingTags,
        status: existingStatus,
    }
) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();
    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [btnurl, setBtnurl] = useState(existingBtnurl || '');
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || '');

    async function createService(ev) {
        ev.preventDefault();

        // Add validation
        if (!title || !slug || !status) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const data = { title, slug, description, tags, btnurl, status };

            if (_id) {
                await axios.put('/api/service', { ...data, _id });
                toast.success('Data Updated');
            } else {
                await axios.post('/api/service', data);
                toast.success('Service Created');
            }

            setRedirect(true);
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    }

    useEffect(() => {
        if (redirect) {
            router.push('/admin/service');
        }
    }, [redirect, router]);

    // Remove the redirect check from the render function
    if (redirect) {
        return null;
    }

    // for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-') //replace spaces with hyphens

        setSlug(newSlug);
    }

    return <>
        <form className='addWebsiteform' onSubmit={createService}>
            {/* Service Title */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Enter small title" value={title} onChange={ev => setTitle(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Service slug url */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="slug">Slug (seo freindly url)</label>
                <input type="text" name="slug" id="slug" placeholder="Enter slug url" value={slug} onChange={handleSlugChange} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Service markdown description */}
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="description">Service Description (for image: upload and copy link and paste in ![alt text](link))</label>
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

            {/* Service button url */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="btnurl">Service Button URL</label>
                <input type="text" name="btnurl" id="btnurl" placeholder="Enter btn url" value={btnurl} onChange={ev => setBtnurl(ev.target.value)} className="file-input file-input-bordered ps-3 mt-3" />
            </div>

            {/* Service Tags */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label className="font-semibold text-lg" htmlFor="tags">Tags</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} value={tags} name="tags" id="tags" multiple className="select select-bordered w-full mt-3">
                    <option value="html" className="text-base my-1 p-2">HTML</option>
                    <option value="css" className="text-base my-1 p-2">CSS</option>
                    <option value="bootstrap" className="text-base my-1 p-2">Bootstrap</option>
                    <option value="tailwind" className="text-base my-1 p-2">Tailwind</option>
                    <option value="javascript" className="text-base my-1 p-2">JavaScript</option>
                    <option value="reactjs" className="text-base my-1 p-2">React Js</option>
                    <option value="nextjs" className="text-base my-1 p-2">Next Js</option>
                    <option value="php" className="text-base my-1 p-2">PHP</option>
                    <option value="mysql" className="text-base my-1 p-2">MySql</option>
                    <option value="mongodb" className="text-base my-1 p-2">Mongodb</option>
                    <option value="frontend" className="text-base my-1 p-2">Frontend</option>
                    <option value="full stack" className="text-base my-1 p-2">Full Stack</option>
                    <option value="wordPress" className="text-base my-1 p-2">WordPress</option>
                    <option value="ecommerce" className="text-base my-1 p-2">Ecommerce</option>
                    <option value="shopify" className="text-base my-1 p-2">Shopify</option>
                    <option value="email signature" className="text-base my-1 p-2">Email Signature</option>
                    <option value="email template" className="text-base my-1 p-2">Email Template</option>
                </select>
            </div>

            {/* Service Status */}
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


