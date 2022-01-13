import React from "react";
import './App.css';
import Board from "./components/Board/Board";
import Editable from "./components/Editable/Editable";

function App() {
  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban</h2>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          <Board />
          <Board />
          <div className="add_boards_board">
            <Editable displayClass="add_boards_board_add" text="Add Board" placeholder="Enter board title" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;