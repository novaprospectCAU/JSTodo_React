import "./TodoInput.css";

export function TodoInput(props) {
  return (
    <input
      className="todo-input"
      type="text"
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={(e) => {
        //1
        if (e.key === "Enter" && !e.isComposing) {
          const string = e.target.value.trim();
          if (string) {
            //2
            props.onAddItem(string);
            e.target.value = "";
          }
        }
      }}
    />
  );
}
