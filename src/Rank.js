import React, { useState, useEffect } from 'react';
const LOCAL_STORAGE_KEY = "rank:savedTasks";

export default function Rank() {
    const [scores, setScores] = useState([]);

    function loadSaved() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            setScores(JSON.parse(saved));
        }
    }

    useEffect(() => {
        loadSaved();
    }, [])

    function setTasksAndSave(newScores) {
        setScores(newScores);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newScores));
    }

    function addScore(newScore) {
        const newScores = [...scores, newScore];
        sortScores(newScores);
        setTasksAndSave(newScores);
    }

    function sortScores(scores) {
        const sortMethod = (a, b) => a.isCompleted;
        scores.sort(sortMethod);
    }

    return (
        <div>
            {scores}
        </div>
    )
}