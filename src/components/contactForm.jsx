import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify"; // Import toast for notifications

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onSubmit = async (data) => {
    try {
      // Send the form data to the backend API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        router.push("/thankyou");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to submit the form. Please try again later.");
    }
  };

  return (
    <section id="contact" className="relative ">
      <div className="max-w-5xl max-lg:max-w-3xl mx-auto bg-white my-6 font-[sans-serif]">
        <div className="text-center px-6">
          <h2
            className="text-gray-800 text-5xl font-extrabold"
            style={{ fontFamily: "Trirong, sans-serif" }}
          >
            Contact Us
          </h2>
          <p className="text-sm text-gray-500 mt-4">
            Have some big idea or brand to develop and need help?
          </p>
        </div>

        <div className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-12">
          <div className="bg-[#011c2b] rounded-lg p-6 h-full max-lg:order-1">
            <h2 className="text-xl text-white">Contact Information</h2>
            <p className="text-sm text-gray-300 mt-4">
              Have some big idea or brand to develop and need help?
            </p>

            <ul className="mt-16 space-y-8">
              {/* Contact info list items with icons */}
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="#fff"
                  viewBox="0 0 479.058 479.058"
                >
                  <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"></path>
                </svg>
                <a
                  href="mailto:info@example.com"
                  className="text-white text-sm ml-4"
                >
                  info@example.com
                </a>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="#fff"
                  viewBox="0 0 482.6 482.6"
                >
                  <path d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.2 1.7 6.4 3.4 9.6 5.2 13.5 6.8 10.1 20.7 10.2 28.9-.2 7.9-8.3 10.4-23 6.8-35.6z"></path>
                </svg>
                <a href="tel:+1234567890" className="text-white text-sm ml-4">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="#fff"
                  viewBox="0 0 256 256"
                >
                  <path d="M128 24C70.7 24 24 70.7 24 128S70.7 232 128 232s104-56.7 104-104S185.3 24 128 24zM128 208c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z"></path>
                </svg>
                <a
                  href="https://www.google.com/maps?q=Your+Business+Location"
                  className="text-white text-sm ml-4"
                >
                  123 Business St, City, Country
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2  max-lg:order-2 p-6 rounded-lg">
            <h3 className="text-xl text-gray-800 font-semibold">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md"
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="mt-6 bg-black text-white py-3 px-6 rounded-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default ContactForm;
