import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";
import { LuTrash } from "react-icons/lu";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [text, setText] = useState();

  //calling api to fetch data

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setPosts(res.data);
      console.log(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);


  //search query handler to search on any filter user wants
  function searchUsers(query) {
    query = query.toLowerCase();
    return posts.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }

  const inputHandler = (event) => {
    event.preventDefault();
    const temp = searchUsers(text);
    setPosts(temp);
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
    console.log(text);
  };


  // Get current lists
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Admin Dashboard</h1>
      <div className="input-group mb-3">
        <form onSubmit={inputHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="Search on any filter you want"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={handleInputChange}
          />
        </form>
      </div>
      <Posts allPosts={currentPosts} setAllPosts={setPosts} loading={loading} /> 
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
