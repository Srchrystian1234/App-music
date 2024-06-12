//primeira parte de tudo e  fazer aschamadas de acordo com a necessidade 

const songName = window.document.getElementById('song-name');                              
const song = window.document.getElementById('audio');
const LikeButton = window.document.getElementById('like')
const play = window.document.getElementById('play')
const bandName = window.document.getElementById('band-name');
const coverDisc = window.document.getElementById('cover')
const next = window.document.getElementById('next')
const previous = window.document.getElementById('previous');
const currentProgress = window.document.getElementById('current-progress')
const progressContainer = window.document.getElementById('progress-container')
const shuffleButton = window.document.getElementById('shuffle');

const Repeatbutton = window.document.getElementById('repeat')
const SongTime = window.document.getElementById('song-time')
const totalTime = window.document.getElementById('total-time')


// criamos alguns objetos (nesse caso 3)

const IWantItThatWay = {
    // atributos dos obejtos 
    songName: 'I Want It That Way', 
    artist: 'Backstreet boys',
    file:'Backs',
    Liked: true,
};

const ZumZumZum = {
    songName: 'Zum Zum Zum',
    artist: 'Teto raps',
    file:'Teto',
    Liked:true,
};
const SoldaMeiaNoite = {
    songName: 'Sol da Meia Noite',
    artist: 'Rosa de Saron',
    file:'Rosa',
    Liked: true,

}
// funcoes auxiliares 
let isPlaying = false
let index = 0;
let isShuffled = false
let isLike = true


// criamos um  constante de array pra  fazer as chamadas dentro da funcoes 
// usamos o json armazenar em um local na nuvem e caso nao estivess mais na nuvem , colocamos um valor padrao 
const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [IWantItThatWay,ZumZumZum,SoldaMeiaNoite]  // array original

let sortedPlaylist = [...playlist] //criando um clone para não alterar na original,com isso consigo brincar com essa, sem alterar o array original 


// funcao de preenchimento do bota de like
var LikeButtonRender = ()=>{
    // fizemos uma condicao para caso de ser faso ou verdade, se for falso ele vai executar tal tarefa
  if (sortedPlaylist[index].Liked === false){
        LikeButton.querySelector('.bi').classList.remove('bi-heart')
        LikeButton.querySelector('.bi').classList.add('bi-heart-fill')
        LikeButton.classList.add('button-active')
       
        
  }else{
    LikeButton.querySelector('.bi').classList.remove('bi-heart-fill')
    LikeButton.querySelector('.bi').classList.add('bi-heart')
    LikeButton.classList.remove('button-active')
    
  }
}
// funcao que decide se cada audio ja ta ou nao marcado , caso nao ele executa a funcao likebuttonRender
function LikeButtonClicked(){
    if(sortedPlaylist[index].Liked === true){
        sortedPlaylist[index].Liked =false
        

    }else{
    sortedPlaylist[index].Liked = true
   
    }
    LikeButtonRender();
    //cria um local na nuvem com passa de prmiero do nome e depois o objet
    localStorage.setItem('playlist', JSON.stringify(playlist))
 }
        

function playSong (){
   //play de tocar a musica 
   // pedido pra troca a o icon de (play) para (pause)
        play.querySelector('.bi').classList.remove('bi-play-circle-fill')
        play.querySelector('.bi').classList.add('bi-pause-circle-fill')
         song.play(); //evento de tocar
            //tag auxiliar
         isPlaying = true;
    
}
function pauseSong (){
   //pause de  musica 
   // pedido pra troca a o icon de (play) para (pause)
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
    play.querySelector('.bi').classList.add('bi-play-circle-fill')
     song.pause();
     isPlaying = false;
     //tag auxuliar
     

}
// funcao que decide se toca ou pausa
function PlaypauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }else{
        playSong();
        
        
    }

}

// para carregar os elementos de imagem , audio, nome da banda e informações da audio
function initializeSong (){
    coverDisc.src = `src/imagens/${sortedPlaylist[index].file}.jpg`;

    song.src = `src/Songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerHTML = `${sortedPlaylist[index].songName}`
    bandName.innerHTML = sortedPlaylist[index].artist;
    
    LikeButtonRender(); //inicia por padrao
}

// funcao de voltar pra musica interior 
function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length -1// quando chegar no -1 , ele vai jogar pro comprimento do array que nesse caso é o numero 2 
        
    }else{
        index--
       
    }
    /* pra musicaser executada e inicia os elementos */
    initializeSong();
    playSong();
   
  
}

// funcao de avançar 
function nextSong(){
    if(index === sortedPlaylist.length -1){
        index = 0
        // nesse caso ele so inverter a situacao 
        
    }else{
        index++
       
    }
    /* pra musica ser executada e inicia os elementos */
    initializeSong();
    playSong();
  
}



 // funcao de clicar na barra de progresso 
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
let isRepeat = false

// essa funcao que vai ver se o botao essa clicado ou nao 
function repeatButtonClicked(){
    if(isRepeat === false){
        //caso seja falso ele vai colocar o botao verde 
        Repeatbutton.classList.add('button-active')
        // e vai deixar como true
        isRepeat = true
        // e vai executar a funcao de avançar ou repeti
        
        
    }else{
        Repeatbutton.classList.remove('button-active')
        isRepeat = false;
        
    }
}
// essa funcao decide se vai tocar a proxima ou repeti 
function nextOrRepeat(){
    //caso seja falso ,ele vai pedi pra tocar a proxima musica 
    if(isRepeat === false){
    //proxima musica
        nextSong();
    }else{
        //repet a musica 
        playSong();
        
    }

}
// funcao da barra de progresso 
function updateProgress(){
    /* song.currentTime  temo atual da musica
     song.duration duração do som */
     // faz a matematica pra que aconteça a progressao da barra de progresso 
     const barWidht = (song.currentTime/song.duration)*100;
  // currentprogresss faaz a alteração da barra de progresso e faz ligação com o css
     currentProgress.style.setProperty('--progress', `${barWidht}%`);
    // faz lifacao com o outra funcao que faz a matematica do tempo
 
    // ele apssa um paramentro pra funcao de TOhhmmss 
     SongTime.innerHTML = toHHMMSS(song.currentTime);
 }
// funcao que faz  a matematica para as exibição posterior do tempo de exibição do audio
function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber/3600)
    let min = Math.floor((originalNumber - hours * 3600)/60)
    let seconds = Math.floor(originalNumber - hours * 3600 - min*60)
   return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
}

// funcao que mostra o duracao total da musica
function updateTotalTime(){
    
    totalTime.innerHTML = toHHMMSS(song.duration);
}



initializeSong();
//sessao de eventos do projeto 

play.addEventListener('click',PlaypauseDecider);

previous.addEventListener('click',previousSong);

next.addEventListener('click',nextSong);

song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat); // é o momento em que avisa quando a musica termina e pede um o que fazer apos termina
song.addEventListener('loadedmetadata',updateTotalTime) 
progressContainer.addEventListener('click',jumpTo);// chaamada pro clica na barra de progresso

shuffleButton.addEventListener('click', shuffleButtonClicked);
Repeatbutton.addEventListener('click', repeatButtonClicked);// botao de ativa o modo repeat ou no-repeat


LikeButton.addEventListener('click',LikeButtonClicked)