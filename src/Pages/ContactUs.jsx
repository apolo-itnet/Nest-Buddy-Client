import { Mail, User, MessageCircle } from "lucide-react";
import PrimaryBtn from "../Shared/Button/PrimaryBtn";

const ContactUs = () => {
  return (
    <section className="py-16 px-4 md:px-20 bg-p-color pt-color">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-lime-500">Contact Us</h2>
        <p className="text-gray-600 mt-2">
          Have a question, suggestion, or just want to say hello? Fill out the
          form below and we'll get back to you shortly.
        </p>
      </div>

      <form
        className="max-w-4xl mx-auto bg-lime-50 p-8 rounded-xl shadow space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          // Handle your submit here (EmailJS or fetch to backend)
          alert("Message sent successfully!");
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Your Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-2.5 text-lime-500"
                size={20}
              />
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="py-2.5 sm:py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-lime-500 focus:ring-lime-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email Address</label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-lime-500"
                size={20}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="py-2.5 sm:py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-lime-500 focus:ring-lime-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            required
            placeholder="What’s your message about?"
            className="py-2.5 sm:py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-lime-500 focus:ring-lime-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Your Message</label>
          <div className="relative">
            <MessageCircle
              className="absolute left-3 top-3 text-lime-500"
              size={20}
            />
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Write your message..."
              className="py-2.5 sm:py-3 px-4 pl-10 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-lime-500 focus:ring-lime-500 focus:outline-none"
            ></textarea>
          </div>
        </div>

        <div className="text-center">
          <PrimaryBtn
            type="submit"
            label="Send Message"
            className="bg-lime-500 text-white px-6 py-2 rounded-full hover:bg-lime-600 transition duration-300"
          />
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
