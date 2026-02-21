import { useState } from "react";
import Card from "./data";
import type React from "react";

type Item = {
  id: string;
  text: string;
  done: boolean;
};
type Filter = "all" | "active" | "done";

const App = () => {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Item[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const filteredData = data.filter((i) => {
    if (filter === "active") return !i.done;
    if (filter === "done") return i.done;
    return true;
  });

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
          {filteredData.map((item) => (
            <Card
              key={item.id}
              item={item}
              onDelete={handleDele}
              onToggle={toggleDone}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 w-[70%] flex items-center justify-between border rounded-md px-4 py-3 bg-gray-50">
        {/* LEFT SIDE — COUNTS */}
        <div className="flex items-center gap-4 text-sm">
          <span className="px-3 py-1 rounded-full bg-white border">
            Active: <b>{activeCount}</b>
          </span>

          <span className="px-3 py-1 rounded-full bg-white border">
            Done: <b>{doneCount}</b>
          </span>
        </div>

        {/* RIGHT SIDE — FILTER BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-sm transition ${
              filter === "all"
                ? "bg-black text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-md text-sm transition ${
              filter === "active"
                ? "bg-black text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setFilter("done")}
            className={`px-3 py-1 rounded-md text-sm transition ${
              filter === "done"
                ? "bg-black text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
