import './Game.css';
import { BoardList } from './BoardList.js';
import { useState, useEffect } from 'react';
import { GiBrickWall } from "react-icons/gi";
import { FaDropbox } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { FaFlag } from "react-icons/fa";

function GameBoard() {
    const [Level, setLevel] = useState(0);
    const [Board, setBoard] = useState(BoardList[Level].board);
    const [PlayerPos, setPlayerPos] = useState(BoardList[Level].initPlayerPos);
    let [x, y] = PlayerPos;

    const handleKey = (event) => {
        console.log(event.key);
        let [newX, newY] = PlayerPos;
        let [deltaX, deltaY] = [0, 0];

        switch (event.key) {
            case 'w':
                newX--;
                deltaX--;
                break;
            case 'a':
                newY--;
                deltaY--;
                break;
            case 's':
                newX++;
                deltaX++;
                break;
            case 'd':
                newY++;
                deltaY++;
                break;
            default:
                break;
        }

        let newBoard = Board.slice(); // 先複製舊的板面

        switch (newBoard[newX][newY]) {
            case 2:
                newBoard[newX][newY] = 1;
                newBoard[x][y] = 2;
                setBoard(newBoard);
                setPlayerPos([newX, newY]);
                break;
            case 3:
                let [nextX, nextY] = [0, 0];
                nextX = newX + deltaX;
                nextY = newY + deltaY;
                if (newBoard[nextX][nextY] !== 0 & newBoard[nextX][nextY] !== 3) {
                    newBoard[newX][newY] = 1;
                    newBoard[x][y] = 2;
                    newBoard[nextX][nextY] = 3;
                    setBoard(newBoard);
                    setPlayerPos([newX, newY]);
                }
                break;
            case 4:
                newBoard[newX][newY] = 1;
                newBoard[x][y] = 2;
                setBoard(newBoard);
                setPlayerPos([newX, newY]);
                break;
            default:
                break;
        }

        for (let i = 0; i < BoardList[Level].dotPos.length; i++) {
            let dot = BoardList[Level].dotPos[i];
            if (newBoard[dot[0]][dot[1]] !== 1 &
                newBoard[dot[0]][dot[1]] !== 3) {
                newBoard[dot[0]][dot[1]] = 4;
                setBoard(newBoard);
            }
        }

        // BoardList[Level].dotPos.map((dot) => {
        //     if (newBoard[dot[0]][dot[1]] !== 1 & newBoard[dot[0]][dot[1]] !== 3) {
        //         newBoard[dot[0]][dot[1]] = 4;
        //         setBoard(newBoard);
        //     }
        // })
    }

    useEffect(() => {
        // 添加事件監聽器
        document.addEventListener('keydown', handleKey);
        // 在組件卸載時移除監聽器
        return () => {
            document.removeEventListener('keydown', handleKey);
        };
    }, [x, y]); // 監聽x,y 是否有變化

    const status = calStatus(Board, Level);
    if (status === " Win!") {
        let nextLevel = Level + 1;
        if (nextLevel < BoardList.length) {
            setLevel(nextLevel);
            setBoard(BoardList[nextLevel].board);
            setPlayerPos(BoardList[nextLevel].initPlayerPos);
        }
    }


    return (
        <>
            <div>
                {Board.map((row, rowIdx) => {
                    return (
                        <div key={`row-${rowIdx}`} className="boardRow">{
                            row.map((text, colIdx) => {
                                if (text === 0) {
                                    return <GiBrickWall key={`Gi-${colIdx}`} className='blockSize' />
                                }
                                else if (text === 1) {
                                    return <IoAccessibility key={`Io-${colIdx}`} className='blockSize' />
                                }
                                else if (text === 2) {
                                    return <LuDot key={`Lu-${colIdx}`} className='blockSize' />
                                }
                                else if (text === 3) {
                                    return <FaDropbox key={`Fa-${colIdx}`} className='blockSize' />
                                }
                                else if (text === 4) {
                                    return <FaFlag key={`Fa-${colIdx}`} className='blockSize' />
                                }
                            })}</div>)
                })}
            </div>
            <div className="gameStatus">
                <h2>Status:</h2>
                <h2>{status}</h2>
            </div>
        </>
    );
}

function calStatus(board, level) {
    let allDots = BoardList[level].dotPos;
    let count = 0;
    for (let i = 0; i < allDots.length; i++) {
        if (board[allDots[i][0]][allDots[i][1]] !== 3) {
            count++;
        }
    }
    if (count === 0) {
        return " Win!";
    }
    else {
        return ("remain" + count);
    }
}

function Game() {
    return (
        <div className="game" >
            <h1>Push Box</h1>
            <GameBoard />
        </div>
    );
}

export default Game;