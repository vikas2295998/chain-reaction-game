var grid=document.getElementById('game');

var arr = Array(8).fill(0).map(() => Array(8).fill(0));
var color = Array(8).fill(0).map(() => Array(8).fill(2));
const colArr=['red','blue'];
const row=8;
const col=8;
let player=0;
let gameOn=true;

var fill_grid=()=>{
    grid.innerHTML="";
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let node1 = document.createElement("div");
        node1.style.gridRowStart=i+1;
        node1.style.gridColumnStart=j+1;
        node1.classList.add('box');
        node1.innerHTML=``;
        grid.appendChild(node1);
        }
    }
};
fill_grid();
const boxes=document.querySelectorAll('.box');




const addBolls=(box,noOfBolls,col,vibrate,violate,i,j)=>{
    box.innerHTML="";
    let ball1 = document.createElement("div");
    ball1.classList.add('ball');
    ball1.classList.add('ball1');

    let ball2 = document.createElement("div");
    ball2.classList.add('ball');
    ball2.classList.add('ball2');

    let ball3 = document.createElement("div");
    ball3.classList.add('ball');
    ball3.classList.add('ball3');
    let ball4 = document.createElement("div");
    ball4.classList.add('ball');
    ball4.classList.add('ball4');

    ball1.style.background=colArr[col];
    ball2.style.background=colArr[col];
    ball3.style.background=colArr[col];
    ball4.style.background=colArr[col];

    if(vibrate==true){
        ball1.classList.add('vibrate');
        ball2.classList.add('vibrate');
        ball3.classList.add('vibrate');
        ball4.classList.add('vibrate');
    }
    if(violate==true){
        ball1.classList.add('translate-y');
        ball2.classList.add('translate-x');
        ball3.classList.add('tranlatex');
        ball4.classList.add('translatey');
    }
    if(noOfBolls>1){
        ball1.style.top='40%';
    }

    if(noOfBolls==1){
        box.appendChild(ball1);
    }
    else if(noOfBolls==2){
        
        if(i==0&&j==0){
            box.appendChild(ball3);
            box.appendChild(ball4);
        }else if(i==0&&j==col-1){
            box.appendChild(ball2);
            box.appendChild(ball4);
        }else if(i==row-1&&j==0){
            box.appendChild(ball3);
            box.appendChild(ball1);
        }
        else if(i==row-1&&j==col-1){
            box.appendChild(ball2);
            box.appendChild(ball1);
        }
        else{
            box.appendChild(ball2);
            box.appendChild(ball1);
        }

    }
    else if(noOfBolls==3){
        if(i==0){
            box.appendChild(ball2);
            box.appendChild(ball3);
            box.appendChild(ball4);
            
        }
        else if(i==row-1){
            box.appendChild(ball1);
            box.appendChild(ball2);
            box.appendChild(ball3);
        }
        else if(j==0){
            box.appendChild(ball3);
            box.appendChild(ball1);
            box.appendChild(ball4);
        }
        else if(j==col-1){
            box.appendChild(ball2);
            box.appendChild(ball4);
            box.appendChild(ball1);
        }
        else{
            box.appendChild(ball1);
            box.appendChild(ball2);
            box.appendChild(ball3);
        }

    }
    else if(noOfBolls==4){
        box.appendChild(ball1);
            box.appendChild(ball2);
            box.appendChild(ball3);
            box.appendChild(ball4);

    }


}


const isCritical=(i,j)=>{
    if(i==0&&j==0 || i==0&&j==col-1 ||i==row-1&&j==0 ||i==row-1&&j==col-1 ){
        if(arr[i][j]>0){
            return true; 
        }
    }
    else if(i==0 || j==0 || i==row-1 || j==col-1){
        if(arr[i][j]==2){
            return true; 
        }
    }
    else{
        if(arr[i][j]==3){
          return true;
        }
    }
    return false;
}

