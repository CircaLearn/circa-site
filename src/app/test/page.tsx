import { checkUserAuth } from "@/lib/auth";

export default async function LibraryPage() {
  const userId = await checkUserAuth(false);

  if (!userId) {
    return (
        <>
        <p>you're not logged in bruv</p>
        </>
    );
  }

  return <div>Welcome back, user {userId}!</div>;
}
