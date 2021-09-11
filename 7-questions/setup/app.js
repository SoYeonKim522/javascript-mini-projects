//방법1: traversing the dom
//방법2: using selectors inside the element


/* MYSELF
const plusIcon = document.querySelectorAll('.plus-icon');
const minusIcon = document.querySelectorAll('.minus-icon');
const question = document.querySelectorAll('.question');  
function openText(){
    question.classList.toggle('show-text');
}
plusIcon.addEventListener('click', openText)*/

//왜인지는 모르겠지만 question-text가 아니라 question에 .show-text를 추가해야 답변이 보여짐


/*방법1
//question 은 btns의 부모(question-text)의 부모임!
//어떤 btn이 눌렸는지 파악하고, 그 btn의 부모의 부모에 .show-text를 추가해야함
const btns = document.querySelectorAll('.question-btn'); //All*

btns.forEach(function(btn){     //버튼이 여러개이기 때문에 forEach. + 인자 정해 넣기
    btn.addEventListener('click', function(e) { //e옆에 괄호를 왜 뒤로 빼는지..?
        //console.log(e.currentTarget.parentElement.parentElement);
        let question = e.currentTarget.parentElement.parentElement;
        question.classList.toggle('show-text');
    }); 
});
*/

//방법2 using selectors inside the element(document 대신 question으로_line32)
const questions = document.querySelectorAll(".question")  //모든 .question 선택

questions.forEach(function(question){
    const btn = question.querySelector('.question-btn') // document대신 question(버튼 모두를 선택하는게 아니라, 그 question 내부의 button으로 제한시키는 것!!!)
    btn.addEventListener('click', function(){               // ㄴ> 클릭한 부분이 question

        questions.forEach(function(item){  //위의 인자인 question과 다른 이름. item은 열려있을 가능성이 있는 question을 가르킴
            if(item !== question){         //내가 클릭한 question과, 열려있는 question(item)이 매치하지 않는다면
                item.classList.remove('show-text') //그 열려있는 걸(item) 닫고
            }
        });

        question.classList.toggle('show-text');  //question은 토글
    });
});

