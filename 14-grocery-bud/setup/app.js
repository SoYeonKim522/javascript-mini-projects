// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;   //=편집모드. 기본적으로 false. 편집하기 버튼을 눌러야만 true로 바뀌도록 설정
let editID = "";


// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem);
//clear out items
clearBtn.addEventListener('click', clearItems);
//load item
window.addEventListener('DOMContentLoaded', setupItems);


// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();             //form은 기본적으로 서버로 제출되어 화면이 안뜨기 때문에 이걸 일단 막기
    const value = grocery.value;      //input에 넣은 값을 가져오기
    const id = new Date().getTime().toString()   //a smart/cheeky way of getting unique id number
    
    //값이 있고 편집모드가 아닌 경우 : 리스트에 추가
    if(value && !editFlag){                                 //긴 버전: value !=='' && editFlag === false
        createListItem(id, value);                   
        displayAlert('item added to the list', 'success');  //그에 맞는 alert 창 띄우기
        container.classList.add('show-container');          //css에서 grocery-container 숨김처리 풀기
        //add to local storage
        addToLocalStorage(id, value);                       //고유 id와 사용자가 입력한 값을 로컬스토리지에 저장
        //set back to default
        setBackToDefault();

    //편집모드인 경우 - 편집 후 add버튼을 눌러야 하기 때문에
    //editbtn을 클릭하면 editItem함수 실행 후(편집모드 켜지는 등) 이 부분 실행됨 
    } else if(value && editFlag){          //'value' 부분은 없어도 작동잘되긴함
        editElement.innerHTML = value;    //입력칸에 입력한 value를 아이템에 할당
        displayAlert('value changed', 'success');
        editLocalStorage(editID, value);    //인자 : Id말고 editID!, 새롭게 수정한 값(value)
        setBackToDefault();
        
    //값이 없는 경우    
    } else{
        displayAlert('please enter value', 'danger');
    } 
};

//display alert function _ 나중에 또 필요해서 함수로 만듬
function displayAlert(text, action){  //action - css에서 alert-danger를 선택할건지, alert-success를 선택할건지
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);     //css를 위한 클라스 추가는 그냥 alert에 해주면됨. 클래스를 동적으로 추가
    //remove alert after 1 sec
    setTimeout(() => {
     alert.textContent = '';                     //문구 지우기
     alert.classList.remove(`alert-${action}`)   //css(배경색)지우기
    }, 1000);
}

//clear out items fuction
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){                       // items이 하나라도 있다면 (list가 아니고 items임. item의 갯수=items의 nodelist 갯수)
        items.forEach((item) => {
            list.removeChild(item);             //list는 부모라서 removechild로 지워야   
        });
    }
    //list.textContent = '';                       //어차피 clear items버튼은 리스트가 있어야 나타나는데 굳이 if문 안쓰고 그냥 이렇게 해두 되나?
    container.classList.remove('show-container');  //->'clear items'버튼도 같이 없어짐
    displayAlert('successfully cleared!', 'success');
    setBackToDefault();
    localStorage.removeItem('list');                //'list' 키에 저장된 여러 아이템들(모든 데이터)이 다 지워짐
}

//delete  function : grocery list에서 grocery item을 삭제
function deleteItem(e){                                          //grocery-list > grocery-item > btn-container > btn 임
    const element = e.currentTarget.parentElement.parentElement; //부모의 부모 = <article class='grecery-item'> data-id값도 있음
    const id = element.dataset.id;   
    list.removeChild(element);
    //기능추가 - 아이템이 하나만 있는 상태에서 delete 했다면 아예 hide the container -> clear btn 안보이게
    if(list.children.length === 0){                             //grocery-item의 길이
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    //remove from local storage
    removeFromLocalStorage(id);
};

//edit function
function editItem(e){           
    const element = e.currentTarget.parentElement.parentElement;  //= <article class='grocery-item'> data-id값도 있음
    //set edit item(title에 접근)
    editElement = e.currentTarget.parentElement.previousElementSibling;  //edit-btn의 부모(button-container)의 형제(title) 선택
    //set form value(입력칸에 기존 value가 뜨도록)
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;                //editId는 완전히 새로운 값이 아니라, 편집할 아이템의 id값임
    submitBtn.textContent = 'edit'; ;  
};

//set back to default_여러번 쓸 예정. submit후 clear the value +알파의 기능 수행
function setBackToDefault(){
    grocery.value = '';         //입력칸에 있는 글자 지우기
    editFlag = false;
    editID = '';                //편집할 아이템의 id값은 그때그때 바뀌기 때문에 초기화해주는 것
    submitBtn.textContent = 'add'; 
};


// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){              //데이터 추가할 때는 key, value 둘 다 필요하니까 인자 두개 받는걸로 한듯? value는 사용자 입력값
    const grocery = {id, value};                    //=={id:id, value==value} 라는 객체형 데이터를 간단히 표현.  grocery는 맨위에서 설정한 변수랑은 다른 임의 로컬변수
    
    let items = getLocalStorage();                  //= 기존 저장되어있는 데이터 배열 형태 (items는 key-value짝에서 value에 해당. 배열형식--{id값,value값}, {id값,value값}...형식               
    console.log(items)                            // (처음 아이템을 입력했을 때는 빈배열로 나오고, 두번째부터는 모든 아이템이 나옴)
    items.push(grocery);                            //기존 저장되어 있던 데이터에 새로운 데이터를 추가
    localStorage.setItem('list', JSON.stringify(items))     //새로운 데이터가 추가된 배열을 stringify해서 다시 localstorage에 저장. 그때 키 이름은 list로 하자                                 
    // list:key,  items({id,value}):value  (list안에 value정보 저장)
}

