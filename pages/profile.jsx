// pages/profile.jsx
import { getSession, useSession, signOut } from "next-auth/react";

export default function Profile({ session }) {
  // Client-side session (useful for hydration after SSR)
  const { data: clientSession, status } = useSession();
  const activeSession = session || clientSession;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!activeSession) {
    return (
      <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
        <h1>No session found</h1>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {activeSession.user?.name}</p>
      <p><strong>Email:</strong> {activeSession.user?.email}</p>
      <button
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sign out
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
