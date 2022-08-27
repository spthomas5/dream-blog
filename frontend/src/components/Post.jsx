export default function Post(props) {
  return (
    <div className="text-center p-10 border-b-2 my-12">
      <h1 className="text-cyan-900 mb-5 text-xl underline">
        {props.entry.title}
      </h1>

      <p className="my-32">{props.entry.text}</p>
    </div>
  );
}
