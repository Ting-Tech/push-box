import './Game.css';
import { BoardList } from './BoardList.js';
import { useState, useEffect, useCallback } from 'react';
import { GiBrickWall } from "react-icons/gi";
import { FaDropbox } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { FaFlag } from "react-icons/fa";
import { useStopWatch } from './StopWatch';
import { useGameContext } from "./GameProvider";
import { useRank } from "./Rank.js"

function GameBoard() {
    const [Level, setLevel] = useState(0);
    const [Board, setBoard] = useState(BoardList[Level].board);
    const [Point, setPoint] = useState(BoardList[Level].dotPos);
    const [PlayerPos, setPlayerPos] = useState(BoardList[Level].initPlayerPos);
    const { isRunning, startAndStop } = useStopWatch();
    const { stopWatchTimevalue } = useGameContext();
    const { addRank } = useRank();

    const setPlayerPosTest = (pos) => {
        // console.log(pos);
        setPlayerPos(pos);
    }

    let newBoard = Board.slice(); // 先複製舊的板面
    const status = calStatus(Board, Level);

    const handleKey = useCallback((event) => {
        if (!isRunning) {
            startAndStop();
        }
        // console.log(event.key);
        let [newX, newY] = PlayerPos;
        let [deltaX, deltaY] = [0, 0];
        if ((status === " Win!")) {
            let nextLevel = Level + 1;
            startAndStop();
            if (nextLevel < (BoardList.length)) {
                let newBoard = BoardList[nextLevel].board.slice(); // 先複製舊的板面
                console.log("level up");
                setLevel(nextLevel);
                newBoard[PlayerPos[0]][PlayerPos[1]] = 2;
                newBoard[BoardList[nextLevel].initPlayerPos[0]]
                [BoardList[nextLevel].initPlayerPos[1]] = 1;
                setPlayerPosTest(BoardList[nextLevel].initPlayerPos);
                setPoint(BoardList[nextLevel].dotPos);
                setBoard(newBoard);
            }
            else {
                addRank("player1", (stopWatchTimevalue / 10));
                console.log(stopWatchTimevalue / 10);
            }
        }
        else {
            if ((Level <= (BoardList.length - 1)) & status !== " Win!") {
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

                switch (newBoard[newX][newY]) {
                    case 2:
                        newBoard[newX][newY] = 1;
                        newBoard[PlayerPos[0]][PlayerPos[1]] = 2;
                        reductFlag();
                        setPlayerPosTest([newX, newY]);
                        setBoard(newBoard);
                        break;
                    case 3:
                        let [nextX, nextY] = [0, 0];
                        nextX = newX + deltaX;
                        nextY = newY + deltaY;
                        if (newBoard[nextX][nextY] !== 0 & newBoard[nextX][nextY] !== 3) {
                            newBoard[newX][newY] = 1;
                            newBoard[nextX][nextY] = 3;
                            newBoard[PlayerPos[0]][PlayerPos[1]] = 2;
                            reductFlag();
                            setBoard(newBoard);
                            setPlayerPosTest([newX, newY]);
                        }
                        break;
                    case 4:
                        newBoard[newX][newY] = 1;
                        newBoard[PlayerPos[0]][PlayerPos[1]] = 2;
                        reductFlag();
                        setBoard(newBoard);
                        setPlayerPosTest([newX, newY]);
                        break;
                    default:
                        break;
                }
            }
        }
    }, [Board, Level, PlayerPos]);

    useEffect(() => {
        // 添加事件監聽器
        document.addEventListener('keydown', handleKey);
        // 在組件卸載時移除監聽器
        return () => {
            document.removeEventListener('keydown', handleKey);
        };
    }, [PlayerPos, handleKey]); // 監聽x,y 是否有變化

    function reductFlag() {
        for (let x = 0; x < Point.length; x++) {
            if (newBoard[Point[x][0]][Point[x][1]] !== 1 & newBoard[Point[x][0]][Point[x][1]] !== 3) {
                newBoard[Point[x][0]][Point[x][1]] = 4;
            }
            setBoard(newBoard);
        }
    }

    return (
        <>
            <div>
                {Board.map((row, rowIdx) => {
                    return (
                        <div key={`row-${rowIdx}`} className="boardRow">
                            {row.map((text, colIdx) => {
                                let component;

                                if (text === 0) {
                                    component = <GiBrickWall key={`Gi-${colIdx}`} className='blockSize' />;
                                } else if (text === 1) {
                                    component = <IoAccessibility key={`Io-${colIdx}`} className='blockSize' />;
                                } else if (text === 2) {
                                    component = <LuDot key={`Lu-${colIdx}`} className='blockSize' />;
                                } else if (text === 3) {
                                    component = <FaDropbox key={`Fa-${colIdx}`} className='blockSize' />;
                                } else if (text === 4) {
                                    component = <FaFlag key={`Fa-${colIdx}`} className='blockSize' />;
                                } else {
                                    // Default case
                                    component = <LuDot key={`Lu-${colIdx}`} className='blockSize' />;
                                }

                                return component;
                            })}
                        </div>)
                })}
            </div>
            <div className="gameStatus">
                <h2>Status:</h2>
                <h2>{status}</h2>
            </div>
            <p>stopWatchTimevalue: {stopWatchTimevalue / 10} sec</p>
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