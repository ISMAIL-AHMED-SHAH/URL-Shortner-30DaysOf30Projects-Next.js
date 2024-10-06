"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import axios from "axios";

const BITLY_API_URL = "https://api-ssl.bitly.com/v4/shorten";
const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN; // Access the token from the environment variable

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>(""); // State to manage the long URL input
  const [shortUrl, setShortUrl] = useState<string>(""); // State to manage the shortened URL
  const [error, setError] = useState<string>(""); // State to manage error messages

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    setShortUrl(""); // Reset shortened URL state

    try {
      const response = await axios.post(
        BITLY_API_URL,
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`, // Use the token in the header
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.link); // Set the shortened URL state with the response data
    } catch (err) {
      setError("Failed to shorten the URL. Please try again."); // Set error state if the request fails
    }
  };

  // Function to handle copying the shortened URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Successfully Copied the Short URL!"); // Alert user that the URL has been copied
  };

  // JSX return statement rendering the URL Shortener UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-500">
<div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden p-6 m-6 transition-transform duration-300 hover:shadow-xl hover:scale-105">

        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="text-purple-700">URL</span>  <span className="text-4xl text-center text-gradient bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">Shortener</span>
          </h1>
          <p className="text-center text-gradient bg-gradient-to-r text-purple-600 text-transparent bg-clip-text">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>
        {/* Form to input and submit the long URL */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              type="url"
              placeholder="Paste your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="pr-16 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 ease-in-out"
              required
            />
            <Button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Shorten
            </Button>
          </div>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {/* Display the shortened URL and copy button */}
          {shortUrl && (
            <div className="flex items-center space-x-2 mt-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-500 hover:text-purple-600 p-2 rounded-md hover:bg-purple-100 transition duration-300 ease-in-out"
                onClick={handleCopy}
              >
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          )}
        </form>
      </div>
                        {/* Footer section */}
                        <footer className="mt-4 text-sm text-muted-foreground text-white">
        Created By Ismail Ahmed Shah
      </footer>
    </div>
  );
}
