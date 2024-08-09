"use client";

import { useState } from "react";
import FormInput from "./FormInput";

export default function LoginForm({ className }: { className: string }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setShowValidation(true); // Enable validation if fields are empty
      return;
    }
    // Handle form submission here
    console.log("Submitted:", { username, password });
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
