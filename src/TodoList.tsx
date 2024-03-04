import { useState } from "react";
import styles from "./TodoList.module.css";
import classNames from "classnames";
import { Item } from "./types.ts";

interface TodoListProps {
  items: Item[];
  currentFilter: string;
  onDelete: (id: number) => void;
  onCheck: (id: number) => void;
  onSwitchInputToText: (id: number, string: string) => void;
}

interface TodoListItemProps {
  item: Item;
  currentFilter: string;
  onDelete: () => void;
  onCheck: () => void;
  onSwitchInputToText: (string: string) => void;
}

export function TodoList(props: TodoListProps) {
  return (
    <ul className="todo-list">
      {props.items.map((item: Item) => (
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
          onSwitchInputToText={(string: string) => {
            props.onSwitchInputToText(item.id, string);
          }}
        />
      ))}
    </ul>
  );
}

function TodoListItem(props: TodoListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(props.item.text);

  const listItemClass = classNames(styles.todoListItem, {
    [styles.hiding]:
      (props.currentFilter === "active" && props.item.isCompleted) ||
      (props.currentFilter === "completed" && !props.item.isCompleted),
  });

  const listItemText = classNames(styles.text, {
    [styles.checked]: props.item.isCompleted,
    [styles.switch]: isEditing,
  });

  const listItemInputClass = classNames(styles.input, {
    [styles.switch]: !isEditing,
  });

  if (props)
    return (
      <li className={listItemClass}>
        <div className={styles.left}>
          <button className={styles.checkButton} onClick={props.onCheck}>
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
            onChange={(e) => {
              setTempText(e.target.value);
              props.onSwitchInputToText(props.item.text);
            }}
            value={tempText}
            onBlur={() => {
              setIsEditing(false);
              if (tempText !== "") {
                props.onSwitchInputToText(tempText);
              } else {
                props.onSwitchInputToText(props.item.text);
                setTempText(props.item.text);
              }
            }}
          />
        </div>
        <button className={styles.deleteButton} onClick={props.onDelete}>
          X
        </button>
      </li>
    );
}
