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
