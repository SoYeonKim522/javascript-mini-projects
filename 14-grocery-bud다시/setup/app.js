//add item, display alert, clear all 등 까지는 혼자 함. delete, edit까지도 힘들게 했는데 처음 아이템에만 실행이 되어서 막힘
//로컬스토리지 큰 흐름은 이해했으나 아직 실전적용이 부족함
// ****** SELECT ITEMS **********
const input = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const alert = document.querySelector('.alert');
const listContainer = document.querySelector('.grocery-container');
const listContainer2 = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const form = document.querySelector('.grocery-form');


// edit option
let editElem;       //★★★★★
let editFlag = false;
let editId = '';

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem) //form에 이벤트주는거면 submit으루!
//submitBtn.addEventListener('click', addItem) //이렇게 해도 문제 없음!
clearBtn.addEventListener('click', clearAll)
window.addEventListener('DOMContentLoaded', setItem) //getlocalstorge를 실행하는게 아님

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const item = input.value;      //=입력한 값
    const id = new Date().getTime().toString()
    
    if(item && !editFlag){
        createNewList(id, item);             //리스트를 생성할 때부터 id도 인자로 같이 넘겨야!!★★
        displayAlert('item added', 'success');
        //listContainer.classList.add('show-container'); - createNewList안에 있어도 됨
        addToLocalStorage(id, item)
        backToDefault()
    }
    if(item && editFlag){   
        editElem.innerText = item    //editElem가 있으니 이 한줄로 해결가능ㅋ
        //원래 생각 : title이나 article 가져와서(근데 queryselectorall로 가져와야하니까 안됨) 아이디가 input아이디랑 같을 때만 innertext바꿔주려고 했었음
        //article의 id와 inputid 가 같으면 수정.아니면 리턴 item - global변수로 ★editElem★을 설정하면 이런거 할필요없음......
     
        displayAlert('item edited', 'success');
        editLocalStorage(editId, item);
        backToDefault()
    }
    if(!item){
        displayAlert('please enter value', 'danger')
    }
}

function createNewList(id, item){  
    //컨테이너에 바로 innerhtml하면 -> item이 하나밖에 추가가 안됨 -> appendchild써야함 ->  aritcle부터 create해서 추가해야함!
    const article = document.createElement('article');
    article.classList.add('grocery-item');
    article.setAttribute('id', id)        //article에 고유id주기
    article.innerHTML = 
        `<p class="title">${item}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                    <i class="fas fa-edit"></i>
                </button>
            </div>`;
  
  listContainer2.appendChild(article);          //-> 여러개 추가 가능
  listContainer.classList.add('show-container'); //additem - !editFlag 부분 말고 여기 있어도 됨

  const editBtn = article.querySelector('.edit-btn');       //article로 안하고 document로 했더니 edit, delete가 첫아이템만 적용되고 이상했었는데 원인이 이거일줄은 존나몰랏따,,ㅋ
  editBtn.addEventListener('click', editItem);
  const delBtn = article.querySelector('.delete-btn');
  delBtn.addEventListener('click', deleteItem);
}

function deleteItem(e){     //왜 처음 추가한 아이템만 됨...?? - 해결
    const delElem = e.currentTarget.parentElement.parentElement   //해당 article
    console.log(delElem)
    listContainer2.removeChild(delElem); //foreach로 지워야되나? 배열이 없어서 foreach사용불가

    if(listContainer2.children.length === 0){       //★children!!!의 길이★
        listContainer.classList.remove('show-container');
    }
    const id = delElem.id
    displayAlert('item deleted', 'danger')
    backToDefault();
    deleteLocalStorage(id)
    
}
function editItem(e){       //왜 처음 추가한 아이템만 됨...??-해결
    editElem = e.currentTarget.parentElement.previousElementSibling //이걸 전역변수로 그냥 설정해버리는 것★
    input.value = editElem.innerText;   //innerhtml아니어도 되나봄
    editFlag = true;
    editId =  e.currentTarget.parentElement.parentElement.id;  //해당 article의 id
    input.setAttribute('inputId', editId)
    console.log(input.getAttribute('inputId'))
    submitBtn.innerText = 'edit';
}

function clearAll(){
    listContainer2.innerHTML='';
    listContainer.classList.remove('show-container');
    //localStorage.removeItem('list');
}

function displayAlert(text, state){
    alert.innerText = text;
    alert.classList.add(`alert-${state}`)
    setTimeout(() => {
        alert.innerText = '';
        alert.classList.remove(`alert-${state}`)
    }, 1000);
}

function backToDefault(){
    input.value ='';
    editFlag = false;
    editId = '';  
    submitBtn.innerText = 'add'    
}

// ****** LOCAL STORAGE **********

function addToLocalStorage(id, item){       //이게 getLocalStorage보다 앞에 있어야!!!★★★
    const newItem = {id, item};
    let currentData = getLocalStorage();
    console.log(typeof currentData)
    currentData.push(newItem)       //새로운걸 currentdata에 넣었으니까
    localStorage.setItem('list', JSON.stringify(currentData))   //newitem이 아니라 currentdata를 stringify해줘야!!!!!!★
}

function getLocalStorage(){ 
    return JSON.parse(localStorage.getItem('list'))||[] //다른 강의에서 본거 적용해봤는데 되네
}   //google-> ||은 첫번째 truthy를 찾는 연산자이기 때문에 ternary operator 대신 이렇게 사용 가능!!!

function deleteLocalStorage(id){
//해당 id만 지우기 = filter로 id가 해당 안되는 것들만 리턴하기
    let currentData = getLocalStorage();
    console.log(currentData)  //object
    currentData = currentData.filter((item) => {
        if(id!==item.id){       //저장되는 요소에 id값이 있으므로 item.id가능
            return item
        }
    });
    localStorage.setItem('list', JSON.stringify(currentData))   //위에 다하고 그걸 다시 저장해줘야함!!!
};

function editLocalStorage(editId, item){
    //let currentData = getLocalStorage() 
    let currentData = JSON.parse(localStorage.getItem('list'))//googled - 이렇게 해도 되나봄
    currentData.map((elem) => {
        if(elem.id===editId){   
            elem.item = item;            
        } return elem;
    });
    localStorage.setItem('list', JSON.stringify(currentData))
}

// ****** SETUP ITEMS **********
//새로고침해도 원래 있는 데이터들 가져와 보여주기 - DID IT MYSELF!!!
function setItem(){
    const existingData =  getLocalStorage();
    if(existingData.length!==0){
        existingData.forEach((item) => {
            createNewList(item.id, item.item);
        });
    listContainer.classList.add('show-container');  //foreach안에있는 것보다는 밖에 있는게
    }
}