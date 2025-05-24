import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaDollarSign,
  FaListAlt,
  FaSlidersH,
  FaPhone,
  FaCalendarAlt,
  FaImage,
} from "react-icons/fa";
import { auth } from "../Firebase/firebase.init";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";

const UpdateListing = () => {
  const {
    _id,
    email,
    first_name,
    last_name,
    title,
    location,
    rent,
    lifestyle,
    roomType,
    availability,
    contact,
    photo,
    amenities,
    description,
    localTime,
    isoTime,
    timeZone,
    views,
    likes,
    createdAt,
  } = useLoaderData();

  const loadedData = useLoaderData();
  const [selectedAmenities, setSelectedAmenities] = useState(
    loadedData.amenities || []
  );

  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        try {
          const encodedEmail = encodeURIComponent(currentUser.email);
          const res = await fetch(
            `https://roommates-finder-server-six.vercel.app/users/email/${encodedEmail}`
          );
          const data = await res.json();
          setMongoUser(data);
        } catch (error) {
          console.error("user data fetch hocche na:", error);
        }
      } else {
        console.warn("User not logged in or email not found");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateListing = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const UpdateListing = Object.fromEntries(
      [...formData.entries()].filter(([key]) => key !== "amenities")
    );
    console.log(UpdateListing);

    UpdateListing.amenities = selectedAmenities;

    const now = new Date();
    const listingMeta = {
      localTime: now.toLocaleString(),
      isoTime: now.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    fetch(`https://roommates-finder-server-six.vercel.app/listingsRooms/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdateListing),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Listing Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleAmenityChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setSelectedAmenities((prev) => [...prev, value]);
    } else {
      setSelectedAmenities((prev) => prev.filter((a) => a !== value));
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto flex justify-center p-2 text-base-content bg-base-100">
        <form
          onSubmit={handleUpdateListing}
          method="dialog"
          className="w-full  backdrop-blur-xs p-8 rounded-2xl shadow-xl border border-gray-100/50 z-0 "
        >
          <h2 className="text-3xl font-poetsen font-medium text-center mb-4">
            Update Listing
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-10">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                <FaEnvelope /> User Email
              </label>
              <input
                type="email"
                name="email"
                readOnly
                defaultValue={email}
                className="w-full  border border-gray-300 rounded-full px-4 py-2  focus:outline-none focus:border-lime-500 focus:ring-lime-500 cursor-not-allowed"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                  <FaUser /> First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  readOnly
                  value={first_name}
                  className="w-full  border border-gray-300 rounded-full px-4 py-2  focus:outline-none focus:border-lime-500 focus:ring-lime-500 cursor-not-allowed"
                />
              </div>

              <div className="w-1/2">
                <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                  <FaUser /> Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={last_name}
                  readOnly
                  className="w-full  border border-gray-300 rounded-full px-4 py-2  focus:outline-none focus:border-lime-500 focus:ring-lime-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                <FaListAlt /> Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                defaultValue={title}
                required
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                  <FaMapMarkerAlt /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  defaultValue={location}
                  required
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                />
              </div>

              <div className="w-1/2">
                <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                  <FaDollarSign /> Rent Amount
                </label>
                <input
                  type="number"
                  name="rent"
                  required
                  placeholder="Enter rent amount"
                  defaultValue={rent}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                <FaSlidersH /> Lifestyle Preferences
              </label>
              <input
                type="text"
                name="lifestyle"
                defaultValue={lifestyle}
                required
                placeholder="e.g. Non-smoker, Vegetarian"
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                  <FaListAlt /> Room Type
                </label>
                <select
                  name="roomType"
                  required
                  defaultValue={roomType}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                >
                  <option value="">Select room type</option>
                  <option defaultValue={roomType} value="Single Room">
                    Single Room
                  </option>
                  <option defaultValue={roomType} value="Shared Room">
                    Shared Room{" "}
                  </option>
                  <option defaultValue={roomType} value="Single Seat">
                    Single Seat
                  </option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                  <FaCalendarAlt /> Availability
                </label>
                <select
                  name="availability"
                  required
                  defaultValue={availability}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                >
                  <option value={""}>Select availability</option>
                  <option defaultValue={availability} value={"Immediate"}>
                    Immediate
                  </option>
                  <option defaultValue={availability} value={"Available"}>
                    Available
                  </option>
                  <option defaultValue={availability} value={"Not Available"}>
                    Not Available
                  </option>
                </select>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 ">
              <div className="flex gap-4 w-full">
                <div className="w-1/2">
                  <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                    <FaPhone /> Contact Info
                  </label>
                  <input
                    type="text"
                    name="contact"
                    required
                    placeholder="Enter phone or email"
                    defaultValue={contact}
                    className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                  />
                </div>

                <div className="w-1/2">
                  <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                    <FaImage /> Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Enter image URL"
                    defaultValue={photo}
                    required
                    className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                  />
                </div>
              </div>

              {/* <div className="">
                      <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                        <FaFileUpload /> Upload Photo
                      </label>
                      <input
                        type="file"
                        name="photoFile"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                      />
                    </div> */}

              <div className="grid grid-cols-3 gap-2">
                {[
                  "AC",
                  "Lift",
                  "Wi-Fi",
                  "Geyser",
                  "Furnished",
                  "Balcony",
                  "Fridge",
                  "Kitchen Access",
                  "Attached Bathroom",
                  "Parking",
                  "Generator",
                  "Security Guard",
                ].map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onChange={handleAmenityChange}
                      className="checkbox checkbox-xs checkbox-primary "
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="">
              <label className="text-sm font-medium  mb-1 block">
                Description
              </label>
              <textarea
                rows="6"
                name="description"
                placeholder="Enter detailed description"
                defaultValue={description}
                required
                className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn w-full bg-lime-600 hover:bg-lime-700 text-white py-6 rounded-full text-base font-semibold transition-colors duration-500 cursor-pointer"
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateListing;
