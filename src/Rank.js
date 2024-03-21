import React, { useEffect, useContext, createContext } from 'react';
import { useGameContext } from "./GameProvider";
const LOCAL_STORAGE_KEY = "rank:savedTasks";

const RankContext = createContext();

export const RankProvider = ({ children }) => {
    const { stopWatchTimevalue, rankValue, setRank } = useGameContext();

    function loadSaved() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            setRank(JSON.parse(saved));
        }
    }

    useEffect(() => {
        loadSaved();
    }, [])

    function setTasksAndSave(newRank) {
        setRank(newRank);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRank));
    }

    function addRank(newNameSocre) {
        const newRank = [...rankValue, newNameSocre];
        sortScores(newRank);
        setTasksAndSave(newRank);
    }

    function sortScores(scores) {
        const sortMethod = (a, b) => a.isCompleted;
        scores.sort(sortMethod);
    }

    const contextValue = {
        addRank,
        setTasksAndSave
    };

    return (
        <RankContext.Provider value={contextValue}>
            {children}
        </RankContext.Provider>
    );
};

export const useRank = () => {
    const context = useContext(RankContext);
    if (!context) {
        throw new Error('useRank must be used within a RankProvider');
    }
    return context;
};

export default function () {
    const { rankValue } = useGameContext();

    return rankValue;
}