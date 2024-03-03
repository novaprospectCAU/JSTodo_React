import styles from "./CheckAll.module.css";
import classNames from "classnames";

export function CheckAllButton(props) {
  let checkAllButtonClass = classNames(
    styles.checkAll,
    props.items.length === 0
      ? styles.initial
      : props.items.some((item) => !item.isCompleted)
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
