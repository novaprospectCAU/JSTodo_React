import { useState } from "react";
import "./App.css";
import { Item } from "./types.ts";

import { TodoInput } from "./TodoInput.tsx";
import { TodoList } from "./TodoList.tsx";
import { Toolbar } from "./Toolbar.tsx";
import { CheckAllButton } from "./CheckAll.tsx";

let lastUsedId = 0;

function getNextId(): number {
  return lastUsedId++;
}

export function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  return (
    <div className="main">
      <div className="todo">
        <CheckAllButton
          items={items}
          onToggleAll={() => {
            if (items.some((item: Item) => !item.isCompleted)) {
              setItems(
                items.map((item: Item) =>
                  item.isCompleted === false
                    ? {
                        ...item,
                        isCompleted: !item.isCompleted,
                      }
                    : item
                )
              );
            } else {
              setItems(
                items.map((item: Item) =>
                  item.isCompleted === true
                    ? {
                        ...item,
                        isCompleted: !item.isCompleted,
                      }
                    : item
                )
              );
            }
          }}
        />
        <TodoInput
          onAddItem={(string: string) => {
            const newItem = {
              id: getNextId(),
              text: string,
              isCompleted: false,
            };
            setItems([newItem, ...items]);
          }}
        />
      </div>
      <TodoList
        items={items}
        currentFilter={currentFilter}
        onDelete={(id: number) => {
          setItems(items.filter((item) => item.id !== id));
        }}
        onCheck={(id: number) => {
          setItems(
            items.map((item: Item) =>
              item.id === id
                ? {
                    ...item,
                    isCompleted: !item.isCompleted,
                  }
                : item
            )
          );
        }}
        onSwitchInputToText={(id: number, string: string) => {
          setItems(
            items.map((item: Item) =>
              item.id === id
                ? {
                    ...item,
                    text: string,
                  }
                : item
            )
          );
        }}
      />
      <Toolbar
        items={items}
        currentFilter={currentFilter}
        onChangeCurrentFilter={(filter: string) => {
          setCurrentFilter(filter);
        }}
        onDeleteCheck={() => {
          setItems(items.filter((item) => !item.isCompleted));
        }}
      />
    </div>
  );
}
