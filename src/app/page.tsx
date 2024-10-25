"use client";
import GameCard from "@/components/GameCard/GameCard";
import { useEffect, useState } from "react";

interface Game {
  date: string;
  time: string;
  team1: string;
  team2: string;
  outcome: string;
}

export default function Home() {

  const [result, setResult] = useState<Game[]>([]);

  useEffect(() => {
    const getMatch = async () => {
      const response = await fetch('/api/getMatch', {
        method : 'POST',
        body : JSON.stringify({})
      });
      const data = await response.json();
      setResult(data.Games)
    }
    getMatch();
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center">
       {result.map((game, index) => (
          <GameCard
            key={index}
            team1={game.team1} // Extract team1 from the match string
            team2={game.team2} // Extract team2 from the match string
            match_time={game.time} // Assuming these match your API structure
            match_date={game.date}
            outcome={game.outcome}
          />
        ))}
    </div>
  );
}
