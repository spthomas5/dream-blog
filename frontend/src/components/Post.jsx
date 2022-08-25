export default function Post(props) {
  return (
    <div className="text-center p-10 border-b-2 my-12">
      <h1 className="text-cyan-900 mb-36 text-xl">{props.entry.title}</h1>
      <p className="">{props.entry.text}</p>
    </div>
  );
}
