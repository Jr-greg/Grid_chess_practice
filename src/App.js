import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // ⬇️ 定义一个开关，对应后面的if else，打开的时候是x，关闭的时候是o
  const [xIsNext, setXIsNext] = useState(true);
  // 之前每个格子的值在👆的子组件，现在提升到父组件里统一管理了，这个叫组件的状态提升。
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    // ⬇️ 这一步是为了把这次的 true 或者 false 传回到开关，好确定下一次
    setXIsNext(!xIsNext);
  }
  // 如果有人赢了，把赢家返回到这个 winner 变量中。就是最后面那个函数返回的。
  const winner = calculateWinner(squares);
  // 定义一个变量，这里先没给值。下面if else 给。
  let status;
  // 如果winner 有值
  if (winner) {
    // 就显示赢家
    status = "Winner: " + winner;
    // 没有的话
  } else {
    // 就显示下一个谁下 （这一part就叫条件渲染）
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// 定义一个新函数，接受squares数组的内容，用来检查赢没赢
function calculateWinner(squares) {
  // 这一步是把可能赢的位置都写出来，定义成变量
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // 然后For循环，定义一个i，意思是一个检查条数，看检查到哪儿了
  for (let i = 0; i < lines.length; i++) {
    // 定义一个变量，是一个数组里的内容abc，看abc是不是跟上面的某一条获胜位置对上了
    const [a, b, c] = lines[i];
    // 这里是把九个格子中，squares数组号码传进来。如果a号位置有值，而且abc一样，而且符合上一条，那就赢了。
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 然后就是返回赢了的是哪一方
      return squares[a];
    }
  }
  // 没人赢就 null，游戏继续
  return null;
}
