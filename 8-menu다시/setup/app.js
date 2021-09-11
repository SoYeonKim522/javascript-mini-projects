const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "choc choc waffle",
    category: "dessert",
    price: 7.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  }
];

//순서: 자료 모두 가져오기 -> 버튼 동적으로 가져오기 -> 필터링 기능 만들기

const sectionCenter = document.querySelector('.section-center');  //점 빼먹지마..

//자료 모두 가져오기
function displayItem(items) { 
  const menuItem = items.map(item => {            //menuItem에는 인자가 필요 없음
    return `<article class="menu-item">           
            <img src=${item.img} alt=${item.title} class="photo">  
            <div class="item-info">
              <header>
                <h4>${item.title}</h4>
                <h4 class="price">${item.price}</h4>
              </header>
              <p class="item-text">${item.desc}</p>
            </div>
            </article>`;                          //<article>탭 부분 안넣었었음
  }).join(''); 
  sectionCenter.innerHTML = menuItem;
}

window.addEventListener('DOMContentLoaded', displayItem(menu));     //자료데이터 이름인 menu를 인자로 꼭 써줘야함
/*
function displayItem(items) {
  const placeMenu = document.querySelector('menu-item');
  menuItem(items) = items.map((item) => {
    return `
    <img src="./images/item-${item.id}.jpeg" alt="menu-item" class="photo">
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </header>
      <p class="item-text">${item.desc}</p>
    </div>`
  }).join('');
  console.log(menuItem)
  placeMenu.innerHTML = menuItem();
}
*/
/*
function displayItem(items) {
  const placeMenu = document.querySelector('menu-item');
  const menuItem = `
  <img src="./images/item-${items.id}.jpeg" alt="menu-item" class="photo">
  <div class="item-info">
    <header>
      <h4>${items.title}</h4>
      <h4 class="price">${items.price}</h4>
    </header>
    <p class="item-text">
      <p>${items.desc}</p>
    </p>
  </div>`
  const showItems = items.map((item) => {
    menuItem(item);
  }).join('');
  placeMenu.innerHTML = showItems;
}
*/

//버튼 동적으로 가져오기
function displayBtn(menu) {               //인자 menu 필요 없음..!
  const btnContainer = document.querySelector('.btn-container');
  let menuCategory = menu.map(({category}) => category);  //google: 배열의 특정 부분만 가져오기
  //console.log(menuCategory);

  let allBtn = new Set(menuCategory);
  allBtn = Array.from(allBtn);  //google!!! - set객체를 배열로 변환하는 방법
  allBtn.unshift('all');        //all은 배열 맨 앞에 추가
  //console.log(allBtn);        //["all", "breakfast", "lunch", "shakes"]
  
  let displayBtns = allBtn.map((item)=> {
    return `<button class="filter-btn" type="button" data-id="${item}">${item}</button>`
  }).join('');

  btnContainer.innerHTML = displayBtns;
  const filterBtn = document.querySelectorAll('.filter-btn');     //★★버튼 클래스가 html로 추가된 다음에 이 부분이 나와야 함★★
  
  //필터링 기능 만들기 - ★그리고 이 부분이 displayBtn 안으로 들어와야 함(밖에 두면 작동안됨)

  filterBtn.forEach(function(btn) {               //foreach - filterbtn 이 여러개니까 모두에게 이벤트리스너 추가하기 위해
    btn.addEventListener('click', (e) => {
      const btnID = e.target.dataset.id;     //강의에서는 currenttarget 으로 했는데 taret도 됨!
      //console.log(btnID)
      const menuCategory = menu.filter((menuItem) => {
        if(menuItem.category === btnID){          //filter 안에서도 if문을 쓸수있구나
          return menuItem;
        }
    });
      if(btnID == 'all'){
        displayItem(menu)    //인자로 menu 꼭!
      } else {
        displayItem(menuCategory)     //menuItem 이 아니라 filtered out array인 menucategory
      }
    });
  });
};


window.addEventListener('DOMContentLoaded', displayBtn(menu));




 

/*function filtering(e) {
  BtnID = e.target.dataset.id;   //버튼의 id
  let menuCategory = menu.map(({category}) => category);
  console.log(menuCategory)
  
  if(BtnID =! 'all'){
  filterItem = menuCategory.filter((item) => {
    item == BtnID;
    displayItem(filterItem);
  })
  } if(BtnID = 'all'){
    displayItem(menu);
  }
};

btnContainer.addEventListener('click', filtering);    //filterBtn 아니라 그 부모인 btnContainer에 이벤트 리스너!!!!
*/