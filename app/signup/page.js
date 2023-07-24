"use client";
import React from "react";
import signUp from "@/auth/firebase/signup";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput/FormInput";
import Image from "next/image";
import MyRadioGroup from "@/components/RadioButtons/RadioGroup";

function Page() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [major, setMajor] = React.useState("Select Major..");
  const [year, setYear] = React.useState("Select Year..");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [isPassCorrect, setPassCorrect] = React.useState(true);
  const [isPassLengthCorrect, setPassLengthCorrect] = React.useState(true);

  const router = useRouter();

  const years = ["Freshman", "Sophomore", "Junior", "Senior", "Grad", "PhD"];
  const majors = ["Computer Science", "Cybersecurity", "Data Science"];
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
      const response = await fetch("https://www.khourychat.com/api/users", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          uid: user["uid"],
          major: major,
          year: year,
          posts: [],
          replies: [],
        }),
      });
      const result = await response.json();
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

    await addUserToServer(result.user);

    router.push("/");
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
              className="flex flex-col gap-5 text-xl items-start w-full"
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
              <div className="flex flex-col w-full gap-5 items-center justify-center">
                <label>
                  <MyRadioGroup
                    selected={year}
                    setSelected={setYear}
                    start="Select Year..."
                    name="Yeart"
                    people={years}
                  />
                </label>
                <label>
                  <MyRadioGroup
                    selected={major}
                    setSelected={setMajor}
                    start="Select Major..."
                    name="Major"
                    people={majors}
                  />
                </label>
              </div>
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
