import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("courseDetails.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);


  return (
    <div>
      <div className="carousel w-full pt-0">
        <div id="item1" className="carousel-item w-screen relative">
          <img src="/banner2.jpg" className="w-screen h-[400px]" />
          <div class="absolute top-1/2 flex items-center justify-end ml-5">
            <div class="card bg-base-100 w-96 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">Welcome to E-learning</h2>
                <p>An online platfrom for learning technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">Product List</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 m-10">
        {products.map((item, index) => {
          return (
            <div key={index}>
              <div className="card p-5 bg-base-100 shadow-xl md:w-80 lg:w-[350px] xl:w-[150px]">
                <figure>
                  <img
                    className="w-[130px] h-[130px]"
                    src={item.img_url}
                    alt="Products"
                  />
                </figure>
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

      <div className="flex justify-center mb-20 mt-10">
        <div className="mr-20">
        <img src="profile-about.jpg" alt="" className="" />
        <h1 className="text-xl font-bold ml-10">CEO</h1>
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
