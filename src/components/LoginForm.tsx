"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation"; // for client-side navigation

export default function LoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setShowValidation(true);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API_URL is not defined in the environment variables.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: formData,
        credentials: "include", // Important: this ensures cookies are sent
      });

      if (response.ok) {
        console.log("Login successful! Cookie set on server-side.");
        router.push("/");
      } else {
        console.error("Login failed: ", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className} flex flex-col gap-4`}
    >
      <FormInput
        name="username"
        value={username}
        placeholder="Email"
        onChange={handleUsernameChange}
        showValidation={showValidation && username === ""}
      />
      <FormInput
        name="password"
        value={password}
        placeholder="Password"
        type="password"
        onChange={handlePasswordChange}
        showValidation={showValidation && password === ""}
      />
      <button
        type="submit"
        className="w-1/2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
      >
        Log in
      </button>
    </form>
  );
}
