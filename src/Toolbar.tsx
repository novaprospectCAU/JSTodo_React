import { Item } from "./types.ts";
import styles from "./Toolbar.module.css";
import classNames from "classnames";

interface ToolbarProps {
  items: Item[];
  currentFilter: string;
  onChangeCurrentFilter: (string: string) => void;
  onDeleteCheck: () => void;
}

export function Toolbar(props: ToolbarProps) {
  const toolbarClass = classNames("todo-list__menu", {
    [styles.hiding]: props.items.length === 0,
  });

  const filterAllClass = classNames([styles.all], {
    [styles.inactive]: props.currentFilter !== "all",
  });
  const filterActiveClass = classNames([styles.active], {
    [styles.inactive]: props.currentFilter !== "active",
  });
  const filterCompletedClass = classNames([styles.completed], {
    [styles.inactive]: props.currentFilter !== "completed",
  });

  const clearButtonClass = classNames([styles.clear], {
    [styles.hidden]: !props.items.some((item: Item) => item.isCompleted),
  });

  return (
    <div className={toolbarClass}>
      <div className={styles.count}>
        {props.items.filter((item: Item) => !item.isCompleted).length} items
        left
      </div>
      <div className="menu__control">
        <button
          className={filterAllClass}
          onClick={() => {
            props.onChangeCurrentFilter("all");
          }}
        >
          All
        </button>
        <button
          className={filterActiveClass}
          onClick={() => {
            props.onChangeCurrentFilter("active");
          }}
        >
          Active
        </button>
        <button
          className={filterCompletedClass}
          onClick={() => {
            props.onChangeCurrentFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
      <button
        className={clearButtonClass}
        onClick={() => {
          props.onDeleteCheck();
        }}
      >
        Clear completed
      </button>
    </div>
  );
}
