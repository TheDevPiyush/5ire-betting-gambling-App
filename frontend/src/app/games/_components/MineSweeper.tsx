import { Bomb, DiamondIcon } from 'lucide-react';
import React from 'react';


interface MineSweeperProps {
    cells: Array<string | null>
    gameOver: boolean,
    handleClick: (index: number) => {}
}

export default function MineSweeper(
    { cells, gameOver, handleClick }: MineSweeperProps) {

    return (
        <div>
            <div className="grid grid-cols-5 grid-rows-5 gap-1 p-1 rounded-lg shadow-lg">
                {cells.map((cell, index) => (
                    <button
                        key={index}
                        className={`w-24 h-24 flex items-center justify-center text-lg font-bold transition-all duration-200 ${gameOver ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary/30 cursor-pointer'} rounded bg-secondary`}
                        onClick={() => handleClick(index)}
                        disabled={gameOver || cell !== null}>
                        {cell === "✅"
                            ?
                            <DiamondIcon fill='#22c55e' className='w-14 h-14 text-green-500' />
                            :
                            cell === "💣"
                            &&
                            <Bomb className='w-14 h-14 text-red-500' fill='#ef4444' />
                        }
                    </button>
                ))}
            </div>
        </div>
    );
}