import "./CheckAll.css";

export function CheckAllButton(props) {
  let checkAllButtonClass = "check-all";
  if (props.items.length === 0) {
    checkAllButtonClass += " check-all--initial";
  } else if (props.items.some((item) => !item.isCompleted)) {
    checkAllButtonClass += " check-all--off";
    // isCheckedAll = false;
  } else {
    checkAllButtonClass += " check-all--on";
  }
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
