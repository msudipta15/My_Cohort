export default function Posts({ params }: any) {
  return <div>{JSON.stringify(params.postid)}</div>;
}
