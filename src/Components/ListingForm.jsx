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
  FaFileUpload,
} from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import { MdOutlineAddHome } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { auth } from "../Firebase/firebase.init";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const ListingForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

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

  const handleAddListing = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const formData = new FormData(form);
    const AddListing = Object.fromEntries(formData.entries());

    AddListing.amenities = selectedAmenities;

    const now = new Date();
    const listingMeta = {
      localTime: now.toLocaleString(),
      isoTime: now.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const addListingWithTime = {
      ...AddListing,
      ...listingMeta,
    };

    // save add listing forms data in mongodb
    fetch("https://roommates-finder-server-six.vercel.app/listingsRooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addListingWithTime),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Room Added Successfully",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "!z-[99999]",
              backdrop: "!z-[99998]",
            },
          });
          form.reset();
          setIsModalOpen(false);
          const modal = document.getElementById("show_form");
          modal.classList.add("modal-close");
          setTimeout(() => {
            modal.close();
            modal.classList.remove("modal-close");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error saving data to MongoDB:", error);
      });
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedAmenities([...selectedAmenities, value]);
    } else {
      setSelectedAmenities(
        selectedAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  return (
    <div className="w-full mx-auto responsive-padding text-base-content bg-base-100">
      <div className="listing-container w-full mx-auto border border-gray-200 rounded-2xl my-6">
        <div className="flex justify-between items-center border-b border-gray-200 py-2 px-3">
          <div className="flex justify-center items-center gap-2">
            <span className="text-lime-600">
              <SlEnergy size={22} />
            </span>
            <p className="text-base font-medium">Get up to 10x more views</p>
          </div>
          <button className="btn">View Plans</button>
        </div>

        <div className="flex justify-between items-center py-2 px-3">
          <div className="flex justify-center items-center gap-2">
            <span className="text-lime-600">
              <MdOutlineAddHome size={22} />
            </span>
            <p className="text-base font-medium">
              Get up to 3 listings for free
            </p>
          </div>

          {/* Open Modal Button */}
          <button
            className="open-modal btn "
            onClick={() => {
              setIsModalOpen(true);
              document.getElementById("show_form").showModal();
            }}
          >
            <span>
              <RiPlayListAddFill size={16} />
            </span>{" "}
            New Listing
          </button>
          <dialog
            id="show_form"
            className="modal modal-middle flex justify-center items-center z-[50]"
          >
            {/* Form  */}
            <div className="w-full mx-auto overflow-y-auto responsive-padding  ">
              <form
                onSubmit={handleAddListing}
                method="dialog"
                className="w-full mx-auto bg-base-100 p-8 rounded-2xl shadow-xl border border-gray-100/50 z-0 "
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl flex justify-center items-center font-poetsen font-medium text-center mb-4">
                    Create Listing
                  </h2>

                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        document.getElementById("show_form").close();
                      }}
                      type="button"
                      className="close-btn btn rounded-2xl border-none  shadow-none hover:bg-lime-50 hover:text-lime-600"
                    >
                      <IoClose size={26} />
                    </button>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-10">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                      <FaEnvelope /> User Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      readOnly
                      defaultValue={user?.email || mongoUser?.email}
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
                        value={mongoUser?.firstName || ""}
                        className="w-full border border-gray-300 rounded-full px-4 py-2  focus:outline-none focus:border-lime-500 focus:ring-lime-500 cursor-not-allowed"
                      />
                    </div>

                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                        <FaUser /> Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        defaultValue={mongoUser?.lastName || ""}
                        readOnly
                        className="w-full border border-gray-300 rounded-full px-4 py-2  focus:outline-none focus:border-lime-500 focus:ring-lime-500 cursor-not-allowed"
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
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                      >
                        <option value="">Select room type</option>
                        <option value="Single Room">Single Room</option>
                        <option value="Shared Room">Shared Room </option>
                        <option value="Single Seat">Single Seat</option>
                      </select>
                    </div>

                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-sm font-medium  mb-1">
                        <FaCalendarAlt /> Availability
                      </label>
                      <select
                        name="availability"
                        required
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                      >
                        <option value={""}>Select availability</option>
                        <option value={"Immediate"}>Immediate</option>
                        <option value={"Available"}>Available</option>
                        <option value={"Not Available"}>Not Available</option>
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
                        <label
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            name="amenities"
                            value={amenity}
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
                    Add Roommate
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
