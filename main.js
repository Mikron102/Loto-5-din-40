const board = document.getElementById("board");

const row_count = 4;
const col_count = 10;
const numere_extrase = 5;


document.getElementsByTagName("title")[0].innerHTML = "Simulare joc loto " + numere_extrase + '/' + row_count*col_count;
document.getElementById("titlu").innerHTML = 'Simulare joc loto <span style="color:blue"> ' + numere_extrase + '/' + row_count*col_count + '</span>';

function createBoard() {

    for (let i = 0; i < row_count; i++) {
        const row = document.createElement('h2');  
        row.className = "row";
        board.append(row);
        for (let j = 0; j < col_count; j++) {
            const cell = document.createElement('div');
            cell.className = "cell";
            cell.id = i + "_" + j;
            row.append(cell);
            cell.innerHTML= (i * col_count) + j + 1 ;
            cell.addEventListener('click',function(){
                handleClick(i,j);
            })
        }
    }
}

function handleClick(x, y) {
    let cell = document.getElementById(x + "_" + y);
    if (!cell.classList.contains('selected')) { cell.classList.add('selected');    }
            else {cell.classList.remove('selected')
    }

    if (verificaNumere().length == (numere_extrase - 1)) {document.getElementById("raspuns").innerHTML = 'alege inca un numar si apoi te rog asteapta ...';}
     
    if (verificaNumere().length == numere_extrase) {

        
        const extragere = []; 
        let k = 1;
   
        while (compar(verificaNumere(), extragere) == false) {
          
            //resetare sir extragere pentru alta incercare
            extragere.splice(0,numere_extrase);
            k++;
             for (i = 0; i < numere_extrase; i++){
                nrExt = generareRandom();
                while (extragere.includes(nrExt)) {
                    nrExt = generareRandom();
                }
                extragere.push(nrExt);
            }

            extragere.sort(function(a, b){return a - b});

        }
       document.getElementById("raspuns").innerHTML = 'Au fost necesare <span style="color:red"> ' + k + " </span> extrageri pentru a iesi numerele:" + verificaNumere() + '.';

    }
}

function verificaNumere() {
    const numereAlese = [];
    const myCollection = document.getElementsByTagName("div");
    for (let i = 0; i < myCollection.length; i++) {
        if (myCollection[i].classList.contains('selected')) {numereAlese.push(myCollection[i].innerHTML)};
    }
    return numereAlese;
}

function generareRandom () {
    return Math.floor(Math.random() * row_count * col_count) + 1;
  }

function compar(arr1, arr2) {
    let n = arr1.length;
    let identic = true;
    for (i = 0; i < n; i++) {
        if (arr1[i] != arr2[i]) {identic = false;}
    }
    return identic;
  }

createBoard();