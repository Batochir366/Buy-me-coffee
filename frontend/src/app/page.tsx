"use client";
import { useRef, useState } from "react";
import { userSchema } from "./validation/userValidation";

export default function Home() {
  // import { userSchema } from "./validation/userValidation";
  const eRef = useRef(null);
  const uRef = useRef(null);
  const pRef = useRef(null);
  const [errors, setError] = useState([]);
  const handleonclick = async () => {
    try {
      const isValid = await userSchema.validate({
        username: uRef.current!.value,
      });
    } catch (error: any) {
      setError(error.message);
    }
  };
  console.log(errors);

  return (
    <div className="flex size-svh justify-center items-start flex-col gap-3">
      <input
        ref={uRef}
        placeholder="username"
        className="w-[500px] border-white border-solid border"
      />
      <p className="text-red-400">{errors}</p>
      <input
        ref={eRef}
        placeholder="email"
        className="w-[500px] border-white border-solid border"
      />
      <p className="text-red-400">{errors}</p>
      <input
        ref={pRef}
        placeholder="password"
        className="w-[500px] border-white border-solid border"
      />
      <p className="text-red-400">{errors}</p>

      <button onClick={handleonclick}>click me</button>
    </div>
  );
}
