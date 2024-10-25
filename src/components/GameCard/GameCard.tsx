import React from 'react'
import './GameCard.css'

interface GameCardProps{
    team1: string;
    team2: string;
    match_time: string;
    match_date: string;
    outcome: string;
}

const GameCard = ({team1, team2, match_time, match_date, outcome}: GameCardProps) => {
  return (
    <div className="game-card">
        <div className="game-card border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold">{`${team1} vs ${team2}`}</h3>
            <p className="text-gray-600">{`Team1: ${team1}`}</p>
            <p className="text-gray-600">{`Team2: ${team2}`}</p>
            <p className="text-gray-600">{`Date: ${match_date}`}</p>
            <p className="text-gray-600">{`Time: ${match_time}`}</p>
            <p className="text-gray-600">{`Outcome: ${outcome}`}</p>
        </div>
    </div>
  )
}

export default GameCard
