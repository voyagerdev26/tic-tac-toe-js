let boxes=document.querySelectorAll(".col");
let currPlayer; // lets suppose first start with X 
// take a data structure to maintain which box has what value and you can write logic using that data structure to see status of ui tictactoe
let arr= new Array(9).fill(null);
let h1=document.querySelector("h1");

let startBtn = document.getElementById("startBtn");
let count=0;

let player1, player2;
let symbols = {}; // {name: symbol}

// start game
startBtn.addEventListener('click',()=>{
  let p1=document.getElementById("p1").value.trim();
  let p2=document.getElementById("p2").value.trim();
  
  if(!p1 || !p2){
    alert('Enter Both Names!');
    return;
  }
  player1=p1;
  player2=p2;

  // hide setup when game starts
  document.getElementById("setupDiv").style.display = "none";
  
  toss();
  enableBoard();
})

// Toss logic
function toss(){
  // assign X or O randomly
  if(Math.random()<0.5){
    symbols[player1]="X";
    symbols[player2]="O";
  }
  else{
    symbols[player2]="X";
    symbols[player1]="O";
    
  }
  
  // random first turn
  currPlayer= Math.random()<0.5? player1:player2;
  h1.innerText=`${currPlayer}'s turn (${symbols[currPlayer]})`;
}

// enable Clicks
function enableBoard(){
  boxes.forEach(box=>{
    box.addEventListener('click',handleClick);
    box.innerText="";
    box.classList.remove("X","O");
    box.style.cursor="pointer";
  })
  arr.fill(null);
  count=0;

}

// click handler

function handleClick(e){
  let box=e.target;
  let index=+box.id;
  // check if already user clicked that box so vo dubara update na ho
  if(arr[index]!==null) return;

  let symbol= symbols[currPlayer];
  arr[index]=symbol;
  box.innerText=symbol;
  box.classList.add(symbol);

  count++;

  // console.log(box);
  if(count>=5 && checkWinner()){// then any winner can exist
    h1.innerText=`${currPlayer} Wins! 🎉`;
    endGame();
    return;
  }

  if(!arr.some(e=>e===null)){
    h1.innerText="It's a Draw!";
    endGame();
    return;
  }
  

  // switch player

  currPlayer= currPlayer===player1?player2:player1;
  h1.innerText = `${currPlayer}'s turn (${symbols[currPlayer]})`;


}

// Winner check
function checkWinner(){
  // if((arr[0]!==null && arr[0]==arr[1] && arr[1]==arr[2]) ||
  //     (arr[3]!==null && arr[3]==arr[4] && arr[4]==arr[5]) ||
  //     (arr[6]!==null && arr[6]==arr[7] && arr[7]==arr[8]) ||
  //     (arr[0]!==null && arr[0]==arr[3] && arr[3]==arr[6]) ||
  //     (arr[1]!==null && arr[1]==arr[4] && arr[4]==arr[7]) ||
  //     (arr[2]!==null && arr[2]==arr[5] && arr[5]==arr[8]) ||
  //     (arr[0]!==null && arr[0]==arr[4] && arr[4]==arr[8]) ||
  //     (arr[2]!==null && arr[2]==arr[4] && arr[4]==arr[6]) ){

  //       h1.innerText="Winner is there";
  //       boxes.forEach(obj=>{
  //         obj.removeEventListener("click",handleClick);
  //         obj.style.cursor="default";
  //       })
        
        
        
  //     }
  // if(!arr.some(e=>e===null)){
  //   h1.innerText="Its a draw";
  //   boxes.forEach(obj=>{
  //     obj.removeEventListener("click",handleClick);
  //     obj.style.cursor="default";
  //   })
  // }


  // good way 

  let winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(([a,b,c])=>{
    return arr[a] && arr[a]===arr[b] && arr[b]===arr[c];
  })
}


// end game + reset
function endGame() {
  boxes.forEach(box => {
    box.removeEventListener("click", handleClick);
    box.style.cursor = "default";
  });

  setTimeout(() => {
    // enableBoard();
    // toss();
    // document.getElementById('p1').value="";
    // document.getElementById('p2').value="";
    fullReset();
  }, 5000);
}

function fullReset() {
  // clear board
  arr = new Array(9).fill(null);
  count = 0;

  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("X", "O");
    box.removeEventListener("click", handleClick);
    box.style.cursor = "default";
  });

  // clear players
  player1 = null;
  player2 = null;
  symbols = {};
  currPlayer = null;

  // clear inputs
  document.getElementById("p1").value = "";
  document.getElementById("p2").value = "";

  // reset heading
  h1.innerText = "Enter player names to start";

  // show setup again
  document.getElementById("setupDiv").style.display = "block";
}



