import React, { useState } from "react";
import "./style.css";

function ListItem({ item }) {
  const { done, name, future } = item;

  if (done) {
    return <s>{name}</s>;
  }

  if (future) {
    return <i>{name}</i>;
  }

  return <>{name}</>;
}

function ListItemContainer({ item, setDone }) {
  const { id, done } = item;
  return (
    <div onClick={() => setDone(id, !done)}>
      <ListItem item={item} />
    </div>
  );
}

function List({ list, setDone }) {
  return (
    <div>
      {list.map(listItem => (
        <ListItemContainer
          item={listItem}
          setDone={setDone}
          key={listItem.id}
        />
      ))}
    </div>
  );
}

function AddItem({ onAddItem }) {
  const [newItem, setNewItem] = useState("");

  function add() {
    onAddItem(newItem);
    setNewItem("");
  }

  return (
    <div>
      <input
        type="text"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <div onClick={add}>Hozzáadás</div>
    </div>
  );
}

function useCheckoutList() {
  const [index, setIndex] = useState(1);
  const [list, setList] = useState([]);

  function addItem(itemName) {
    const item = {
      id: index,
      name: itemName
    };
    setIndex(prevIndex => prevIndex + 1);

    setList(prevList => [...prevList, item]);
  }

  function setDone(id, done) {
    setList(prevList => {
      return prevList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            done
          };
        } else {
          return item;
        }
      });
    });
  }

  function clearDone() {
    setList(prevList => prevList.filter(item => !item.done));
  }

  return { list, addItem, setDone, clearDone };
}

export default function App() {
  const { list, addItem, setDone, clearDone } = useCheckoutList();

  return (
    <div>
      <h>Todo App</h>
      <AddItem onAddItem={addItem} />
      <List list={list} setDone={setDone} />
      <div onClick={clearDone}>Törlés</div>
    </div>
  );
}
