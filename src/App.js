import React, { useState, useEffect } from "react";
import './App.css';
import Board from "./components/Board/Board";
import Editable from "./components/Editable/Editable";

function App() {
  const [target, setTarget] = useState({
    cid: "",
    bid: ""
  })

  const [boards, setBoards] = useState([
    // {
    //   id: Date.now() + Math.random() * 2,
    //   title: "To Do",
    //   cards: [
    //     {
    //       id: Date.now() + Math.random() * 2,
    //       title: "Card 1",
    //       tasks: [],
    //       labels: [{
    //         text: "FrontEnd",
    //         color: "blue"
    //       }],
    //       desc: "dkslkfjks dfh",
    //       date: ""
    //     },
    //     {
    //       id: Date.now() + Math.random() * 2,
    //       title: "Card 2",
    //       tasks: [],
    //       labels: [{
    //         text: "BackEnd",
    //         color: "brown"
    //       }],
    //       desc: "dkslkfjks dfh",
    //       date: ""
    //     },
    //   ]
    // }
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
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  }

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
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

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid
    })
  }

  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex(item => (item.id === bid));
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex].cards.findIndex(item => (item.id === cid));
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex(item => (item.id === target.bid));
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex].cards.findIndex(item => (item.id === target.cid));
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoards);
  }

  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex(item => (item.id === bid));
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex(item => (item.id === cid));
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  }

  // This is to store the board informations in localstorage
  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards])

  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban</h2>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item) => (
            <Board key={item.id} board={item}
              removeBoard={(bid) => removeBoard(bid)}
              addCard={(title, bid) => addCard(title, bid)}
              removeCard={(cid, bid) => removeCard(cid, bid)}
              handleDragEnter={(cid, bid) => handleDragEnter(cid, bid)}
              handleDragEnd={(cid, bid) => handleDragEnd(cid, bid)}
              updateCard={updateCard} />
          ))}
          <div className="add_boards_board">
            <Editable onSubmit={(value) => addBoard(value)} displayClass="add_boards_board_add" text="Add Board" placeholder="Enter board title" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;