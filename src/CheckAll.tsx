import { Item } from "./types.ts";
import styles from "./CheckAll.module.css";
import classNames from "classnames";

interface CheckAllButtonProps {
  items: Item[];
  onToggleAll: () => void;
}

export function CheckAllButton(props: CheckAllButtonProps) {
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
