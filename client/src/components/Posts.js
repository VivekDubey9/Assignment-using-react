import React, { useState, useEffect } from "react";
import "./Posts.css";
import { CiEdit } from "react-icons/ci";
import { LuTrash } from "react-icons/lu";

const Posts = ({ posts, setPosts, loading }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
  });
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) {
    return <h2>Loading...</h2>;
  }
  const currentPosts = posts.slice(
    (curPage - 1) * itemsPerPage,
    curPage * itemsPerPage
  );

  const handleCheckboxChange = (postId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(postId)) {
        return prevSelectedRows.filter((id) => id !== postId);
      } else {
        return [...prevSelectedRows, postId];
      }
    });
  };

  const handleSelectAllRows = () => {
    setSelectAllRows(!selectAllRows);
    const allRows = currentPosts.map((post) => post.id);

    setSelectedRows((prevSelectedRows) => {
      if (selectAllRows) {
        // Deselect all
        return prevSelectedRows.filter((id) => !allRows.includes(id));
      } else {
        // Select all from the current page
        return [...prevSelectedRows, ...allRows];
      }
    });
  };

  const handleDeleteSelected = () => {
    // Implement your delete logic for selected rows here
    console.log("Deleting selected rows:", selectedRows);

    // Filter out the selected rows from the current posts
    const updatedPosts = posts.filter(
      (post) => !selectedRows.includes(post.id)
    );

    // Update the parent component's state with the new posts array
    setPosts(updatedPosts);

    // Clear selectedRows, editMode, and editedValues
    setSelectedRows([]);
    setEditMode(null);
    setEditedValues({ name: "", value: "", id: "" });
  };

  const handleDelete = (postId) => {
    console.log("jhii");
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setEditMode(null);
    setEditedValues({ name: "", value: "", id: "" });
  };

  const handleEdit = (postId) => {
    setEditMode(postId);
    const postToEdit = posts.find((post) => post.id === postId);
    setEditedValues({
      name: postToEdit.name,
      email: postToEdit.email,
      role: postToEdit.role,
    });
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedValues({ name: "", value: "", id: "" });
  };

  const handleSaveEdit = () => {
    const { name, email, role, id } = editedValues;

    // Update the posts array immutably
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, name, email, role } : post
    );

    // Set the new posts array
    setPosts(updatedPosts);

    // Reset edit mode and edited values
    setEditMode(null);
    setEditedValues({
      name: "",
      email: "",
      role: "",
      id: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      id,
    }));
  };

  return (
    <>
      <div className="delete-all">
        <button
          className="btn btn-danger delete-all"
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          <LuTrash />
        </button>
      </div>
      <table className="table table-hover table-bordered">
        <thead className="thread-dark">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllRows}
                onChange={handleSelectAllRows}
              />
            </th>

            {/* <th scope="col">#</th> */}
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr
              key={post.id}
              style={{
                backgroundColor: selectedRows.includes(post.id)
                  ? "#ddd"
                  : "inherit",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(post.id)}
                  onChange={() => handleCheckboxChange(post.id)}
                />
              </td>
              {/* <th scope="row">{index + 1}</th>  this can display all the rows in numbers not required at the moment though*/}
              <td>
                {editMode === post.id ? (
                  <input
                    type="text"
                    name="name"
                    id={post.id}
                    value={editedValues.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  post.name
                )}
              </td>
              <td>
                {editMode === post.id ? (
                  <input
                    type="text"
                    name="email"
                    id={post.id}
                    value={editedValues.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  post.email
                )}
              </td>
              <td>
                {editMode === post.id ? (
                  <input
                    type="text"
                    name="role"
                    id={post.id}
                    value={editedValues.role}
                    onChange={handleInputChange}
                  />
                ) : (
                  post.role
                )}
              </td>
              <td>
                {editMode === post.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(post.id)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      <LuTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Posts;
