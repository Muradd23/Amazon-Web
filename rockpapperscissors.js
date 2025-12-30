  let score =JSON.parse(localStorage.getItem('score'))
        
        if (score===null) {
            score={
                wins:0,
                losses:0,
                ties:0
            }
        }

        document.querySelector('.js-rock')
        .addEventListener('click',()=>{
            playGame('rock')
        })

         document.querySelector('.js-paper')
        .addEventListener('click',()=>{
            playGame('paper')
        })
         document.querySelector('.js-scissors')
        .addEventListener('click',()=>{
            playGame('scissors')
        })

        document.body.addEventListener('keydown',(event)=>{
             if(event.key==='r'){
                playGame('rock')
             }else if(event.key==='p'){
                playGame('paper')
             }else if(event.key==='s'){
                playGame('scissors')
             }
        })

        function playGame(playerMove){
            let result = ''
            const jsResult = document.querySelector('.js-result')
            const jsPick = document.querySelector('.js-pick')
            const computerMove = pickComputerMove()
            if(playerMove==='rock'){
                if(computerMove==='rock'){
                    result = 'Tie'
                    jsResult.innerHTML = 'Tie'
                }else if(computerMove === 'paper'){
                    result = 'You lose'
                    jsResult.innerHTML = 'You lose'
                }else if(computerMove === 'scissors'){
                    result = 'You win'
                    jsResult.innerHTML = 'You win'
                }
            }

            if(playerMove==='paper'){
                if(computerMove==='rock'){
                    result = 'You win'
                    jsResult.innerHTML = 'You win'
                }else if(computerMove === 'paper'){
                    result = 'Tie'
                    jsResult.innerHTML = 'Tie'
                }else if(computerMove === 'scissors'){
                    result = 'You lose'
                    jsResult.innerHTML = 'You lose'
                }
            }


            if(playerMove==='scissors'){
               
                if(computerMove==='rock'){
                    result = 'You lose'
                    jsResult.innerHTML = 'You lose'
                }else if(computerMove === 'paper'){
                    result = 'You win'
                    jsResult.innerHTML = 'You win'
                }else if(computerMove === 'scissors'){
                    result = 'Tie'
                    jsResult.innerHTML = 'Tie'
                }
            }
            if (result==='You win') {
                score.wins +=1;
            }else if (result==='Tie') {
                score.ties +=1
            }else if (result==='You lose') {
                score.losses +=1
            }

            localStorage.setItem('score',JSON.stringify(score))
            console.log(score);
           
            jsPick.innerText = `You pick ${playerMove}. Computer picked ${computerMove}` 
             updateScore() 
            // alert(`You picked ${playerMove}, Computer picked ${computerMove}.${result}
            // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
            return result
        }
        function updateScore(){
            document.querySelector('.js-score')
            .innerHTML=`Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}` 
        }
        function pickComputerMove(){
            const randomNumber = Math.random()
            let computerMove=''
            if(randomNumber>=0 && randomNumber<1/3){
                computerMove = 'rock'
                
            }else if (randomNumber>=1/3 && randomNumber<2/3) {
            computerMove = 'paper'
                
            }else if (randomNumber>=2/3 && randomNumber<1) {        
                computerMove = 'scissors'
            }
            console.log(computerMove);
            return computerMove;
        }
        let isAutoPlaying = false
        let intervalId
        function autoPlay(){
            if(!isAutoPlaying){
                intervalId = setInterval(()=>{
                    const playerMove = pickComputerMove()
                    playGame(playerMove)
                },5000)
                isAutoPlaying=true
            }else{
                clearInterval(intervalId)
                isAutoPlaying=false

            }
            
        }