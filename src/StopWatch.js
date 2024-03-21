import React, { useState, useEffect, useContext, createContext } from "react";
import { useGameContext } from "./GameProvider";

const StopWatchContext = createContext();

export const StopWatchProvider = ({ children }) => {
    const { stopWatchTimevalue, setStopWatch } = useGameContext();
    const [isRunning, setIsRunning] = useState(false);

    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    const reset = () => {
        setStopWatch(0);
    };

    const contextValue = {
        isRunning,
        startAndStop,
        reset,
    };

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting stopWatchTimevalue from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setStopWatch(stopWatchTimevalue + 1), 100);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, stopWatchTimevalue]);

    return (
        <StopWatchContext.Provider value={contextValue}>
            {children}
        </StopWatchContext.Provider>
    );
};

export const useStopWatch = () => {
    const context = useContext(StopWatchContext);
    if (!context) {
        throw new Error('useStopWatch must be used within a StopWatchProvider');
    }
    return context;
};