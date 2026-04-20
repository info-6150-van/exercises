import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>NextApp</div>

      <div style={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/todos">Todos</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #eee",
    background: "white",
    marginBottom: "20px",
  },
  logo: {
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "16px",
  },
};