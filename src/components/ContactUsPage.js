import React from "react";

const ContactUsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="py-20 bg-blue-400 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Get in Touch
            </h2>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-lg font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
