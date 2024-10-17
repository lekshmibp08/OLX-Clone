import React, { createContext, useState, useContext } from "react";

// 1. Create a Context
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: "Alice", age: 30 });

  return (
    // 2. Wrap component tree with Provider
    <UserContext.Provider value={user}>
      <ChildComponent />
    </UserContext.Provider>
  );
}

function ChildComponent() {
  return <GrandchildComponent />;
}
function GrandchildComponent() {
  // 3. Consume the context using useContext hook
  const user = useContext(UserContext);
  return <h1>Hello, {user.name}!</h1>;
}
export default App;