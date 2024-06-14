import { auth } from "@/auth";
import LandingPage from "@/components/home/LandingPage";
import { getUserFromDb } from "@/queries/user";

export default async function Home() {
  const session = await auth();
  const user = await getUserFromDb(session?.user?.email as string);
  return (
    <>
      <LandingPage user={user} />
    </>
  );
}
