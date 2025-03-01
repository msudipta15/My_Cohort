import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PostComponent } from "./post";

function App() {
  const [posts, setposts] = useState([]);
  const postComponents = posts.map((post) => {
    return (
      <PostComponent
        name={post.name}
        subtitle={post.subtitle}
        time={post.time}
        image={post.image}
        description={post.description}
      />
    );
  });

  function addpost() {
    // ...posts = everything posts array has + {}
    // x = [1,2,3] y = [...x,4] => y = [1,2,3,4]
    setposts([
      ...posts,
      {
        name: "Rahul",
        subtitle: "560 followers",
        time: "2m ago",
        image:
          "https://img.freepik.com/free-vector/young-prince-vector-illustration_1308-174367.jpg?t=st=1738747598~exp=1738751198~hmac=47663d91ca2ef1693d805713d00cf73cfd82fb9615320c6e185545da926c4613&w=1060",
        description: "Want to learn MERN stack , check out the Cohort 3.0 !",
      },
    ]);
  }
  return (
    <div style={{ height: "100vh", backgroundColor: "#dfe6e9" }}>
      <button onClick={addpost}>Add Post</button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{postComponents}</div>
      </div>
    </div>
  );
}

export default App;
