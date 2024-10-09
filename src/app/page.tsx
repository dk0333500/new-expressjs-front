"use client";
import { useState } from "react";

// Define the type for formData
type FormData = {
  id: number | undefined;
  name: string;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    id: undefined,
    name: "",
  });

  // Use proper type annotations for event parameters
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch(
        "https://expressjs-5gt976du1-dk0333500s-projects.vercel.app/api/users/edit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: formData.id,
            newName: formData.name,
          }),
        }
      );
      const result = await response.json();
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6 w-full max-w-sm">
        <form onSubmit={handleSubmit}>
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
              name="id"
              value={formData.id || ""}
              onChange={handleChange}
              className="text-blue-500 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter user ID"
              required
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
              id="input2"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-blue-500 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter user name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
