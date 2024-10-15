# Blockchain-Based Escape Room Game

## Overview
This project implements a blockchain-based escape room game using Clarity smart contracts on the Stacks blockchain and a React frontend. Players can solve puzzles, progress through smart contracts, and earn rewards in a decentralized gaming environment.

## Features
- Puzzle-based smart contracts
- Timed challenges with token rewards for the fastest solvers
- Token-based entry fees and prize pools
- Progress tracking through on-chain events
- React-based user interface for game interaction

## Technology Stack
- Clarity: Smart contract language for the Stacks blockchain
- Clarinet: Development environment for Clarity smart contracts
- React: Frontend library for building the user interface
- Vitest: Testing framework for smart contracts and frontend components

## Project Structure
```
├── contracts/
│   └── escape-room.clar
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── EscapeRoomGame.tsx
│   │   └── App.tsx
│   └── package.json
├── tests/
│   └── escape-room.test.ts
├── Clarinet.toml
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- NPM (v6 or later)
- Clarinet (latest version)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blockchain-escape-room.git
   cd blockchain-escape-room
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Clarinet by following the instructions [here](https://github.com/hirosystems/clarinet).

### Running Tests
Run the Vitest test suite:
```
npm test
```

### Deploying the Contract
Deploy the contract to a local Clarinet console:
```
clarinet console
```

### Running the Frontend
Navigate to the frontend directory and start the development server:
```
cd frontend
npm start
```

## How to Play
1. Connect your Stacks wallet to the game interface
2. Pay the entry fee to start the game
3. Solve puzzles by interacting with the smart contract through the UI
4. Complete all puzzles within the time limit to win rewards

## Contributing
We welcome contributions to improve the game! Please follow these steps:
1. Fork the repository
2. Create a new branch for your feature
3. Implement your changes and add tests if necessary
4. Submit a pull request with a clear description of your changes

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or support, please open an issue in the GitHub repository or contact the maintainers directly.

Happy gaming and happy coding!
