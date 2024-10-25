import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'react-use';
import toast from 'react-hot-toast';

const AddCategory = () => {
    const navigate = useNavigate();
    // useTitle('Add Category')
    const imageHostKey = import.meta.env.VITE_imgbb_key;
    console.log("image upload key "+imageHostKey);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {  category: '' }
    });


    const handleAddCategory = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(data);
                    const category = {
                        logo: imgData.data.url,
                        name: data.name,
                        postingTime: new Date(),
                    }

                    // save product information to the database
                    fetch('http://localhost:5000/categories', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(category)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/allCategories')
                        })
                }
            })


    }
    return (
        <div>
            <div className='w-10/12 p-7'>
                <h2 className="text-2xl text-[#FF652E] md:text-center text-left font-bold">Add a Category</h2>
                <form onSubmit={handleSubmit(handleAddCategory)} className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row">
                    <div>
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Category Name:</span></label>

                                <input type="text" {...register("name", {
                                    required: "Product Name is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
                        </div>


                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center  max-w-xs'>
                                <label className="label"> <span className="label-text">Upload Logo:</span></label>
                                <input type="file" {...register("image", {
                                    required: "Photo is Required"
                                })} className="input input-bordered w-full max-w-xs p-1 rounded-none bg-white" />
                                {errors.image && <p className='text-red-500 text-xs'>{errors.image.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='ml-0 md:ml-12 mt-8'>
                        <input className='btn btn-info w-48 rounded-none mt-1' value="Add Category" type="submit" />
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddCategory;