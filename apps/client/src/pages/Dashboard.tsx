import OpenConversation from "../components/OpenConversation";
import Sidebar from "../components/Sidebar";

export default function Dashboard({ id, name }: { id: string; name: string }) {
  return (
    <div className="flex h-screen">
      <Sidebar id={id} name={name} />
      <OpenConversation id={id} />
    </div>
  );
}
