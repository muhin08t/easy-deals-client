import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleClick = (cat_id) => {
    console.log("handle click called "+cat_id);
    navigate(`/category/products/${cat_id}`, { state: { cat_id: cat_id } });
  };

  return (
    <div>
      <div className="carousel w-full pt-0">
        <div id="item1" className="carousel-item w-screen relative">
          <img src="/banner5.jpg" className="w-screen h-[400px]" />
        </div>
      </div>

      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">Categories</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 m-10">
        {categories.map((item, index) => {
          return (
            <div key={index}>
              <div className="card w-80 h-72 bg-base-100 shadow-xl transition-transform duration-300 hover:scale-110">
                <div className="card-body flex flex-col items-center">
                  <h2 className="card-title text-center">{item.name}</h2>
                  <img className="w-44 h-36" src={item.logo} alt="Categories" />
                  <button onClick={() => {handleClick(item.cat_id)}} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded h-10">View Products</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* contact area started  */}

      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">Contact us</h1>
      </div>

      <div className="card w-full max-w-lg shadow-xl bg-base-100 mx-auto mb-10">
      <div className="card-body">
        <form>
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>

          {/* Message Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Message</span>
            </label>
            <textarea
              name="message"
              className="textarea textarea-bordered"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>

      {/* contact area end  */}

      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">About us</h1>
      </div>

      <div className="flex justify-center mb-20 mt-10 ml-6">
        <div className="mr-20">
        <img src="profile-about.jpg" alt="" className="" />
        <h1 className="text-xl font-bold ml-5 lg:ml-10">CEO</h1>
        </div>
      <p className="text-lg italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br></br>
       Deleniti harum sit dignissimos! Deleniti corrupti, <br></br>
       Deleniti harum sit dignissimos! Deleniti corrupti, <br></br>
        inventore et praesentium distinctio velit exercitationem?</p>
      </div>

    </div>
  );
};

export default Home;
