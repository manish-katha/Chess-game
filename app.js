const gameboard = document.querySelector('#gameboard');
const player = document.querySelector('#player');
const infodisplay = document.querySelector('#info-display');
const width = 8;
let playergo = 'white';
player.textContent = 'white';

const startpiece = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];

function createboard() {
    startpiece.forEach((startpiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startpiece;
        square.firstChild?.setAttribute('draggable', true);
        square.setAttribute("square-id", i);

        const row = Math.floor((63 - i) / 8 + 1);
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown");
        }
        else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige");
        }

        if (i <= 15) {
            square.firstChild.firstChild.classList.add('white');
        }

        if (i >= 48) {
            square.firstChild.firstChild.classList.add('black');
        }
        gameboard.append(square);
    });

}
createboard();


const allsquare = document.querySelectorAll(".square");

allsquare.forEach((square) => {
    square.addEventListener('dragstart', dragstart);
    square.addEventListener('dragover', dragover);
    square.addEventListener('drop', droped);
})
let startpos;
let dragelement;
function dragstart(e) {
    startpos = e.target.parentNode.getAttribute('square-id');
    dragelement = e.target;
}


function dragover(e) {
    e.preventDefault();
}

function droped(e) {
    e.stopPropagation();
    const correctgo = dragelement.firstChild.classList.contains(playergo);
    const taken = e.target.classList.contains('piece');
    const valid = checkifvalid(e.target);
    const opponentgo = playergo === 'black' ? 'white' : 'black';
    const takenbyopponent = e.target.firstChild?.classList.contains(opponentgo);



    if (correctgo) {
        if (takenbyopponent && valid) {
            e.target.parentNode.append(dragelement);
            e.target.remove();
            console.log("its working");
            checkforwin()
            changeplayer();
            return;
        }

        if (taken) {
            infodisplay.textContent = " - Invalid Move";
            setTimeout(() => infodisplay.textContent = "", 2000)
            return;
        }
        if (valid) {
            e.target.append(dragelement);
            checkforwin();
            changeplayer();
            return;
        }
    }


}
function changeplayer() {
    if (playergo === 'white') {
        playergo = 'black';
        reverseid()
        player.textContent = 'Black';
    }
    else {
        playergo = 'white';
        revertid()
        player.textContent = 'White';

    }
}

function reverseid() {
    const allsquare = document.querySelectorAll(".square");
    allsquare.forEach((square, i) => {
        square.setAttribute('square-id', (width * width - 1) - i);
    })
}
function revertid() {
    const allsquare = document.querySelectorAll(".square");
    allsquare.forEach((square, i) => {
        square.setAttribute('square-id', i);
    })
}

