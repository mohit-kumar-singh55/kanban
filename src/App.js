import React, { useState } from "react";
import './App.css';
import Board from "./components/Board/Board";
import Editable from "./components/Editable/Editable";

function App() {
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random() * 2,
          title: "Card 1",
          tasks: [],
          labels: [{
            text: "FrontEnd",
            color: "blue"
          }],
          desc: "dkslkfjks dfh",
          date: ""
        },
        {
          id: Date.now() + Math.random() * 2,
          title: "Card 2",
          tasks: [],
          labels: [{
            text: "BackEnd",
            color: "brown"
          }],
          desc: "dkslkfjks dfh",
          date: ""
        },
      ]
    }
  ])

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: ""
    }

    const index = boards.findIndex(item => (item.id === bid));
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  }

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex(item => (item.id === bid));
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex(item => (item.id === cid));
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.slice(cIndex, 1);
    setBoards(tempBoards);
  }

  const addBoard = (title) => {
    setBoards([
      {
        ...boards,
        id: Date.now() + Math.random() * 2,
        title,
        cards: [],
      },
    ]);
  }

  const removeBoard = (bid) => {
    const tempBoards = boards.filter(item => item.id !== bid);
    setBoards(tempBoards);
  }

  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban</h2>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item) => (
            <Board key={item.id} board={item} />
          ))}
          <div className="add_boards_board">
            <Editable displayClass="add_boards_board_add" text="Add Board" placeholder="Enter board title" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;