// pages/login.jsx
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (session) {
    // if already logged in, go to profile
    if (typeof window !== "undefined") router.push("/profile");
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // signIn with credentials provider (no redirect, handle result)
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) setError(res.error);
    else router.push("/profile");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>

      <button onClick={() => signIn("google")} className={styles.button}>
        Sign in with Google
      </button>

      <div className={styles.separator}>— or —</div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Sign in with email</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.demo}>
        Demo: any email + password works (we accept it for the POC). In
        production we check a database.
      </p>
    </div>
  );
}
