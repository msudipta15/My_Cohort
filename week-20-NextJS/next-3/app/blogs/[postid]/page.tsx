export default function Blogs({ params }: any) {
  const postid = params.postid;

  return <div>Welcome to the Blog Page - {postid}</div>;
}
