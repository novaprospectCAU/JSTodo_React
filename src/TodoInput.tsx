import { TodoInputProps } from "./App";
import "./TodoInput.css";

export function TodoInput(props: TodoInputProps) {
  return (
    <input
      className="todo-input"
      type="text"
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        //1
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
          const string = e.currentTarget.value.trim();
          if (string) {
            //2
            props.onAddItem(string);
            e.currentTarget.value = "";
          }
        }
      }}
    />
  );
}
