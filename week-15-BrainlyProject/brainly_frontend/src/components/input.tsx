export function Input({
  placeholder,
  reference,
}: {
  placeholder: String;
  reference: any;
}) {
  return (
    <div className="bg-white ">
      <input
        type="text"
        ref={reference}
        placeholder={placeholder}
        className=" w-full px-6  mb-3 py-2 rounded-md  border border-slate-300 hover:border-blue-500 "
      />
    </div>
  );
}
