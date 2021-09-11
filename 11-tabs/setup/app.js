//이벤트 위임 & event.target 연습

const btns = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');
const about = document.querySelector(".about");  //tap&content container

about.addEventListener('click', function(e){  //버튼이 아니라 부모요소인 about에 이벤트 (이벤트위임) -> event target이용
//edit: 왜 btn-container가 아니라 about 에 이벤트를 줬는지 이해할 수 없음
    const id = e.target.dataset.id;  // history, vision, goals 중에 하나가 클릭되어 할당됨
    const element = document.getElementById(id);  // !! id 이름이 클릭된 것과 같은 이름인 요소를 가져오기!!!
    //console.log(element)
    if (id){                                      //id가 있다면(=버튼을 클릭했다면) - btncontainer에 이벤트 줬으면 이거 필요없음
        //remove active from all buttons and then add
        btns.forEach(function(btn){
            btn.classList.remove('active');
            e.target.classList.add('active');
            console.log(id)
        });
        //hide active from all articles
        articles.forEach(function(article){
            article.classList.remove('active');
            element.classList.add('active');
        })
    } 
});


/*
function display(e){
    const btnName = e.target.dataset.id;
    const articleName = article.attr("id");
        
    if (!e.target.contains.active){
        //name 이 같은걸 foreach로 찾아서?
        article.forEach(btnName==articleName){
            article.classList.add('active');
            e.classList.add('active');
        }
    }
    if(e.target.contains.active){
        return;
    }
};

btns.addEventListener('click', display);
*/