import { randomID } from "@/utils/randomID";
import { useRef } from "react";

export default function Login({
  setId,
  setName,
}: {
  setId: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const nameRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (nameRef.current) {
      setId(randomID());
      setName(nameRef.current.value);
    }
  }

  return (
    <div className="px-4 max-w-lg mx-auto flex items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full">
        <label className="flex flex-col mb-2">
          <p className="label">Enter Your Name:</p>
          <input
            className="input input-bordered"
            type="text"
            ref={nameRef}
            required
          />
        </label>
        <button className="btn btn-primary mr-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
