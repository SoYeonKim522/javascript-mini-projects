// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const thisYear = document.querySelector('footer span');
let thisyear = new Date().getFullYear();
thisYear.innerHTML = thisyear;

// ********** set links dynamically & close links ************
const toggleBtn = document.querySelector('.nav-toggle');
const linksBar = document.querySelector('.links-container');   //★container는 show-links클래스가 없으면 닫혀있는 상태임 => 높이 0
const links = document.querySelector('.links');             //★ul.links는 안보여도 항상 존재하는 애임 => 높이가 항상 있음
 
toggleBtn.addEventListener('click', () => {
    //const navBar = document.querySelector('nav');
    //const navBarHeight = navBar.getBoundingClientRect().height;  //이거 아님..
    const linksBarHeight = linksBar.getBoundingClientRect().height;   //열 때 : 0, 닫을 때 : 200
    const linksHeight = links.getBoundingClientRect().height;  //열 때 : 200, 닫을 때 : 200
    
    if(linksBarHeight === 0){
        //linksBar.classList.add("show-links");
        linksBar.style.height = `${linksHeight}px`;   //linksBarHeight 에 직접 할당하면 안됨(그건 현재 높이를 가져오는!RETURN하는 것일뿐)... + js에서 px쓰는 법 기억하기
    } else {       
        //linksBar.classList.remove("show-links");
        linksBar.style.height = 0           //css에 show-links :height 200px 를 지웠는데도 불구하고 이 줄이 없으면 메뉴바가 닫히지 않는 이유?
    };
})

links.addEventListener('click', () => {             //링크 클릭했으면 메뉴창 닫기 - 이거는 scroll부분에 합쳐서 넣는게 더 맞기는 함
    linksBar.style.height = `0px`;
})


// ********** fixed navbar ************
const navBar = document.querySelector('nav');           //nav가 id여도 queryselector 당연 가능
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navBarHeight = navBar.getBoundingClientRect().height;
    if (scrollHeight > navBarHeight) {
        navBar.classList.add('fixed-nav')
    } else {
        navBar.classList.remove('fixed-nav')
    }
    
    if(scrollHeight > 1000){
        topLink.classList.add('show-link')
    } else {
        topLink.classList.remove('show-link')
    }
});

// ********** smooth scroll ************
navBarHeight = nav.getBoundingClientRect().height;
scrollLink = document.querySelectorAll('.scroll-link');  //queryselectorALL로 불러왔기 때문에 nodelist로 리턴됨 -> 이 자체를 바로 이벤트함수 적용 불가
                                                         //중간에 있는 tour버튼도 포함시켜야함! -> header .scroll-link(x)
scrollLink.forEach(elem => {                        //그래서 foreach 사용해서 수동으로 이벤트 추가해줘야 함
    elem.addEventListener('click', (e) => {         //googled!
        e.preventDefault();
        let linksName = elem.getAttribute('href')   //googled!
        linksName = linksName.slice(1);
        const position = document.getElementById(`${linksName}`).offsetTop;   //`${linksName}` !!!
        const fixedNav = navBar.classList.contains('fixed-nav');  //★★KEY★★ _contains 앞에 classlist 붙이는거 잊지말기 -이거 이용해서 작은화면 부분 고침
        const linksContHeight = links.getBoundingClientRect().height;

        const linksBarHeight = linksBar.getBoundingClientRect().height;   //작은화면: 0 / 큰화면:항상 26
        if(navBar.getBoundingClientRect().width >= 900){
            if(window.pageYOffset < navBarHeight){   // fixedbar 없을 때
            console.log('case1')
            window.scroll({
                top: position-navBarHeight*2,
                left:0
            })
        } if(window.pageYOffset > navBarHeight){  //fixedbar 이미 있을 때
            console.log('case2')
            window.scroll({
                top: position-navBarHeight, 
                left:0
            })
        }   
        } if(navBar.getBoundingClientRect().width < 900){
            if(fixedNav){
            console.log('case3')
            window.scroll({
                top: position-navBarHeight,
                left:0
            })
        } if(!fixedNav){
            console.log('case4')
            window.scroll({
                top: position-(navBarHeight*2)-linksContHeight,
                left:0
            })
        }
        }
    });
});

//case 2 어떻게 구분?

//linksBar.style.height == `${links.getBoundingClientRect().height}px` - 포기하고 그냥 넓이로 씀
//note : 메뉴바가 열리는건 nav 길이가 길어지는 것. 개발자도구 inspect로 확인가능
/*의문 : console.log(linksBarHeight)는 toggleBtn 이벤트함수 안에서는 정상적으로 0, 200값이 나오는데
        함수 밖에서는 계속 값이 26으로 나오는데 진짜 왜그러는지 모르겠음*/

//scrollLink가 강의에서 한거랑 다르긴한데 왜인지는 모르겠음...