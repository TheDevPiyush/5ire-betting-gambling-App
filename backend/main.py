from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import random
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

MINE_PROBABILITY = 0.2 
GRID_SIZE = 5

player_minefields = {}

def generate_minefield():
    minefield = []
    for _ in range(GRID_SIZE * GRID_SIZE):
        is_mine = random.random() < MINE_PROBABILITY
        minefield.append("💣" if is_mine else "✅")
    return minefield

def is_valid_wallet_address(address: str) -> bool:
    return re.match(r"^0x[a-fA-F0-9]{40}$", address) is not None


@app.post("/start-game/{wallet_address}")
def start_game(wallet_address: str):
    
    if not is_valid_wallet_address(wallet_address):
        raise HTTPException(status_code=400, detail="Invalid wallet address")

    player_minefields[wallet_address] = generate_minefield()  # Store the minefield
    return {"message": "Game started", "wallet_address": wallet_address}


@app.get("/tile/{wallet_address}/{index}")
def get_tile(wallet_address: str, index: int):
    if not is_valid_wallet_address(wallet_address):
        raise HTTPException(status_code=400, detail="Invalid wallet address")

    if wallet_address not in player_minefields:
        raise HTTPException(status_code=404, detail="Player not found")

    if index < 0 or index >= len(player_minefields[wallet_address]):
        raise HTTPException(status_code=400, detail="Invalid tile index")

    return {"content": player_minefields[wallet_address][index]}


@app.get("/reveal-all/{wallet_address}")
def reveal_all(wallet_address: str):
    if not is_valid_wallet_address(wallet_address):
        raise HTTPException(status_code=400, detail="Invalid wallet address")
    if wallet_address not in player_minefields:
        raise HTTPException(status_code=404, detail="Player not found")

    return {"minefield": player_minefields[wallet_address]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)