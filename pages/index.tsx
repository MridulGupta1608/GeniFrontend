import React, { useState } from "react";

const login = () => {
  const verify = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email);
    console.log(password);

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log({ data });

    localStorage.setItem("userId", data?.data?.userId);
    localStorage.setItem("role", data?.data?.role);
    localStorage.setItem("token", data?.data?.token);
    // if (data?.data?.role === "Admin") {
    //   window.location.href = "/admin";
    // }

    // if (data?.data?.role === "User") {
    //   window.location.href = "/";
    // }
    window.location.href = "/task";

    if (data.error) {
      console.log(data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex items-center justify-center text-white rounded-lg bg-slate-500">
        <div className="m-10">
          <form className="flex flex-col w-48 gap-4 mx-10" onSubmit={verify}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email"
                  //   onChange={handelEmail}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  //   onChange={handelPassword}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm
							font-semibold text-white shadow-sm hover:bg-indigo-400
							focus-visible:outline focus-visible:outline-2
							focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
