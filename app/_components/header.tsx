import Link from "next/link";
import { useAuth } from "../_hooks/useAuth";
import { User } from "../_lib/types";

const admin: User = { username: "hacker", password: "htn2026" };

const Header = () => {
  const { user, login, logout } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-sky-100 w-screen p-5 h-20 z-1">
      <Link href="/">
        <h1 className="font-bold text-xl">Hackathon Global Inc.</h1>
      </Link>
      <div className="items-center ">
        {user == null ? (
          <button
            className="border rounded-xl px-2 py-1 hover:bg-sky-400 hover:text-sky-100"
            onClick={() => login(admin)}
          >
            Login
          </button>
        ) : (
          <div className="flex flex-wrap gap-5">
            <div className="my-auto">Logged in as: {user.username}</div>
            <button
              className="border rounded-xl px-2 py-1 hover:bg-sky-400 hover:text-sky-100"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
