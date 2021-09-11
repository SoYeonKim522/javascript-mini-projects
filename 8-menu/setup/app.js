//get only unique categories(겹치는거빼기(?)) - hardest one - use reduce method
//iterate over categories return buttons
//make sure to select buttons when they are avilable


//데이터를 배열로 나열
//보통 데이터들은 이렇게 local이 아니라 외부에서 받아올 것임
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
    title: "steak",
    category: "dinner",
    price: 36.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  }
];

//html에 데이터를 로드/추가하기
const sectionCenter = document.querySelector('.section-center');    //데이터들이 들어가야 할 컨테이너 : section-center

/*
window.addEventListener('DOMContentLoaded', function(){   // 로드될 때 이벤트함수추가 - 아래로 옮김
  displayMenuItems(menu);
}); */


function displayMenuItems(menuItems){             //필터링할때도 필요해서 이 부분은 밖으로 뺌
  let displayMenu = menuItems.map(function(item){         // html에서 해당부분 복붙해와서 수정하기
  return `<article class="menu-item">        
          <img src=${item.img} class="photo" alt=${item.title}>
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">${item.desc}</p>
          </div>
        </article>`;
  });
  displayMenu = displayMenu.join('');  //array이기 때문에 string으로 바꿔줌 +('')추가 안하면 article 사이에 콤마 들어감
  sectionCenter.innerHTML = displayMenu;
};

/* 버튼을 나이나믹하게 생성하는 걸로 바꾸면 이건 더이상 작동하지 않음 - 다른 곳으로 옮겨줘야함
//filter items
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(function(btn){
  btn.addEventListener('click', function(e){
    const category = e.currentTarget.dataset.id;    //being specific with 'dataset.property'
    const menuCategory = menu.filter(function(menuItem){  //배열을 필터링 (filtered out array)
      if(menuItem.category === category){
        return menuItem;
      }
    });
    //console.log(menuCategory);      //여기까지는 맞는 데이터를 필터링
    if(category === 'all'){           //여기서부터 그걸 html에 나타내는 함수
      displayMenuItems(menu);
    } else {
      displayMenuItems(menuCategory);  //위에서 만든 필터링한 배열을 인자로 넣어야
    }
  });
});
*/



//데이터의 카테고리에 따라 자동으로 버튼이 생성되고, 버튼 필터링도 되는 동작추가 (데이터 추가/수정에 효율적)
//get only UNIQUE categories - reduce 이용 (hardest part)
//iterate over categories and return buttons


window.addEventListener('DOMContentLoaded', function(){   // 로드될 때 이벤트함수추가
  displayMenuItems(menu);
  displayMenuBtns(); 
}); 

function displayMenuBtns(){
  const categories = menu.reduce(function(values, item){  //인자 두개:누적값&현재값. 누적값에 values라고 이름붙이고, 현재값은 item으로 하면
    if(!values.includes(item.category)){  
      values.push(item.category);
    }
    return values;  //그 카테고리 이름이 이미 있는 경우라면 스킵해라
  }, ['all']);    // 초기값 = ['all'] -> 모든 배열은 'all'을 포함하도록 함 (values가 배열이라서 all도 배열형태로 추가)

  const btnContainer = document.querySelector('.btn-container');  //여기부터 버튼들 html에 보여주기

  const categorBtns = categories.map(function(category){
    return `<button class="filter-btn" type="button" 
            data-id="${category}">${category}</button>`;
  }).join('');
  btnContainer.innerHTML = categorBtns;  //html로 옮겨짐

  // 이하 필터링 부분을 이 displaymenubtn함수 안으로 옮겨줘야함
  const filterBtns = btnContainer.querySelectorAll('.filter-btn');  //이 문장이 외부에서는 동작안함. 이렇게 버튼들이 다이나믹한 경우 html에 추가된 후에 선택해야 작동(중요!!!)

  filterBtns.forEach(function(btn){                   //버튼이 여러개라서 모든 버튼에게 이벤트를 적용하기 위해 foreach
    btn.addEventListener('click', function(e){
      const category = e.currentTarget.dataset.id;    //being specific with 'dataset.property'
      console.log(e.target.dataset.id)
      const menuCategory = menu.filter(function(menuItem){  //배열을 필터링 (filtered out array)
        if(menuItem.category === category){
          return menuItem;
        }
      });
      //console.log(menuCategory);      //여기까지는 맞는 데이터를 필터링
      if(category === 'all'){           //여기서부터 그걸 html에 나타내는 함수
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);  //위에서 만든 필터링한 배열을 인자로 넣어야
      }
    });
  });
}


