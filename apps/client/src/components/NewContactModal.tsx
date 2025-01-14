import { useRef } from "react";
import { useContacts } from "../contexts/ContactsProvider";

export default function NewContactModal({
  closeModal,
}: { closeModal: () => void }) {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { createContact } = useContacts();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (idRef.current && nameRef.current) {
      createContact({
        id: idRef.current.value,
        name: nameRef.current.value,
      });
    }
    closeModal();
  }

  return (
    <>
      <p className="mb-4 text-lg font-bold">Create Contact</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-row items-center">
          <p className="label mr-1">Id:</p>
          <input
            type="text"
            className="input input-bordered input-sm"
            ref={idRef}
            required
          />
        </label>
        <label className="flex flex-row items-center">
          <p className="label mr-1">Name:</p>
          <input
            type="text"
            className="input input-bordered input-sm"
            ref={nameRef}
            required
          />
        </label>

        <button className="btn btn-primary btn-sm mt-4" type="submit">
          Create
        </button>
      </form>
    </>
  );
}
