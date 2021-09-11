// Element.getBoundingClientRect() method returns the size of a DOM element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** mobile ver. - close links & make link container dynamically ************
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');  //links ul 선택   - ★요소가 한개인데 querySelectorAll선택하면 관련 기능 아예 작동 안됨.............
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', function(){ 
    //linksContainer.classList.toggle('show-links');  - 단순히 이렇게 하면 links를 추가/삭제할 때마다 css 다시 해야함
    const containerHeight = linksContainer.getBoundingClientRect().height;
    //console.log(containerHeight);  //==0.  linksContainer의 여러 속성 나오는데 그 중 height 선택한 것. 기본값이 안보이게 하는 거라서 높이 0임
    const linksHeight = links.getBoundingClientRect().height;
    console.log(linksHeight);  //==200.  메뉴 펼쳐졌을 때 links ul의 높이 총합(50*4)을 보여줌
    
    if(containerHeight === 0){                              //=링크 바가 닫혀있으면 
        linksContainer.style.height = `${linksHeight}px`    //기본적으로 inline으로 들어가게 됨 -> css에서 links-container 높이 auto로 해줘야
    } else {                                //링크 바가 열려있으면
        linksContainer.style.height = 0;    //닫아라
    }
});

// ********** pc ver. - fixed navbar & to top button ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll',function(){
    const scrollHeight = window.pageYOffset; //==스크롤해내려간 높이    
    if(scrollHeight > navbar.getBoundingClientRect().height){       //bar높이 이상으로 내려가서 bar가 안보이게 되면 
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }

    if(scrollHeight > 500){
        topLink.classList.add('show-link');
    } else{
        topLink.classList.remove('show-link');
    }
});

// ********** smooth scroll ************
// select links (일단 #처리 다 해놔서 링크 누르면 해당하는 곳으로 스크롤 되긴함
// 근데 맨 위에 navbar 때문에 container 제목이 잘려서 수정예정 (+이게 navbar의 고정상태여부에 따라 달라짐)
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function(link){                 //queryselectorALL로 불러왔기 때문에 nodelist로 리턴됨 -> 이 자체를 바로 이벤트함수 적용안되기 때문에 foreach써야함
    link.addEventListener('click', function(e){
        e.preventDefault();                         //일단 원래 스크롤되는거 막기
        //nagivate to specific spot
        //const id = e.currentTarget.getAttribute('href');         //클릭한 링크의 해쉬태그 가져오기
        const id = e.currentTarget.getAttribute('href').slice(1);  // index1부터 가져와 ('#'빼고)
        const element = document.getElementById(id);                //21'06 - id가 home, about...인 "섹션"전체를 element로 선택
        
        //calculate the height of section 
        const navHeight = navbar.getBoundingClientRect().height; //nav bar 자체의 높이
        const containerHeight = linksContainer.getBoundingClientRect().height;  // navbar가 열렸을 때 나오는 links container 높이
        const fixedNav = navbar.classList.contains('fixed-nav');  //★★if구문에 사용 예정★★ 
        let position = element.offsetTop - navHeight;     // offsetTop : element의 top position을 숫자로 나타냄
        console.log( element.offsetTop-navHeight)
        console.log(navHeight)
        if(!fixedNav){              //(작은&큰화면) 상단고정 안되어 있다면
            console.log('case1')
            position = position - navHeight;   // navbar 높이 만큼 더 내려라 (이래서 위에서 position 에 let을 쓴 것)
        } if (navHeight > 82) {     //navbar가 (작은화면에서) 열려있다면 (메뉴가 열리면 nav 높이가 길어지는거지, linkscontainer가 길어지는게 아님)
            console.log('case2')    //작은화면에서 바 고정 안된 상태로 메뉴 연 경우는 이쪽이겠지?    
            console.log(navHeight)
            position = position + containerHeight;  //container 높이(200)만큼 더 스크롤해 내려가라
            console.log(containerHeight)
        }
        console.log('case3'); 
        //큰화면+fixed bar인 경우 
        window.scrollTo({
            left:0, top: position
        })  
       
        linksContainer.style.height = 0;   //링크 클릭하면 열린 바는 닫히게
    });
});

//if문 조건을 잘 짜는 게 중요한 능력인듯