function checkifvalid(target) {
    const targetid = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startid = Number(startpos);
    const piece = dragelement.id;
    console.log('targetid', targetid);
    console.log('startid', startid);
    console.log('piece', piece);

    switch (piece) {
        case 'pawn':
            const starterrow = [8, 9, 10, 11, 12, 13, 14, 15];
            if (
                starterrow.includes(startid) && startid + width * 2 === targetid ||
                startid + width === targetid ||
                startid + width - 1 === targetid && document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild ||
                startid + width + 1 === targetid && document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild
            ) {
                return true;
            }
            break;
        case 'knight':
            if (
                startid + width * 2 + 1 === targetid ||
                startid + width * 2 - 1 === targetid ||
                startid + width - 2 === targetid ||
                startid + width + 2 === targetid ||
                startid - width * 2 + 1 === targetid ||
                startid - width * 2 - 1 === targetid ||
                startid - width - 2 === targetid ||
                startid - width + 2 === targetid
            ) {
                return true;
            }
            break;

        case 'bishop':
            if (
                startid + width + 1 === targetid ||
                startid + width * 2 + 2 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild ||
                startid + width * 3 + 3 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild ||
                startid + width * 4 + 4 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild ||
                startid + width * 5 + 5 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild ||
                startid + width * 6 + 6 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 + 5}"]`).firstChild ||
                startid + width * 7 + 7 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 + 6}"]`).firstChild ||
                startid + width * 8 + 8 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 7 + 7}"]`).firstChild ||

                startid + width - 1 === targetid ||
                startid + width * 2 - 2 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild ||
                startid + width * 3 - 3 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild ||
                startid + width * 4 - 4 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild ||
                startid + width * 5 - 5 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild ||
                startid + width * 6 - 6 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 - 5}"]`).firstChild ||
                startid + width * 7 - 7 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 - 6}"]`).firstChild ||
                startid + width * 8 - 8 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 7 - 7}"]`).firstChild ||

                startid - width + 1 === targetid ||
                startid - width * 2 + 2 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild ||
                startid - width * 3 + 3 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild ||
                startid - width * 4 + 4 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild ||
                startid - width * 5 + 5 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild ||
                startid - width * 6 + 6 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 + 5}"]`).firstChild ||
                startid - width * 7 + 7 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 + 6}"]`).firstChild ||
                startid - width * 8 + 8 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 7 + 7}"]`).firstChild ||

                startid - width - 1 === targetid ||
                startid - width * 2 - 2 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild ||
                startid - width * 3 - 3 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild ||
                startid - width * 4 - 4 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild ||
                startid - width * 5 - 5 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild ||
                startid - width * 6 - 6 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 - 5}"]`).firstChild ||
                startid - width * 7 - 7 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 - 6}"]`).firstChild ||
                startid - width * 8 - 8 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 7 - 7}"]`).firstChild

            ) {
                return true;
            }
            break;

        case 'rook':
            if (
                startid + width === targetid ||
                startid + width * 2 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild ||
                startid + width * 3 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild ||
                startid + width * 4 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild ||
                startid + width * 5 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild ||
                startid + width * 6 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5}"]`).firstChild ||
                startid + width * 7 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6}"]`).firstChild ||
                startid + width * 8 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 7}"]`).firstChild ||

                startid + 1 === targetid ||
                startid + 2 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild ||
                startid + 3 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild ||
                startid + 4 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild ||
                startid + 5 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild ||
                startid + 6 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 5}"]`).firstChild ||
                startid + 7 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 6}"]`).firstChild ||
                startid + 8 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 7}"]`).firstChild ||

                startid - width === targetid ||
                startid - width * 2 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild ||
                startid - width * 3 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild ||
                startid - width * 4 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild ||
                startid - width * 5 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild ||
                startid - width * 6 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5}"]`).firstChild ||
                startid - width * 7 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6}"]`).firstChild ||
                startid - width * 8 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 7}"]`).firstChild ||

                startid - 1 === targetid ||
                startid - 2 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild ||
                startid - 3 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild ||
                startid - 4 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild ||
                startid - 5 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild ||
                startid - 6 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 5}"]`).firstChild ||
                startid - 7 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 6}"]`).firstChild ||
                startid - 8 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 7}"]`).firstChild

            ) {
                return true;
            }
            break;

        case 'queen':
            if (
                startid + width === targetid ||
                startid + width * 2 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild ||
                startid + width * 3 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild ||
                startid + width * 4 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild ||
                startid + width * 5 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild ||
                startid + width * 6 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5}"]`).firstChild ||
                startid + width * 7 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6}"]`).firstChild ||
                startid + width * 8 === targetid && !document.querySelector(`[square-id = "${startid + width}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 7}"]`).firstChild ||

                startid + 1 === targetid ||
                startid + 2 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild ||
                startid + 3 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild ||
                startid + 4 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild ||
                startid + 5 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild ||
                startid + 6 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 5}"]`).firstChild ||
                startid + 7 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 6}"]`).firstChild ||
                startid + 8 === targetid && !document.querySelector(`[square-id = "${startid + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + 7}"]`).firstChild ||

                startid - width === targetid ||
                startid - width * 2 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild ||
                startid - width * 3 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild ||
                startid - width * 4 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild ||
                startid - width * 5 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild ||
                startid - width * 6 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5}"]`).firstChild ||
                startid - width * 7 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6}"]`).firstChild ||
                startid - width * 8 === targetid && !document.querySelector(`[square-id = "${startid - width}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 7}"]`).firstChild ||

                startid - 1 === targetid ||
                startid - 2 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild ||
                startid - 3 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild ||
                startid - 4 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild ||
                startid - 5 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild ||
                startid - 6 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 5}"]`).firstChild ||
                startid - 7 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 6}"]`).firstChild ||
                startid - 8 === targetid && !document.querySelector(`[square-id = "${startid - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - 7}"]`).firstChild ||

                startid + width + 1 === targetid ||
                startid + width * 2 + 2 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild ||
                startid + width * 3 + 3 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild ||
                startid + width * 4 + 4 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild ||
                startid + width * 5 + 5 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild ||
                startid + width * 6 + 6 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 + 5}"]`).firstChild ||
                startid + width * 7 + 7 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 + 6}"]`).firstChild ||
                startid + width * 8 + 8 === targetid && !document.querySelector(`[square-id = "${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 7 + 7}"]`).firstChild ||

                startid + width - 1 === targetid ||
                startid + width * 2 - 2 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild ||
                startid + width * 3 - 3 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild ||
                startid + width * 4 - 4 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild ||
                startid + width * 5 - 5 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild ||
                startid + width * 6 - 6 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 - 5}"]`).firstChild ||
                startid + width * 7 - 7 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 - 6}"]`).firstChild ||
                startid + width * 8 - 8 === targetid && !document.querySelector(`[square-id = "${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid + width * 7 - 7}"]`).firstChild ||

                startid - width + 1 === targetid ||
                startid - width * 2 + 2 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild ||
                startid - width * 3 + 3 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild ||
                startid - width * 4 + 4 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild ||
                startid - width * 5 + 5 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild ||
                startid - width * 6 + 6 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 + 5}"]`).firstChild ||
                startid - width * 7 + 7 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 + 6}"]`).firstChild ||
                startid - width * 8 + 8 === targetid && !document.querySelector(`[square-id = "${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 7 + 7}"]`).firstChild ||

                startid - width - 1 === targetid ||
                startid - width * 2 - 2 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild ||
                startid - width * 3 - 3 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild ||
                startid - width * 4 - 4 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild ||
                startid - width * 5 - 5 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild ||
                startid - width * 6 - 6 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 - 5}"]`).firstChild ||
                startid - width * 7 - 7 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 - 6}"]`).firstChild ||
                startid - width * 8 - 8 === targetid && !document.querySelector(`[square-id = "${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id = "${startid - width * 7 - 7}"]`).firstChild

            ) {
                return true;
            }
            break;

            case 'king':
                if(
                    startid + 1 === targetid ||
                    startid -1 === targetid ||
                    startid + width === targetid ||
                    startid - width === targetid ||
                    startid + width +1 === targetid ||
                    startid - width -1 === targetid ||
                    startid + width -1 === targetid ||
                    startid - width +1 === targetid
                )
                {
                    return true ;
                }
                break;
    }
}


function checkforwin(){
    const king = Array.from(document.querySelectorAll('#king'))

    if(!king.some(king=> king.firstChild.classList.contains('black'))){
        infodisplay.innerHTML  =  " - White player wins";
        const allsquare= document.querySelectorAll('.square')
        allsquare.forEach(square=>square.firstChild?.setAttribute('draggable',false));
    }
    
    if(!king.some(king=> king.firstChild.classList.contains('white'))){
        infodisplay.innerHTML  =  " - Black player wins";
        const allsquare= document.querySelectorAll('.square')
        allsquare.forEach(square=>square.firstChild?.setAttribute('draggable',false));
    }
}