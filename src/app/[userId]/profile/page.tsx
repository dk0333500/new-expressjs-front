"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const userId = useParams();
  console.log(userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${userId.userId}`,
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
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);
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
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Address:
            </label>
            <p className="text-gray-800">{`{user.address.street} ${user.address.number}, ${user.address.city}, ${user.address.zipcode}`}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Geolocation:
            </label>
            <p className="text-gray-800">{`Latitude: ${user.address.geolocation.lat}, Longitude: ${user.address.geolocation.long}`}</p>
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default ProfilePage;
