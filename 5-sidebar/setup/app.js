//sidebar을 css에서 디폴트로 안보이게 해놓고, 보이도록 하는 클래스를 토글하는 방식

const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

function openbar(){
    sidebar.classList.toggle('show-sidebar');
}

toggleBtn.addEventListener('click', openbar);
closeBtn.addEventListener('click', openbar); 
  // closeBtn의 경우 닫는 기능밖에 없어서 사실 toggle로 안해도 됨. 아래가 정석
  /* closeBtn.addEventListener('click', (){
      sidebar.classList.remove('show-sidebar')
  });
  */