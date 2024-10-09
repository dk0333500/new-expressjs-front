"use client";
import { useState } from "react";

// Define the type for form data
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

export default function CreateUser() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  // Specify the type for the change event: React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Specify the type for the form submit event: React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch("http://localhost:3000/api/create-account", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstname,
        lastName: formData.lastname,
        phone: formData.phone,
      }),
    });
    console.log(response);
    // Add your form submission logic here
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-blue-600">
          Create an Account
        </h1>

        <div>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-600"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-600"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-600"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-600"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-600"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-600"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
