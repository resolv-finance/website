"use client";
import { useState } from "react";

interface EmailInputProps {
  onEmailSubmit: (email: string) => void;
}

type ServerRepsonse = {
  status: string;
  message: string;
};

export const EmailInput: React.FC<EmailInputProps> = ({ onEmailSubmit }) => {
  const [serverResponse, setServerResponse] = useState({
    status: "idle",
    message: "",
  } as ServerRepsonse);

  async function registerUser(data: FormData) {
    try {
      const email = data.get("email")?.valueOf().toString();
      if (
        typeof email !== "string" ||
        email.length === 0 ||
        email.indexOf("@") === -1
      ) {
        throw new Error("Please enter a valid email");
      }

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      };

      const response = await fetch("/.netlify/functions/index", options);

      if (response.ok) {
        const successMsg = "Thanks for subscribing to our updates.";
        setServerResponse({
          status: "success",
          message: successMsg,
        });
        const timer = setTimeout(() => {
          setServerResponse({
            status: "idle",
            message: successMsg,
          });
          clearTimeout(timer);
        }, 5000);
      } else {
        throw new Error("Server Error. Please try again later.");
      }
    } catch (error) {
      let errorMsg = "There was some problem adding your email.";
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      setServerResponse({
        status: "failed",
        message: errorMsg,
      });
      const timer = setTimeout(() => {
        setServerResponse({
          status: "idle",
          message: errorMsg,
        });
        clearTimeout(timer);
      }, 5000);
    }
  }

  return (
    <div className="mx-auto mb-16 w-full md:w-email">
      <form action={registerUser} className="relative flex items-center w-full">
        <input
          type="text"
          className="h-email w-full text-base font-medium pl-8 pr-44 rounded-full border-2 border-gray hover:border-gray-light"
          placeholder="Email"
          name="email"
        />
        <div className="absolute right-2">
          <button
            type="submit"
            className="h-10 w-34 text-gray-dark font-semibold text-sm rounded-full bg-blue bg-gradient-to-br from-blue to-green hover:bg-red"
          >
            Stay Updated
          </button>
        </div>
      </form>
      <div
        className={`${
          serverResponse.status === "success"
            ? "text-green-success"
            : "text-red"
        } text-center transition-opacity duration-500 ease-linear ${
          serverResponse.status === "idle" ? "opacity-0" : "opacity-100"
        }`}
      >
        {serverResponse.message}
      </div>
    </div>
  );
}
