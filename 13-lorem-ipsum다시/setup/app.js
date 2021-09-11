// lorem text
const text = [
  `Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut. Carrot cake caramels pie sweet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake dragée pie.`,
  `Next level tbh everyday carry, blog copper mug forage kitsch roof party pickled hammock kale chips tofu. Etsy shoreditch 8-bit microdosing, XOXO viral butcher banh mi humblebrag listicle woke bicycle rights brunch before they sold out ramps. Twee shabby chic taiyaki flannel, enamel pin venmo vape four loko. Hexagon kale chips typewriter kitsch 8-bit organic plaid small batch keffiyeh ethical banh mi narwhal echo park cronut.`,
  `Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.`,
  `Cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers kitty power ignore the squirrels, you'll never catch them anyway for what a cat-ass-trophy! or purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table. Pretend you want to go out but then don't bite off human's toes, yet disappear for four days and return home with an expensive injury; bite the vet so catch eat throw up catch eat throw up bad birds. `,
  `This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! Anyhoo, your net-suits will allow you to experience Fry's worm infested bowels as if you were actually wriggling through them.
I just told you! You've killed me! Fry! Quit doing the right thing, you jerk! Michelle, I don't regret this, but I both rue and lament it. Morbo can't understand his teleprompter because he forgot how you say that letter that's shaped like a man wearing a hat.`,
  `Airedale hard cheese mozzarella. Pecorino melted cheese port-salut emmental babybel cheese and wine melted cheese manchego. Everyone loves blue castello everyone loves fromage cheese slices airedale cheddar cream cheese. Bavarian bergkase who moved my cheese halloumi port-salut gouda jarlsberg ricotta rubber cheese. Stinking bishop smelly cheese brie.`,
  `Salvia glossier subway tile, leggings mustache YOLO semiotics chia. Pitchfork tbh af blog church-key meggings vaporware PBR&B master cleanse post-ironic man bun pabst mustache letterpress synth. Snackwave raw denim godard, 3 wolf moon shaman offal kitsch unicorn live-edge selvage schlitz fashion axe vaporware drinking vinegar prism. Shabby chic tacos artisan, chambray chicharrones cardigan leggings typewriter af pop-up williamsburg meditation PBR&B viral. You probably haven't heard of them DIY jean shorts subway tile fashion axe bushwick kitsch tumeric cloud bread vaporware freegan franzen pork belly chicharrones banh mi.`,
  `Man braid celiac synth freegan readymade, pitchfork fam salvia waistcoat lomo bitters gentrify four loko. Pitchfork semiotics post-ironic vegan. Tofu meditation microdosing hashtag semiotics venmo. Flexitarian vape tilde taiyaki. Prism poutine farm-to-table, messenger bag vegan taxidermy tattooed sartorial squid jean shorts fixie selvage trust fund vape.`,
  `Rutters Plate Fleet boom chandler Brethren of the Coast handsomely lookout marooned brigantine knave. Buccaneer gangway jack rum loot spyglass line Jack Tar fore gaff. Gaff topmast scuttle ballast swab draught measured fer yer chains dance the hempen jig Chain Shot yardarm.`,
];

//복습 안하고 바로 해보기

const form = document.querySelector('.lorem-form');
const submitBtn = document.querySelector('.btn');
const parapragh = document.querySelector('.lorem-text');
const inputNumber = document.getElementById('lorem'); 
//const inputValue = parseInt(document.getElementById('lorem').value);  -왜인지는모르겠지만 이렇게 바로 value를 parseInt해버리면 안됨..!!ㅠㅠㅠㅠㅠ
/*
form.addEventListener('submit', (e) => {      //버튼이 아니고 form에 이벤트..!!!!!
  e.preventDefault();
  if(0 < inputValue < text.length+1){
    parapragh.innerHTML = text.slice[0,inputValue-1]   //slice[]가 아니라 ()임..!!!ㅜㅠㅠㅠ 그리고 slice자체가 2번째인자를 포함 안함-> '-1'필요없음
    console.log('case1')
  }
  if(inputValue<=0 || inputValue>text.length || isNaN(inputValue)) {
    const i = Math.floor(Math.random()*text.length);
    parapragh.innerHTML = text[i]
    console.log('case2')
  }
});
*/

//답보고 수정
form.addEventListener('submit', (e) => {      
  e.preventDefault();
  const inputValue = parseInt(inputNumber.value);  //parseInt는 따로 해주기 ★
  const i = Math.floor(Math.random()*text.length);

  if(inputValue<=0 || inputValue>text.length || isNaN(inputValue)) {
    //parapragh.innerHTML =  (`<p class="result">${text[i]}</p>`);
    parapragh.innerHTML = text[i];            //윗줄 대신 이렇게 써도 됨
    console.log(typeof text[i])                //얘는 바로 string 타입..한개라서..?  (text는 object타입이라고 나옴)
  }  
  else {                                      //왜인지모르겠지만 if(0 < inputValue < text.length+1)로 하면 안됨..
    let tempText = text.slice(0,inputValue);        //이 자체는 타입이 object
    console.log(tempText)                           // -> ["~~~~"]형식으로 출력됨
    tempText = tempText.map((item) => {             //요소가 여러개 들어가 있는 object니까 매핑을 하고
      return (`<p class = "result">${item}</p>`);   //return!★
    }).join('');                                    //join('')★★ -> typeof tempText = stirng!
    parapragh.innerHTML = tempText;
    //console.log(typeof tempText)
  }
});

/*
//이렇게 하면 됨
form.addEventListener('submit', (e) => {     
  e.preventDefault();
  const inputValue = parseInt(inputNumber.value); 
  if(inputValue<=0 || inputValue>text.length || isNaN(inputValue)) {
    const i = Math.floor(Math.random()*text.length);
    parapragh.innerHTML = text[i]
    console.log('case2')
  } else {
    let tempText = text.slice(0,inputValue);
    tempText = tempText.map((item) => {
      return (`<p class = "result">${item}</p>`);  //return!★
    }).join('');                                                //join('')★★
    parapragh.innerHTML = tempText;
    console.log('case1')
    console.log(typeof tempText)
  }
});
*/
/*
form.addEventListener('submit', (e) => {      
  e.preventDefault();
  const inputValue = parseInt(inputNumber.value);  //parseInt는 따로 해주기 ★
  console.log(inputValue)
  const i = Math.floor(Math.random()*text.length);

  if(inputValue<=0 || inputValue>text.length || isNaN(inputValue)) {
    parapragh.innerHTML =  (`<p class="result">${text[i]}</p>`);
    console.log('case2')
  }  
  else {                                      //왜인지모르겠지만 if(0 < inputValue < text.length+1)로 하면 안됨..
    parapragh.innerHTML = text.slice(0,inputValue-1)  
    console.log(typeof text.slice(0,inputValue-1) )
  }
});*/