const isViolate=(i,j)=>{
    if(i==0&&j==0 || i==0&&j==col-1 ||i==row-1&&j==0 ||i==row-1&&j==col-1 ){
        if(arr[i][j]>1){
            return true; 
        }
    }
    else if(i==0 || j==0 || i==row-1 || j==col-1){
        if(arr[i][j]>2){
            return true; 
        }
    }
    else{
        if(arr[i][j]>3){
          return true;
        }
    }
    return false;
}



const print_grid= async ()=>{
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
         let val=row*i+j;
        addBolls(boxes[val],arr[i][j],color[i][j],isCritical(i,j),isViolate(i,j),i,j);
        
    }
}
};



const increament=(i,j)=>{
    if(i+1<row){
        arr[i+1][j]=eval(arr[i+1][j]+1);
        color[i+1][j]=color[i][j];
    }
        
    if(i-1>=0){
        arr[i-1][j]=eval(arr[i-1][j]+1);
        color[i-1][j]=color[i][j];
    }
    if(j+1<col){
        arr[i][j+1]=eval(arr[i][j+1]+1);
        color[i][j+1]=color[i][j];
    }
    if(j-1>=0){
        arr[i][j-1]=eval(arr[i][j-1]+1);
        color[i][j-1]=color[i][j];
    }
     arr[i][j]=0;
     color[i][j]=2;

};



function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
 }  


const chainReaction= async()=>{
    gameOn=false;
    let flag=0;
    do{
        flag=0;
        for(let i=0;i<row;i++){
            for(let j=0; j<col;j++){
                if(i==0&&j==0 || i==0&&j==col-1 ||i==row-1&&j==0 ||i==row-1&&j==col-1 ){
                    if(arr[i][j]>1){
                        increament(i,j);
                        flag=1;
                        await sleep(400);
                        await print_grid(); 
                    }
                }
                else if(i==0 || j==0 || i==row-1 || j==col-1){
                    if(arr[i][j]>2){
                        increament(i,j);
                        flag=1;
                        await sleep(400);
                        await print_grid(); 
                    }
                }
                else{
                    if(arr[i][j]>3){
                        increament(i,j);
                        flag=1;
                        await sleep(400);
                        await print_grid(); 
                    }
                }
            }
        }
    }while(flag==1);

gameOn=true;
}


const play=(player)=>{

    const indicator=document.getElementsByClassName('btn');
    if(player==0){

        indicator[0].style.background='red';
        indicator[0].style.animation='glow 1s infinite';
        indicator[1].style.background='white';
        indicator[1].style.animation='none';
    }
    else{
        indicator[0].style.background='white';
        indicator[0].style.animation='none';
        indicator[1].style.animation='glow 1s infinite';
        indicator[1].style.background='blue';
    }
}

const check_winner=(player)=>{
        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++){
                if(color[i][j]==(player^1))
                return false;
            }
        }
        return true;
}


let cnt=0;
for(let i=0;i<row*col;i++){
    let box=boxes[i];
    let j= Math.trunc(i/row);
    let k=i%col;


    box.addEventListener('mouseover',()=>{
        console.log(player);
        if(!(color[j][k]==2 || color[j][k]==player)){
            box.style.cursor='not-allowed';
        }
        else{
            box.style.cursor='pointer';
        }
    });


    box.addEventListener('click',async ()=>{
       
        if(gameOn==true &&(color[j][k]==2 || color[j][k]==player)){
        arr[j][k]=eval(arr[j][k])+1;
        color[j][k]=player;

        
        await print_grid();
        await chainReaction();
      
        if( cnt!=0 && check_winner(player)===true){
            const para=document.getElementById('massage');
            // console.log(para);
            para.innerHTML=`player ${player+1} is won!!!`;
            const message=document.querySelector('.message');
            message.style.display='flex';
            gameOn=false;
        }
        player^=1;
        play(player);
    
         cnt=1;
        
        }
    })
    
}



play(player);
// fill_grid();
