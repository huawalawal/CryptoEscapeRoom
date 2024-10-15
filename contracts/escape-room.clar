;; escape-room.clar

;; Define constants
(define-constant contract-owner tx-sender)
(define-constant entry-fee u100000) ;; 0.1 STX
(define-constant game-duration u3600) ;; 1 hour in seconds

;; Define data vars
(define-data-var current-puzzle uint u1)
(define-data-var game-start-time uint u0)
(define-data-var prize-pool uint u0)

;; Define data maps
(define-map player-progress principal uint)
(define-map puzzles uint (string-ascii 256))

;; Define fungible token
(define-fungible-token escape-token u1000000)

;; Error codes
(define-constant err-not-owner (err u100))
(define-constant err-game-in-progress (err u101))
(define-constant err-insufficient-balance (err u102))
(define-constant err-incorrect-solution (err u103))
(define-constant err-game-not-started (err u104))

;; Initialize game
(define-public (initialize-game (puzzle-1 (string-ascii 256)) (puzzle-2 (string-ascii 256)) (puzzle-3 (string-ascii 256)))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-not-owner)
        (asserts! (is-eq (var-get game-start-time) u0) err-game-in-progress)
        (map-set puzzles u1 puzzle-1)
        (map-set puzzles u2 puzzle-2)
        (map-set puzzles u3 puzzle-3)
        (var-set current-puzzle u1)
        (var-set game-start-time block-height)
        (ok true)))

;; Start game
(define-public (start-game)
    (begin
        (asserts! (>= (stx-get-balance tx-sender) entry-fee) err-insufficient-balance)
        (try! (stx-transfer? entry-fee tx-sender (as-contract tx-sender)))
        (var-set prize-pool (+ (var-get prize-pool) entry-fee))
        (map-set player-progress tx-sender u1)
        (ok true)))
