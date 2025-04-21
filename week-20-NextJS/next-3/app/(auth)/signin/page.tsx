// (auth) will be ignored because of this (auth), this is called "route group"
// localhost:3000/signin

export default function Signin() {
  return (
    <div>
      <div>
        username
        <input type="text" className="bg-white" />
      </div>
      <div>
        password
        <input type="text" className="bg-white" />
      </div>
      <div>
        <button>Sign in</button>
      </div>
    </div>
  );
}
