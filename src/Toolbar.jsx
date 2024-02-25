import "./Toolbar.css";

export function Toolbar(props) {
  let toolbarClass = "todo-list__menu";

  let filterAllClass = "control-all";
  let filterActiveClass = "control-active";
  let filterCompletedClass = "control-completed";

  let clearButtonClass = "menu-clear";

  if (props.items.length === 0) {
    toolbarClass += " todo-list__menu--hiding";
  }

  if (props.currentFilter === "all") {
    filterActiveClass += " control-button--inactive";
    filterCompletedClass += " control-button--inactive";
  } else if (props.currentFilter === "active") {
    filterAllClass += " control-button--inactive";
    filterCompletedClass += " control-button--inactive";
  } else {
    filterAllClass += " control-button--inactive";
    filterActiveClass += " control-button--inactive";
  }

  if (!props.items.some((item) => item.isCompleted)) {
    clearButtonClass += " menu-clear--hiding";
  }

  return (
    <div className={toolbarClass}>
      <div className="menu__count">
        {props.items.filter((item) => !item.isCompleted).length} items left
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
