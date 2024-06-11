const songName = window.document.getElementById('song-name');                              
const song = window.document.getElementById('audio');
const Like = window.document.getElementById('like')
const play = window.document.getElementById('play')
const bandName = window.document.getElementById('band-name');
const coverDisc = window.document.getElementById('cover')
const next = window.document.getElementById('next')
const previous = window.document.getElementById('previous');
const currentProgress = window.document.getElementById('current-progress')
const progressContainer = window.document.getElementById('progress-container')
const shuffleButton = window.document.getElementById('shuffle');

const IWantItThatWay = {
    songName: 'I Want It That Way',
    artist: 'Backstreet boys',
    file:'Backs'
}

const ZumZumZum = {
    songName: 'Zum Zum Zum',
    artist: 'Teto raps',
    file:'Teto'
}
const SoldaMeiaNoite = {
    songName: 'Sol da Meia Noite',
    artist: 'Rosa de Saron',
    file:'Rosa'
}

let isPlaying = false

const playlist = [IWantItThatWay,ZumZumZum,SoldaMeiaNoite] // array original

let sortedPlaylist = [...playlist] //criando um clone para não alterar na original,com isso consigo brincar com essa, sem alterar o array original 

let index = 0;
let isShuffled = false
let isLike = true
let Clique = ()=>{

    if(isLike === true){
        Like.querySelector('.bi').classList.remove('bi-heart')
        Like.querySelector('.bi').classList.add('bi-heart-fill')

        isLike = false
    }else{
        Like.querySelector('.bi').classList.remove('bi-heart-fill')
        Like.querySelector('.bi').classList.add('bi-heart')
        isLike = true
    }

}

function playSong (){
   
        play.querySelector('.bi').classList.remove('bi-play-circle-fill')
        play.querySelector('.bi').classList.add('bi-pause-circle-fill')
         song.play();
         
         isPlaying = true;
    
}
function pauseSong (){
   
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
    play.querySelector('.bi').classList.add('bi-play-circle-fill')
     song.pause();
     isPlaying = false;
     

}
function PlaypauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }else{
        playSong();
        
        
    }

}

function initializeSong (){
    coverDisc.src = `src/imagens/${sortedPlaylist[index].file}.jpg`;

    song.src = `src/Songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerHTML = `${sortedPlaylist[index].songName}`
    bandName.innerHTML = sortedPlaylist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length -1// quando chegar no -1 , ele vai jogar pro comprimento do array que nesse caso é o numero 2 
        
    }else{
        index--
       
    }
    initializeSong();
    playSong();
   
  
}
function nextSong(){
    if(index === sortedPlaylist.length -1){
        index = 0
        // nesse caso ele so inverter a situacao 
        
    }else{
        index++
       
    }
    initializeSong();
    playSong();
  
}
function updateProgressBar(){
   /* song.currentTime  temo atual da musica
    song.duration duração do som */
    const barWidht = (song.currentTime/song.duration)*100;

    currentProgress.style.setProperty('--progress', `${barWidht}%`)
}

function jumpTo (event){
  const widht =  progressContainer.clientWidth//clientWidth é a largura  da barrra de progresso total
  const clickPosition = event.offsetX // o tamanho em pixels da largura da onde foi clicada a barra de progresso

  const jumpToTime = (clickPosition/widht)* song.duration;// a divisao do local aonde clicamos pela largura total, multiplicado pela duração do audio 
  song.currentTime = jumpToTime // apos fazer a conta, jogamos o resultado dentro da tempo atual da musica

}
// funcao de fazer o embaralhamento (com chamada de paramentro)
function shufflearray(presShuffleArray){ // funcao com paramentro
    const size = presShuffleArray.length; //passando o tamanho do comprimento do sorteplalist
    let currentIndex = size - 1 //criando uma variavel que recebe , o comprimento - 1 

    // laço de repeticao
        while(currentIndex > 0){
            // caso ainda esteja maior que 0 ,ele vai executar 
          let randomIndex =  Math.floor(Math.random()* size);// o math.random faz embaralhamento de numeros entre 1 e 0 , por isso que multiplcamos pelo tamanho do comprimento do array
            //math.floor pega a parte inteiro do numero
            // exemplo se tenho de comprimento 5 entao é 4 e assim por diante

            //variavel auxiliar , que recebe os valor atual do index , pra que nao se perda
            let aux = presShuffleArray[currentIndex];
            
            // press[currentIndex ] recebe o press[ramdomindex] ele vai deixar com valor que foi sorteado
            presShuffleArray[currentIndex] = presShuffleArray[randomIndex]

            //aqui o press [ramdomindex] recebe o valor que fico armazendopra nao ce perder
            presShuffleArray[randomIndex]= aux;

            // aqui ele fica tirando -1 pra o laço ficar rodando
            currentIndex -= 1;
        }
}

function shuffleButtonClicked (){ //funcao que faz atribuir a ação de funcionamento do botao shuffle

    //condicao da funcao
    //caso esteja com false ele vai executar 
    if(isShuffled === false){
        // em seguidan ele vai transformar em vdd
        isShuffled = true;
        // aqui em baixo que faz a chamada com sufflearray , para fazer o embaralhamento
        shufflearray(sortedPlaylist);
        //ai vai fazer a troca da cor do botao
        shuffleButton.classList.add('button-active')
    }else{
        //caso seja falso ele vai executar o processo normalmente em sequencia

        //torna ele falso
        isShuffled = false;
        //aquie ele clona da plalist original e faz ela vorla o nromal 
        sortedPlaylist = [...playlist];
        shuffleButton.classList.remove('button-active')
    }
}
initializeSong();

play.addEventListener('click',PlaypauseDecider);

previous.addEventListener('click',previousSong);

next.addEventListener('click',nextSong);

song.addEventListener('timeupdate', updateProgressBar);

progressContainer.addEventListener('click',jumpTo);// chaamada pro clica na barra de progresso

shuffleButton.addEventListener('click', shuffleButtonClicked);

Like.addEventListener('click',Clique)