import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../Provider/AuthProvider';

const LoginPage = () => {
    const { signIn, googleSignIn, githubSignIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Location in the login page", location);
  
    const handleLogin = (event) => {
      event.preventDefault();
  
      const form = new FormData(event.currentTarget);
      console.log(form);
  
      const email = form.get("email");
      const password = form.get("password");
      console.log(email, password);
      setIsLoading(true);
  
      signIn(email, password)
        .then((result) => {
          console.log(result.user);
          setIsLoading(false);
          toast.success("User Login Successful", {
            position: "top-right",
          });
          navigate("/dashboard", { state: { uid: result.user.uid } });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
  
    const handleGoogleSignin = () => {
      googleSignIn(googleProvider)
        .then((result) => {
          console.log(result.user);
          toast.success("User Google Login Successful", {
            position: "top-right",
          });
          console.log("location value "+location.state);
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleGitHubSignin = () => {
        console.log("github sign called");
        githubSignIn(githubProvider)
        .then((result) => {
          console.log(result.user);
          toast.success("User GitHub Login Successful", {
            position: "top-right",
          });
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
        <div className="py-8">
        <div className="flex h-full items-center justify-center">
          <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
              <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col gap-4 pb-4"
                >
                  <h1 className="mb-4 text-2xl font-bold dark:text-white text-center">
                    Login your Account
                  </h1>
                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Email
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                          id="email"
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          autoComplete="on"
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        data-testid="flowbite-label"
                        htmlFor="password"
                      >
                        Password
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300
                           text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700
                            dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="on"
                          required
                        />
                      </div>
                    </div>
                    <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
                      Forgot password?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="btn btn-outline btn-info rounded-none"
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                        Login
                      </span>
                    </button>

                    {/* <button
                      onClick={handleGoogleSignin}
                      type="button"
                      className="btn btn-outline btn-error mt-2 rounded-none"
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                        Sign in with Google
                      </span>
                    </button>

                    <button
                      onClick={handleGitHubSignin}
                      type="button"
                      className="btn btn-outline mt-2 rounded-none"
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                        Sign in with GitHub
                      </span>
                    </button> */}

                  </div>
                </form>
                <div className="min-w-[270px]">
                  <div className="mt-2 text-center dark:text-gray-200">
                    Don&apos;t Have an Account? &nbsp;
                    <Link
                      className="text-blue-500 underline hover:text-blue-600"
                      to="/register"
                    >
                      Register Here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
            <div className="w-1/3 p-4 bg-white rounded shadow">
              <p className="text-center mb-4">Loading...</p>
              <div className="flex justify-center">
                <div className="w-16 h-16 border-8 border-dashed border-blue-500 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default LoginPage;