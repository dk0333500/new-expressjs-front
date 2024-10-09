"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define the structure of the user object
interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  // Add any additional fields that you expect
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null); // Explicitly use User type
  const { userId } = useParams<{ userId: string }>(); // Define the type for userId

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data: User = await response.json(); // Type the response data
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return user ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">User Profile</h1>
        <div className="space-y-4">
          <div className="flex flex-row gap-8">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <p className="text-gray-800">{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div className="flex flex-row gap-8">
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <p className="text-gray-800">{user.username}</p>
          </div>
          <div className="flex flex-row gap-8">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div className="flex flex-row gap-8">
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <p className="text-gray-800">{user.phone}</p>
          </div>
          {/* Additional fields can be added here */}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProfilePage;
