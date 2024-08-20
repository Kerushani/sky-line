"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import Navbar from "@/components/Navbar";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  //going to fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.log("Oh no, there was an error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  //create a new user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...users]);
    } catch (error) {
      console.error("Uh oh, something went wrong creating the user: ", error);
    }
  };

  //update user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: "", name: "", email: "" });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Uh oh, something went wrong updating the user: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Navbar />
      <div className="space y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Flight Cancellations and Delays
        </h1>

        {/* Create user */}
        <form
          onSubmit={createUser}
          className="p-6 bg-white/30 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg max-w-md mx-auto space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-gray-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              name="name"
              value={newUser.name}
              className="p-3 bg-white/60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              name="email"
              value={newUser.email}
              className="p-3 bg-white/60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        {/* Update user */}

        <form
          onSubmit={handleUpdateUser}
          className="p-6 bg-white/30 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg max-w-md mx-auto space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-gray-800">
              User ID
            </label>
            <input
              type="text"
              onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
              name="name"
              value={updateUser.id}
              className="p-3 bg-white/60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="User ID"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-gray-800">
              New Name
            </label>
            <input
              type="text"
              onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
              name="New name"
              value={updateUser.name}
              className="p-3 bg-white/60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New name"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-gray-800">
              New Email
            </label>
            <input
              type="text"
              onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
              name="New email"
              value={updateUser.email}
              className="p-3 bg-white/60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update User
          </button>
        </form>
        {/* Display the users here */}
        {/* <div className="space-y-2"> */}
          {/* {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white"
            >
              <CardComponent card={user} />
              <button onClick={() => deleteUser(user.id)} className="bg-red-500 hover: bg-red-700">
                Delete User
              </button>
            </div>
          ))} */}
        {/* </div> */}
      </div>
    </div>
  );
}
