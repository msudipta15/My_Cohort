import axios from "axios";
import { title } from "process";

async function getBlogs() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/"
  );
  return response.data;
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div>
      {blogs.map((blog: todo) => (
        <Todo title={blog.title} completed={blog.completed} />
      ))}
    </div>
  );
}

interface todo {
  title: String;
  completed: Boolean;
}

function Todo({ title, completed }: todo) {
  return (
    <div>
      {title} {completed ? "done" : "Not done"}
    </div>
  );
}
