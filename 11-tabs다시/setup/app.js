//복습 따로 안하고 다시 만들어봄
//탭버튼 색깔 클릭하는 바뀌는 이벤트를 까먹고 안넣어서 다시 넣어줌

const btnContainer = document.querySelector('.btn-container');
const tabBtn = document.querySelectorAll('.tab-btn');
const allContents = document.querySelectorAll('.content');

btnContainer.addEventListener('click', (e) => {
    const btnID = e.target.dataset.id;
    const content = document.getElementById(btnID);
    allContents.forEach(element => {
        element.classList.remove('active');
    });
    tabBtn.forEach(btn => {
        btn.classList.remove('active');
    });
    content.classList.add('active');
    e.target.classList.add('active');
})

//comment
//마지막 두줄 - 각각 forEach에 넣으면 더 깔끔해짐