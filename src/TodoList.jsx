import { useState } from "react";
import "./TodoList.css";

export function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.items.map((item) => (
        <TodoListItem
          key={item.id}
          item={item}
          currentFilter={props.currentFilter}
          onDelete={() => {
            props.onDelete(item.id);
          }}
          onCheck={() => {
            props.onCheck(item.id);
          }}
          onSwitchInputToText={(string) => {
            props.onSwitchInputToText(item.id, string);
          }}
          onSwitchTextToInput={() => {
            props.onSwitchTextToInput(item.id);
          }}
        />
      ))}
    </ul>
  );
}

function TodoListItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState("");

  let listItemClass = "todo-list__item";
  let listItemText = "todo-list__item-text";
  let listItemInputClass = "todo-list__item-input";

  if (
    (props.currentFilter === "active" && props.item.isCompleted) ||
    (props.currentFilter === "completed" && !props.item.isCompleted)
  ) {
    listItemClass += " todo-list__item--hiding";
  }
  if (props.item.isCompleted) {
    listItemText += " todo-list__item-checked";
  }
  if (isEditing) {
    listItemText += " todo-list--switch";
  } else {
    listItemInputClass += " todo-list--switch";
  }
  if (props)
    return (
      <li className={listItemClass}>
        <div className="todo-list__item-left">
          <button
            className="todo-list__item-check-button"
            onClick={props.onCheck}
          >
            {props.item.isCompleted ? "✔️" : ""}
          </button>
          <div
            className={listItemText}
            onDoubleClick={() => {
              setIsEditing(true);
            }}
          >
            {props.item.text}
          </div>
          <input
            className={listItemInputClass}
            type="text"
            onChange={(e) => props.onSwitchInputToText(e.target.value)}
            value={props.item.text}
            onBlur={() => {
              setIsEditing(false);
            }}
          />
        </div>
        <button className="todo-list__delete-button" onClick={props.onDelete}>
          X
        </button>
      </li>
    );
}
