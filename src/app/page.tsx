"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<any>("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: any) => {
    console.log("object");
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: formData.id, // Assuming formData has an id field
        newName: formData.name,
      }),
    });
    console.log(response);
  };
  console.log(formData);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6 w-full max-w-sm">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="input1"
          >
            User Id
          </label>
          <input
            id="input1"
            type="number"
            className="text-blue-500 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter something"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="input2"
          >
            User Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="input2"
            type="text"
            className="text-blue-500 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter something"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
