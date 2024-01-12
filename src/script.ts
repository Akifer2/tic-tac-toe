const tictactoebutton = document.querySelectorAll('.tictactoebutton') as NodeListOf<HTMLButtonElement>;
let board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let rounds: number = 0;

tictactoebutton.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (button.value === '') {
            const row: number = Math.floor(index / 3);
            const col: number = index % 3;

            if (rounds % 2 === 0) {
                button.value = 'X';
                board[row][col] = 'X';
            } else {
                button.value = 'O';
                board[row][col] = 'O';
            }

            rounds++;
            console.log(`round of ${rounds}`);
            checkWinner();
        } else {
            console.log('Este botão já foi selecionado. Escolha outro.');
        }
    });
});

function checkWinner(): void {
    for (let i = 0; i < 3; i++) {
        if (checkRow(i) || checkColumn(i)) {
            console.log(`O jogador ${board[i][0]} venceu!`);
            resetGame();
            return;
        }
    }

    if (checkDiagonals()) {
        console.log(`O jogador ${board[0][0]} venceu!`);
        resetGame();
        return;
    }

    if (rounds === 9) {
        console.log('Empate!');
        resetGame();
    }
}

function checkRow(row: number): boolean {
    return (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]);
}

function checkColumn(col: number): boolean {
    return (board[0][col] !== '' && board[0][col] === board[1][col] && board[1][col] === board[2][col]);
}

function checkDiagonals(): boolean {
    return (
        (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    );
}

function resetGame(): void {
    console.log('Jogo reiniciado!');
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    rounds = 0;

    setTimeout(() => {
        tictactoebutton.forEach((button) => {
            button.value = '';
        });
        console.clear();
    }, 1000);
}
