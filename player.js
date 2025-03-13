console.log("working");
const folder= 'Bollywood'



const current=new Audio();
const play = document.getElementById('play')
const s_name= document.querySelector('.song_info');
const time = document.querySelector('.duration')


async function getsongs(folder){
let a = await fetch(`Songs/${folder}`);

let res = await a.text();

let divs = document.createElement('div');
divs.innerHTML = res;
as= divs.getElementsByTagName('a');
let songs=[];
for ( let i =0 ;i<as.length;i++){
    const element = as[i];
    if( as[i].href.endsWith('.mp3')){
        songs.push(element.href)
    }
}
song=songs
console.log(song)
let li=document.getElementsByTagName('ul');
song_name=[]
for (let i =0;i<song.length;i++){
    console.log(li[0])
    song_name.push(song[0].split(`${folder}`)[1].replaceAll('Songs%'," ").replaceAll('%20',' '))
    li[0].innerHTML=li[0].innerHTML+`<li>
                    <img src="SVG/music.svg">
                    <div class="minfo">
                        <div class="sname">${song[i].split('/Songs/')[1].replaceAll('%20',' ')}</div>
                        <div class="aname">Singer</div>
                    </div>
                    <div class="play">
                        <img src="SVG/browse.svg ">
                    </div>
                    
                </li>`
            
}

    song_name=[]
   var x = Array.from(document.querySelector('.list').getElementsByTagName('li'))
    for (let i=0;i<x.length;i++){
        x[i].addEventListener('click',function display(){
            console.log(x[i].getElementsByTagName('div')[0].firstElementChild.innerHTML)
            s_name.innerHTML=x[i].getElementsByTagName('div')[0].firstElementChild.innerHTML;
            playmusic(x[i].getElementsByTagName('div')[0].firstElementChild.innerHTML);
        })
    }
return songs;


}


async function playmusic(track){
    current.src="/Songs/" + track;
    console.log(play.src)
    current.addEventListener('timeupdate', () => {
        console.log(current.currentTime,current.duration);
        console.log(100-(current.duration-current.currentTime)/current.duration*100)
        document.querySelector('.circle').style.left=`${100-(current.duration-current.currentTime)/current.duration*100}%`

    });
    if (play.src.endsWith('.play.svg'))
        console.log('this')
        play.src='/SVG/pause.svg'
    current.play()




}

async function main(){
    let song =await  getsongs(folder);
    current.src=song[0]


    
    
    let circle = document.querySelector('.circle')
    
    play.addEventListener('click', ()=>{
        if ( current.paused){
            console.log(play.src)
            play.src='/SVG/pause.svg'
            current.play()
        }
        else{
            play.src='/SVG/play.svg'
            current.pause()
        }
    })

        document.querySelector('.playbar').addEventListener('click',e=>{
            console.log(e.target.getBoundingClientRect())
            console.log(e.offsetX/e.target.getBoundingClientRect().width*100)
            current.currentTime=current.duration*e.offsetX/e.target.getBoundingClientRect().width
            document.querySelector('.circle').style.left=e.offsetX/e.target.getBoundingClientRect().width*100+'%'
        })
        cards = Array.from(document.getElementsByClassName('card'))
        console.log(cards[0].dataset.folder)
        cards.forEach(element => {
            element.addEventListener('click', async e=>{
                console.log(element.dataset.folder)
                let li=document.getElementsByTagName('ul');
            console.log('onw')
            li[0].innerHTML=''
            song=await getsongs(element.dataset.folder)
            
            })
        });

    


    
}
main()