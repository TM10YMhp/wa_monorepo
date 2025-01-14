import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [id, setId] = useLocalStorage<string>("id", "");
  const [name, setName] = useLocalStorage<string>("name", "");

  const dashboard = (
    <SocketProvider id={id} name={name}>
      <ContactsProvider>
        <ConversationsProvider id={id} name={name}>
          <Dashboard id={id} name={name} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login setId={setId} setName={setName} />;
}

export default App;
