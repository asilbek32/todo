import { useState } from "react";
import Card from "./data";

type Item = {
  id: string;
  text: string;
  done: boolean;
};

const App = () => {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Item[]>([]);

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    setData((prev) => [
      ...prev,
      { id: crypto.randomUUID(), done: false, text },
    ]);
    setText("");
  };

  const handleDele = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleDone = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const doneCount = data.filter((i) => i.done).length;
  const activeCount = data.length - doneCount;

  return (
    <div className="max-w-[70%] mx-auto">
      <form
        className="w-[70%] flex justify-center items-center gap-3  mt-20"
        onSubmit={add}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-400 w-full rounded-md py-1 outline-none px-2"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded-sm text-white bg-black cursor-pointer"
        >
          add
        </button>
      </form>
      <div className="w-[70%] mt-4">
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <Card
              key={item.id}
              item={item}
              onDelete={handleDele}
              onToggle={toggleDone}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span>Active: {activeCount}</span>
        <span>Done: {doneCount}</span>
      </div>
    </div>
  );
};

export default App;
