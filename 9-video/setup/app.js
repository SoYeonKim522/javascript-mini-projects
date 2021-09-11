// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the WHOLE page has loaded, INCLUDING all dependent resources such as stylesheets and images.
    //-> DOMContentLoaded 말고, load 쓸 예정!!

const btn = document.querySelector('.switch-btn');
const video = document.querySelector('.video-container'); //video container를 선택해도 되는구나  

btn.addEventListener('click', function(){
    if(!btn.classList.contains('slide')){
        btn.classList.add('slide');
        video.pause();
    } else {
        btn.classList.remove('slide')
        video.play();
    }
})
//ㄴ비디오 play/pause 도 추가해야하기 때문에 토글 안 씀

const preLoader = document.querySelector('.preloader');
window.addEventListener('load', function(){
    preLoader.classList.add('hide-preloader');
})