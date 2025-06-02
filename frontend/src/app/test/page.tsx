import { ClerkProvider } from "@clerk/nextjs";
import { SignIntest } from "./components/SignIn";
import { SignUptest } from "./components/SignUp";
import { Map } from "./components/Map";
import { Nav } from "@/components/Nav";

function MyApp() {
  return (
    <div>
      <Nav />
      <Map />
    </div>
  );
}

export default MyApp;
