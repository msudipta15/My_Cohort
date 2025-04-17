import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex text-4xl items-center justify-center">
      <div>
        Todo Application
        <br />
        <div className="flex justify-center items-center">
          <Link href="/signin" className="p-3 text-lg">
            Sign in
          </Link>
          <Link href="/signup" className="p-3 text-lg">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
