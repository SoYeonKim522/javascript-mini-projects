//.links가 안보이도록 css에서 처리해놓고 (여기서는 높이를 안주는 방식) 보이게 하는 클래스를 js에서 토글하는 방식

// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');
//const showlinks = document.querySelector('.show-links');  //이 css만 있는 클래스는 빼야함!!!!!

function openBar(){
    links.classList.toggle('show-links');
}

navToggle.addEventListener('click', openBar); 