function removeFromLocalStorage(id){        //인자로 넣은 id값을 가지고 있는 애를 지울꺼니까
    let items = getLocalStorage();          //일단 항상 현재의 localstorage 데이터를 가져오고 시작해야함

    items = items.filter((item) => {
        if(item.id !== id){                 //그 id값을 가지지 않은 item들만
            return item                     //그대로 리턴해라
        }                                   //removeItem 메소드는 '키'를 삭제하는 거라서 여기서 사용불가. 우리는 키가 'list'하나임. 
    });
    localStorage.setItem('list', JSON.stringify(items));  //그렇게 수정된 걸 다시 저장
};

function editLocalStorage(editId, value) {  //editId는 id로 써도 됨  (editID는 그 id를 가진 애를 수정할꺼라는 표시를 위한 것인듯)
    let items = getLocalStorage();      //일단 항상 현재의 localstorage 데이터를 가져오고 시작해야함
    items = items.map((item) => {       //items를 매핑할껀데 items의 요소들 중에 
        if (item.id === editId){        //id가 editId와 같은 요소는
            item.value = value;         //그 value 를 새로운 value로 바꿔라
        }
        return item;                    //if the id doesn't match, just return the item  - 이 부분 없으면 안됨
    })
    localStorage.setItem('list', JSON.stringify(items));  //수정사항 저장
}

function getLocalStorage() {                    //localstorage에 있는 기존 데이터를 가져오는 함수
    return localStorage.getItem('list')?        //list(key이름)가 있다면   (addtolocalstorage 함수를 통해 아이템이 추가되면 list 라는 키에 value들 넣을 예정임)
    JSON.parse(localStorage.getItem('list'))    //그 list를 파싱해서 가져와서(배열로 파싱됨) items에 할당하고 
    : [];                                       //list 가 없다면 빈 배열을 할당해
};

/* local storage 개념
브라우저 자체에 local storage api가 있음 
setItem,  getItem, removeItem, 등을 통해서 local storage에 접근
key,value형식. value는 값, key는 그 값에 대한 이름표 
모두 string으로 저장해야 함! -> 배열/객체형 데이터는 정보를 저장할 때 stringify, 불러올 땐 parse를 해줘야
-데이터 넣는 법: localStorage.setItem('key', JSON.stringify(["value", "value"]));    --데이터 저장할때는 key, value 둘 다 써야함!!
-데이터 가져오는 법: const keys = JSON.parse(localStorage.getItem('key'));           --불러올 때/삭제할 때는 key에 해당하는 것만 쓰면 됨!
-삭제하는 법: localStorage.removeItem('key');
*/


// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach((item) => {
            createListItem(item.id, item.value);   /** item의 id, item의 value 전달..! */
        });
    container.classList.add('show-container');
    }
}

function createListItem(id, value) {
    const element = document.createElement('article');  //<article class="grocery-item">부분 만드는 것 - 왜?? -> appendchild써야해서
    element.classList.add('grocery-item');              //article 에 grocery-item class 추가
    //add id
    const attr = document.createAttribute('data-id');   //그동안은 html에서 직접dataset를 추가했다면, 이번에는 js에서 추가
    attr.value = id;                                    //attr의 값을 위에서 정한 id값으로 한다
    element.setAttributeNode(attr);                     //add id속성 to element(article). 저 함수 중요

    element.innerHTML = `<p class="title">${value}</p>  
                <div class="btn-container">
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
                </div>`;                                   //article안에 있는 것만 가져와야함 (article이미 위에서 정의했으니까)
    
    //items are dynamically added -> delete, edit 처음에 로드될 때 no access라 단순히 eventlistener로 불가
    //->target selectors when you can access to them (which is this point) and then eventlistener
    //다른 방법: grocery-list에 이벤트리스너 걸고, target을 이용
    const deleteBtn = element.querySelector('.delete-btn');       //element instead of document!
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem); 
    editBtn.addEventListener('click', editItem);            
    
    list.appendChild(element);                                      //grocery-list에 추가 (부모div라 appendChild)
};