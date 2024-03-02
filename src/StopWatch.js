import React, { useState, useEffect, useContext, createContext } from "react";

const StopWatchContext = createContext();

export const StopWatchProvider = ({ children }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    const reset = () => {
        setTime(0);
    };

    const contextValue = {
        time,
        isRunning,
        startAndStop,
        reset,
    };

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 100);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

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