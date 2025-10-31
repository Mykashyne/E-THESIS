import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    author: "",
    abstract: "",
    keyword: "",
    adviser: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thesis submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">E-Thesis</h1>
        <h2 className="text-2xl font-semibold text-blue-800">
          Welcome to the Fisheries Department Thesis Archive
        </h2>
        <p className="text-blue-700 mt-2">
          Explore, Search, and Discover Research Works from 2015–2025
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <input
          type="text"
          placeholder="🔍 Search thesis by title, author, or keyword"
          className="w-full p-3 mb-6 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left font-semibold text-blue-900">
              Thesis Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Thesis Title"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-blue-900">
              Year
            </label>
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter Year"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-blue-900">
              Author
            </label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-blue-900">
              Abstract
            </label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              placeholder="Type or paste abstract here..."
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-left font-semibold text-blue-900">
              Keyword
            </label>
            <input
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="Enter Keyword"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-blue-900">
              Adviser
            </label>
            <input
              name="adviser"
              value={formData.adviser}
              onChange={handleChange}
              placeholder="Enter Adviser"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Submit Thesis
          </button>
        </form>
      </div>

      <footer className="mt-8 text-blue-900 text-sm">
        © 2025 Fisheries Department | Thesis Archive Portal
      </footer>
    </div>
  );
}

export default App;
