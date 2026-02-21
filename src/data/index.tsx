type Item = { text: string; id: string; done: boolean };
type CardProps = {
  item: Item;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function Card({ item, onDelete, onToggle }: CardProps) {
  return (
    <div>
      <div className="border rounded-md p-2 flex justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => onToggle(item.id)}
            className="cursor-pointer"
          />

          <span
            className={`transition ${
              item.done ? "line-through text-gray-400" : ""
            }`}
          >
            {item.text}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-blue-500 text-white px-2 rounded-sm cursor-pointer">
            edet
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="bg-red-500 text-white px-2 rounded-sm cursor-pointer"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
