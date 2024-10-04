import React from "react";
import { createContext, useState, useEffect } from "react";
import BookDetails from "../components/BookDetails";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Load JSON Data
  useEffect(() => {
    fetch("https://e-learning-server-nu.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleClick = (index) => {
    console.log("handle click called");
    navigate('/bookdetails', { state: { book: products[index] } });
  };

  return (
    <div>

<div className="carousel w-full pt-0 bg-[#e51942]">
  <div id="item1" className="carousel-item w-full">
    <div className="banner-content-part lg:banner-content-part-lg"> 
    <h1 className="banner-content-first-title lg:text-2xl">Unlock a World of Stories</h1>
    <h2 className="banner-content-second-title lg:text-xl">Find your Next favorite Book at </h2>
    <h2 className="banner-content-third-title lg:text-2xl">Kishore Book House</h2>
    <button className='banner-content-btn'>Buy book</button>
    </div>
    <img src="/banner1.jpg" className="banner-img-part lg:banner-img-part-lg xl:banner-img-part-xl" />
  </div>
  <div id="item2" className="carousel-item w-full">
    <div className="banner-content-part lg:banner-content-part-lg"> 
    <h1 className="banner-content-first-title lg:text-2xl">Unlock a World of Stories</h1>
    <h2 className="banner-content-second-title lg:text-xl">Find your Next favorite Book at </h2>
    <h2 className="banner-content-third-title lg:text-2xl">Kishore Book House</h2>
    <button className='banner-content-btn'>Buy book</button>
    </div>
    <img src="/banner2.jpg" className="banner-img-part lg:banner-img-part-lg xl:banner-img-part-xl" />
  </div>
  <div id="item3" className="carousel-item w-full">
    <div className="banner-content-part lg:banner-content-part-lg"> 
    <h1 className="banner-content-first-title lg:text-2xl">Unlock a World of Stories</h1>
    <h2 className="banner-content-second-title lg:text-xl">Find your Next favorite Book at </h2>
    <h2 className="banner-content-third-title lg:text-2xl">Kishore Book House</h2>
    <button className='banner-content-btn'>Buy book</button>
    </div>
    <img src="/banner1.jpg" className="banner-img-part lg:banner-img-part-lg xl:banner-img-part-xl" />
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
</div>

      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">Book List</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 m-10">
        {products.map((item, index) => {
          return (
            <div key={index}>
              <div className="card mt-10 bg-base-100 w-96 shadow-xl md:w-80 lg:w-[350px] xl:w-96">
                <figure>
                  <img
                    className="w-[250px] h-[120px]"
                    src={item.img_url}
                    alt="Books"
                  />
                </figure>
                <div className="card-body items-center text-center px-1">
                  <h2 className="card-title"> {item.title} </h2>
                  <h3 className="font-semibold"> {item.duration}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
