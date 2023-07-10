"use client";
import React from "react";
import signIn from "@/auth/firebase/signin";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput/FormInput";
import Image from "next/image";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    console.log(result);
    return router.push("/");
  };
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="ml-20">
        <Image src="/husky2.png" alt="Husky" width={550} height={700} />
      </div>
      <div className="flex flex-col h-screen mr-60">
        <div className="flex  font-bold text-8xl text-white h-1/2 mt-60">
          Login
        </div>
        <div className="flex items-center h-screen">
          <form
            onSubmit={handleForm}
            className="form flex flex-col gap-5 text-xl items-center w-full mb-40"
          >
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
                onChange={setPassword}
                type="password"
                name="password"
                placeholder="Password"
              />
            </label>
            <button
              className="my-6 text-white bg-red-700 py-3 rounded-full w-1/2 hover:bg-red-400 font-sans font-semibold text-md"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
