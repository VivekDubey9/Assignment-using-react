import React, { useState } from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={post.id}>
            <td>
              <input
                type="checkbox"
                // checked={selectedRows.includes(post.id)}
              />
            </td>
            <th scope="row">{index + 1}</th>
            <td>{post.name}</td>
            <td>{post.email}</td>
            <td>{post.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Posts;
