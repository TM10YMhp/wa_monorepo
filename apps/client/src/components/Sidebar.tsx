import { cx } from "@/utils/cx";
import { useState } from "react";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

export default function Sidebar({ id, name }: { id: string; name: string }) {
  const CONVERSATIONS_KEY = "conversations";
  const CONTACTS_KEY = "contacts";

  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  const closeModal = () => {
    (document.getElementById("my_modal_1") as HTMLDialogElement).close();
  };

  return (
    <div className="flex flex-col w-60">
      <p className="p-2 border-b text-sm">
        Your Id: <span className="text-gray-500">{id}</span>
      </p>
      <p className="p-2 text-sm">
        Your Name: <span className="text-gray-500">{name}</span>
      </p>
      <button
        className="btn btn-primary btn-sm w-full mb-4"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          ).showModal()
        }
      >
        New {conversationsOpen ? "Conversation" : "Contact"}
      </button>

      <div
        role="tablist"
        className={cx(
          "tabs tabs-lifted",
          "grid-cols-2 grid-rows-[auto_1fr] h-full",
          "[&>.tab]:bg-neutral [&>.tab-content]:h-full",
        )}
      >
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Conversations"
          defaultChecked
          onChange={() => setActiveKey(CONVERSATIONS_KEY)}
        />
        <div role="tabpanel" className="tab-content">
          <Conversations />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Contacts"
          onChange={() => setActiveKey(CONTACTS_KEY)}
        />
        <div role="tabpanel" className="tab-content">
          <Contacts />
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {conversationsOpen ? (
            <NewConversationModal closeModal={closeModal} />
          ) : (
            <NewContactModal closeModal={closeModal} />
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
