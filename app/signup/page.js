"use client";
import React from "react";
import signUp from "@/auth/firebase/signup";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput/FormInput";
import Image from "next/image";

function Page() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [isPassCorrect, setPassCorrect] = React.useState(true);
  const [isPassLengthCorrect, setPassLengthCorrect] = React.useState(true);
  const router = useRouter();

  function confirmPassword(pass, main) {
    let first = pass;
    let second = main ? confirmPass : password;

    setPassCorrect(first == second);
  }
  function setMainPassword(pass) {
    setPassword(pass);
    setPassLengthCorrect(pass.length >= 6);
    confirmPassword(pass, true);
  }
  function setConfirmPassword(pass) {
    setConfirmPass(pass);
    confirmPassword(pass, false);
  }
  function login() {
    router.push("/login");
  }
  const addUserToServer = async (user) => {
    try {
      const response = await fetch(
        "https://www.khourychat.com/api/users?" +
          new URLSearchParams({
            username: username,
            firebase_UID: user["uid"],
            major: "Computer Science",
            year: "MS",
            posts: [],
            replies: [],
          }),
        {
          method: "POST",
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(username, email, password);

    if (error) {
      return console.log(error);
    }

    console.log(result.user);
    await addUserToServer(result.user);

    console.log(result);
    return router.push("/");
  };
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="">
          <Image src="/husky.png" alt="Husky" width={700} height={900} />
        </div>
        <div className="flex flex-col justify-center h-screen">
          <div className="flex items-center">
            <form
              onSubmit={handleForm}
              className="flex flex-col gap-6 text-xl items-start w-full"
            >
              <div className="font-bold text-8xl text-white h-1/2">
                Register
              </div>

              <label htmlFor="username">
                <FormInput
                  onChange={setUsername}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </label>
              <label htmlFor="email">
                <FormInput
                  onChange={setEmail}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </label>
              <label htmlFor="password">
                <FormInput
                  errorHighlight={!isPassCorrect}
                  onChange={setMainPassword}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                {!isPassLengthCorrect && (
                  <div className="p-0 m-0 text-white font-bold text-lg">
                    Password length must be at least 6.
                  </div>
                )}
              </label>
              {console.log(isPassCorrect)}
              <label htmlFor="confirm-password">
                <FormInput
                  errorHighlight={!isPassCorrect}
                  onChange={setConfirmPassword}
                  type="password"
                  name="confpassword"
                  placeholder="Confirm Password"
                />
              </label>
              <button
                className="my-6 self-center text-white bg-red-700 py-3 rounded-full w-1/2 hover:bg-red-400 font-sans font-semibold text-md"
                type="submit"
              >
                Sign up
              </button>
              <label className="text-white text-lg flex flex-row gap-3">
                <span>Already Registered?</span>
                <span
                  className=" text-blue-600 cursor-pointer hover:text-blue-400"
                  onClick={login}
                >
                  Log in!
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
