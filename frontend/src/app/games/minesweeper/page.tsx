"use client"
import React, { useEffect, useState } from 'react'
import MineSweeper from '../_components/MineSweeper'
import { Slider } from "@/components/ui/slider"
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { backendURL } from '@/lib/backendURL';

export default function MineSweeperGamePage() {

    const [amount, setAmount] = useState<null | number>(50);
    const { address, isConnected } = useAccount()

    const [cells, setCells] = useState<Array<string | null>>(Array(25).fill(null));
    const [gameOver, setGameOver] = useState(false);
    const [gameStatus, setGameStatus] = useState("");

    useEffect(() => {
        if (gameOver) {
            setGameStatus("")
        }
    }, [gameOver])

    const startGame = async () => {
        try {
            if (gameOver) {
                setCells(Array(25).fill(null));
                setGameOver(false);
                setGameStatus('')
            }
            const response = await fetch(`${backendURL}/start-game/${address}`, {
                method: 'POST',
            });
            const data = await response.json();
            console.log(data.message);
            if (data.message === "Game started") {
                setGameStatus("started")
            }
        } catch (error) {
            console.error('Failed to start game:', error);
        }
    };

    const fetchTileContent = async (index: number) => {
        try {
            const response = await fetch(`${backendURL}/tile/${address}/${index}`);
            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error('Failed to fetch tile content:', error);
            return null;
        }
    };

    const fetchAllTiles = async (): Promise<(string[] | null)> => {
        try {
            const response = await fetch(`${backendURL}/reveal-all/${address}`);
            const data = await response.json();
            return data.minefield;
        } catch (error) {
            console.error('Failed to fetch all tiles:', error);
            return null;
        }
    };

    const showAllTiles = async () => {
        setGameOver(true);
        const allTiles = await fetchAllTiles();
        if (allTiles) {
            setCells(allTiles as (string | null)[]);
        }
    }

    const handleClick = async (index: number) => {
        if (cells[index] !== null || gameOver || !address) return;

        const tileContent = await fetchTileContent(index);
        if (!tileContent) return;

        const newCells = [...cells];
        newCells[index] = tileContent as string;
        setCells(newCells);

        if (tileContent === '💣') {
            showAllTiles();
        }
    };


    return (
        <div className='grid grid-cols-2'>
            <div className='w-fit'>
                <MineSweeper
                    cells={cells}
                    gameOver={gameOver}
                    handleClick={handleClick}
                />
            </div>
            <div>
                <h1 className='text-3xl'>5ire Mines</h1>
                <div className='flex flex-col border-b-4 border-muted py-1 my-2 text-sm'>
                    <span className='text-muted-foreground'>
                        Your goal is to bet on finding as many diamonds as you can before hitting a bomb. You can check out any time with your earned profit.
                    </span>
                </div>
                <div className='mt-5 flex select-none flex-col gap-4'>
                    <span className='text-lg flex items-center gap-2 font-bold'>Bet Amount -
                        <span className='bg-accent rounded-sm px-4 py-1'> {amount} <span className='text-sm'> 5ire </span> </span>
                    </span>
                    <Slider
                        className='bg-background'
                        onValueChange={(value) => { setAmount(value[0]) }}
                        defaultValue={[50]}
                        max={1000}
                        step={50}
                    />
                    {gameStatus === "started" ?
                        <Button variant={"outline"} onClick={showAllTiles} disabled={!isConnected} className='text-2xl transition-all mt-5 py-6 font-bold'>
                            Check Out
                        </Button>
                        :
                        <Button onClick={startGame} disabled={!isConnected} className='text-2xl transition-all mt-5 py-6 font-bold'>
                            Bet
                        </Button>}
                </div>
            </div>
        </div>
    )
}
