import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const prodUrl = "https://easy-deals-server.onrender.com/categories";
        const response = await fetch("https://easy-deals-server.onrender.com/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error state (optional)
        setCategories([]);
      } finally {
        setLoading(false); // Ensure loading is set to false even in case of error
      }
    };
  
    fetchCategories();
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

      {isLoading && (
        <div className="mx-auto text-center mt-10">
          <span className="loading loading-spinner loading-xs"></span>
          <span className="loading loading-spinner loading-sm"></span>
          <span className="loading loading-spinner loading-md"></span>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

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

      <div className="py-10 px-32">
        <h1 className="mx-auto text-center font-bold text-3xl pb-3">FAQ Section</h1>
      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
        1. What is React.js and Explain the concept of "components" in React
        </div>
        <div className="collapse-content pr-4">
          <p><span className="font-bold"> React.js</span> is a JavaScript library for building user interfaces, developed 
            and maintained by Facebook. It's primarily used for creating dynamic, 
            single-page applications (SPAs), where content is updated without requiring 
            a full page reload. React allows developers to create reusable UI components,
             manage application state, and efficiently update the DOM using 
             a virtual DOM for optimal performance.</p>

             <p className="pt-3"> <span className="font-bold">A component </span> in React is a reusable, independent block of code that
                 represents a part of the UI. Components allow you to break down 
                 the UI into smaller, manageable pieces, each handling a specific function
                  or area of the interface. These components can then be combined to
                   build complex user interfaces.</p>
        </div>
      </div>
      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        2. What is JSX in React, and how does it work?
        </div>
        <div className="collapse-content pr-4">
          <p><span className="font-bold">JSX (JavaScript XML) </span> is a syntax extension for JavaScript
             used in React to describe what the UI should look like.
              It looks similar to HTML but can be used directly within JavaScript. 
              JSX is not required in React, but it is commonly used because it
               makes it easier to write and visualize the structure of a React component.</p>
            <p className="pt-3"> JSX allows developers to write HTML-like code that is later transformed 
                into JavaScript by a tool called Babel. Behind the scenes, JSX elements
                 are converted into regular JavaScript objects that React 
                 can render efficiently into the DOM. </p>
        </div>
      </div>
      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        3. What is the Virtual DOM, and how does React use it to optimize performance?
        </div>
        <div className="collapse-content pr-4">
          <p><span className="font-bold mr-4">The Virtual DOM </span> allows React to batch multiple updates
             and apply them all at once. Without this, every
              change to the real DOM would be slow and expensive, as
               the browser would need to recalculate styles, layout,
                and re-render content for every update.</p>
        </div>
      </div>

      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        4. Explain the concept of "props" in React and how they are used.
        </div>
        <div className="collapse-content">
          <p> <span className="font-bold"> Props (short for "properties") </span> are a core concept in React that
             allow you to pass data from one component to another, typically
              from a parent component to a child component. Props are read-only,
               meaning that a component cannot modify the props it receives — they 
               are intended to make components reusable and dynamic by allowing data
                to flow into the component from an external source.</p>
        </div>
      </div>

      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        5. What is "state" in React, and how does it differ from props?
        </div>
        <div className="collapse-content">
          <p>In React, <span className="font-bold">state </span> is an object that represents the dynamic data 
            of a component. It is used to store and manage information that may
             change over time, usually as a result of user interaction, API calls,
              or other events. State allows components to react to changes, 
              re-render themselves, and update the UI accordingly.</p>
        </div>
      </div>

      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        6. Explain the useState hook and provide an example of how it is used
        </div>
        <div className="collapse-content">
          <p> <span className="font-bold">The useState hook </span> is one of the most commonly used React hooks.
             It allows you to add state to functional components,
              which wasn't possible before React introduced hooks in 
              version 16.8. With useState, you can create a piece of state
               and have React automatically update the component when that state changes.</p>
        </div>
      </div>

      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        7. What is the purpose of the useEffect hook in React, and when would you use it?
        </div>
        <div className="collapse-content">
          <p> <span className="font-bold">The useEffect </span> hook in React allows you to perform side effects
             in function components. Side effects are tasks that affect
              something outside the function, such as fetching data,
               setting up subscriptions, manually changing the DOM, 
               or starting timers. These tasks can’t be done during the
                rendering phase because they need to happen after the
                 component has been mounted and updated.</p>
        </div>
      </div>

    </div>

    </div>
  );
};

export default Home;
