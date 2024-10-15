// tests/escape-room.test.ts

import { describe, it, expect, beforeAll } from 'vitest';
import { Clarinet, Tx, Chain, Account, types } from './clarinet-utils';

describe('escape-room', () => {
  let chain: Chain;
  let deployer: Account;
  let player1: Account;
  let player2: Account;
  
  beforeAll(() => {
    chain = new Chain();
    deployer = chain.createAccount('deployer');
    player1 = chain.createAccount('player1');
    player2 = chain.createAccount('player2');
  });
  
  it('should allow the contract owner to initialize the game', () => {
    const block = chain.mineBlock([
      Tx.contractCall('escape-room', 'initialize-game',
          [types.ascii("puzzle1"), types.ascii("puzzle2"), types.ascii("puzzle3")],
          deployer.address
      )
    ]);
    
    expect(block.receipts.length).toBe(1);
    expect(block.height).toBe(2);
    expect(block.receipts[0].result).toBe('(ok true)');
  });
  
  it('should not allow non-owners to initialize the game', () => {
    const block = chain.mineBlock([
      Tx.contractCall('escape-room', 'initialize-game',
          [types.ascii("puzzle1"), types.ascii("puzzle2"), types.ascii("puzzle3")],
          player1.address
      )
    ]);
    
    expect(block.receipts[0].result).toBe('(err u100)');
  });
  
  it('should allow players to start the game', () => {
    // First, initialize the game
    chain.mineBlock([
      Tx.contractCall('escape-room', 'initialize-game',
          [types.ascii("puzzle1"), types.ascii("puzzle2"), types.ascii("puzzle3")],
          deployer.address
      )
    ]);
    
    const block = chain.mineBlock([
      Tx.contractCall('escape-room', 'start-game', [], player1.address)
    ]);
    
    expect(block.receipts[0].result).toBe('(ok true)');
  });
  
  it('should not allow players to start the game without sufficient balance', () => {
    // Assume player2 has insufficient balance
    const block = chain.mineBlock([
      Tx.contractCall('escape-room', 'start-game', [], player2.address)
    ]);
    
    expect(block.receipts[0].result).toBe('(err u102)');
  });
  
  it('should allow players to solve puzzles', () => {
    // Initialize game and start for player1
    chain.mineBlock([
      Tx.contractCall('escape-room', 'initialize-game',
          [types.ascii("puzzle1"), types.ascii("puzzle2"), types.ascii("puzzle3")],
          deployer.address
      ),
      Tx.contractCall('escape-room', 'start-game', [], player1.address)
    ]);
    
    const block = chain.mineBlock([
      Tx.contractCall('escape-room', 'solve-puzzle', [types.ascii("puzzle1")], player1.address)
    ]);
    
    expect(block.receipts[0].result).toBe('(ok true)');
  });
  
  it('should not allow incorrect puzzle solutions', () => {
    const block = chain.mineBlock([
      Tx.contractCall('escape-room', 'solve-puzzle', [types.ascii("wrong-solution")], player1.address)
    ]);
    
    expect(block.receipts[0].result).toBe('(err u103)');
  });
  
  it('should finish the game and distribute rewards when all puzzles are solved', () => {
    // Initialize game and start for player1
    chain.mineBlock([
      Tx.contractCall('escape-room', 'initialize-game',
          [types.ascii("puzzle1"), types.ascii("puzzle2"), types.ascii("puzzle3")],
          deployer.address
      ),
      Tx.contractCall('escape-room', 'start-game', [], player1.address)
    ]);
    
    // Solve all puzzles
    const block = chain.mineBlock([
      Tx.contractCall('escape-room', 'solve-puzzle', [types.ascii("puzzle1")], player1.address),
      Tx.contractCall('escape-room', 'solve-puzzle', [types.ascii("puzzle2")], player1.address),
      Tx.contractCall('escape-room', 'solve-puzzle', [types.ascii("puzzle3")], player1.address)
    ]);
    
    expect(block.receipts[2].result).toBe('(ok true)');
    // You might want to add more specific checks here for token minting and prize distribution
  });
  
  it('should return the correct player progress', () => {
    const result = chain.callReadOnlyFn('escape-room', 'get-player-progress', [types.principal(player1.address)], deployer.address);
    expect(result.result).toBe('u3'); // Assuming player1 solved all 3 puzzles
  });
  
  it('should return the correct prize pool', () => {
    const result = chain.callReadOnlyFn('escape-room', 'get-prize-pool', [], deployer.address);
    // The exact value will depend on how many players have started the game
    expect(result.result).toBe('u100000'); // Assuming one player has started the game
  });
});
