import { Item } from "./App";
import styles from "./CheckAll.module.css";
import classNames from "classnames";

export function CheckAllButton(props) {
  const checkAllButtonClass = classNames(
    styles.checkAll,
    props.items.length === 0
      ? styles.initial
      : props.items.some((item: Item) => !item.isCompleted)
      ? styles.off
      : styles.on
  );

  return (
    <button
      type="button"
      className={checkAllButtonClass}
      onClick={() => props.onToggleAll()}
    >
      ❯
    </button>
  );
}
