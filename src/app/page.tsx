import Navbar from "@/components/navigation/Navbar";
import { ModeToggle } from "@/components/theme/ModeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        Hello
      </main>
    </>
  );
}
