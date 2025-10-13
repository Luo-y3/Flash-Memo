// client/src/pages/App.tsx
// import LanguageSelector from "../components/ui/LanguageSelector";
import Header from "../components/ui/Header";

// Use for Server Side
// import { useState, useEffect } from "react";
// interface ServerStatus {
//   status: string;
//   service: string;
// }

function App() {
  // Use for Server Side
  // const [data, setData] = useState<ServerStatus | null>(null);
  //
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/status")
  //     .then((res) => res.json())
  //     .then((data: ServerStatus) => setData(data))
  //     .catch((err) => console.error("Could not connect to Rust server:", err));
  // }, []);
  //
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
