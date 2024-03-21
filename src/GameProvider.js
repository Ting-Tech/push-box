import React, { useState, useContext, createContext } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [stopWatchTimevalue, setStopWatchTimevalue] = useState(0);
    const [rankValue, setRankValue] = useState([]);

    const setRank = (nameScore) => {
        setRankValue(nameScore);
    }

    const setStopWatch = (value) => {
        setStopWatchTimevalue(value);
    }

    const contextValue = {
        stopWatchTimevalue,
        setStopWatch,
        rankValue,
        setRank
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useStopWatch must be used within a StopWatchProvider');
    }
    return context;
};