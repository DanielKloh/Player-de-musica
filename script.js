const capaDisco = document.getElementById("capa_disco");
const songName = document.getElementById("song-name");
const bandaNome = document.getElementById("nome_banda");
const song = document.getElementById("song");
const play = document.getElementById("play");
const voltar = document.getElementById("back_music");
const avancar = document.getElementById("next_music");
const barraProgresso = document.getElementById("current-progress");
const progressConteiner = document.getElementById("progress_conteiner");
const embaralhar = document.getElementById("random_music");
const repetir = document.getElementById("repeat_music");
const tempoMusica = document.getElementById("song-time");
const tempoTotal = document.getElementById("total-time");




let tocando = false;
let embaralhado = false;
let repetindo = false;



const stay = {
    songName : "Stay",
    artista : "Justin Bieber",
    file : "stay"
};

const upDowFunk = {
    songName : "Up down funk",
    artista : "Bruno Mars",
    file : "up_dow_funk"
};

const lateNightTalking = {
    songName : "Late Night Talking",
    artista : "Harry Styles",
    file : "late_night_talking"
}



const playlistOriginal = [lateNightTalking, stay, upDowFunk ];
let playlistOrdenada = [...playlistOriginal];

let index = 0;


function tocar_musica(){
    //muda o botão de play e pause
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");

    //toca a musica
    song.play();

    tocando = true;
}


function pausa_musica(){
    //muda o botão de pause e pause
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");

    //pausa a musica
    song.pause();

    tocando = false;
}


function playDecisao(){
    if(tocando === true){
        pausa_musica();
    }
    else{
        tocar_musica();
    }
}


function carregar_musica(){
    capaDisco.src = `capas_disco/${playlistOrdenada[index].file}.jpg`;
    song.src = `audio/${playlistOrdenada[index].file}.mp4`;
    songName.innerText = playlistOrdenada[index].songName;
    bandaNome.innerText = playlistOrdenada[index].artista;

}

function voltar_musica(){
    if(index===0){
        index = playlistOrdenada.length -1;
    }
    else{
        index -= 1;
    }
    carregar_musica();
    tocar_musica();
}

function avancar_musica(){
    if(index===playlistOrdenada.length -1){
        index = 0;
    }
    else{
        index += 1;
    }
    carregar_musica();
    tocar_musica();
}


function atualizarBarraProgrsso(){
    const progress = (song.currentTime/song.duration)*100;
    barraProgresso.style.setProperty("--progresso" , `${progress}%`);
}

function jumpTo(event){
    const tamanho = progressConteiner.clientWidth;
    const posicao = event.offsetX;
    const pualar = (posicao/tamanho)*song.duration;
    song.currentTime = pualar;
}

function embralharArray(preEmbaralharArray){
    let size = preEmbaralharArray.length;
    let correntIndex = size - 1;
    while(correntIndex > 0){
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preEmbaralharArray[correntIndex];
        preEmbaralharArray[correntIndex] = preEmbaralharArray[randomIndex];
        preEmbaralharArray[randomIndex] = aux;
        correntIndex -= 1;
    }
}

function embaralharPlaylist(){
    if(embaralhado === false){
        embaralhado = true;
        embralharArray(playlistOrdenada);
        embaralhar.classList.add('button-active');
    }

    else{
        embaralhado = false;
        playlistOrdenada = [...playlistOriginal];
        embaralhar.classList.remove('button-active');

    }
}

function repetirMusica(){
    if(repetindo === false){
        repetindo = true;
        repetir.classList.add('button-active');

    }

    else{
        repetindo = false;
        repetir.classList.remove('button-active')
    }
}

function repetirORnext(){
    if(repetindo === false){
        avancar_musica();
    }

    else{
        tocar_musica();
    }
}

function toHHMMSS(numeroOriginal){
    let horas = Math.floor(numeroOriginal / 3600);
    let minutos = Math.floor((numeroOriginal - horas * 3600) / 60);
    let segundos = Math.floor(numeroOriginal - horas * 3600 - minutos *60);

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;   
}

function updateTime(){
    tempoMusica.innerText = toHHMMSS(song.currentTime);
}

function updateTotalTime(){
    tempoTotal.innerText = toHHMMSS(song.duration );
}


progressConteiner.addEventListener('click',jumpTo);
