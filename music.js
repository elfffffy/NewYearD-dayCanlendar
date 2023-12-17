//배경음악
//DOMContentLoaded: HTML문서가 완전히 분석될 때 발생함.
document.addEventListener('DOMContentLoaded', function(){
    const soundElement = document.querySelector('.sound');
    const offElement = document.querySelector('.off');
    const bgm = document.querySelector('.bgm');

    soundElement.addEventListener('click', ()=>{
        bgm.play();
    })
    offElement.addEventListener('click', ()=>{
        bgm.pause();
        //currentTime을 변경하면 새로운 시간을 찾음.
        bgm.currentTime = 0;
    })
})