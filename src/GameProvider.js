import React, { useState, useContext, createContext, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [stopWatchTimevalue, setStopWatchTimevalue] = useState(0);
    const [rankValue, setRankValue] = useState([]);
    const [user, setUser] = useState();
    const [isFirstRun, setisFirstRun] = useState(true);

    // useEffect(() => setisFirstRun(false), []);

    const setUserValue = (name) => {
        setUser(name);
        setisFirstRun(false);
    }

    const setRank = (nameScore) => {
        setRankValue(nameScore);
    }

    const setStopWatch = (value) => {
        setStopWatchTimevalue(value);
    }

    const setisFirstRunValue = (v) => {
        setisFirstRun(v);
    }

    const contextValue = {
        stopWatchTimevalue,
        setStopWatch,
        rankValue,
        setRank,
        user,
        setUserValue,
        isFirstRun,
        setisFirstRunValue
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