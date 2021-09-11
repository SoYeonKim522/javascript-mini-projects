const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4'); //NOTE! h4 추가가능
//console.log(items)  //0: h4.days,  1: h4.hours...

let futureDate = new Date(2021,2,2,9,0,0); //년, 월(index number적용), 일, 시(24시간제), 분, 초  (괄호 비우면 현재시간)
 //extract date values (년,시,분,일-간단/ 월, 요일-0으로 시작하는 인덱스임)
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

let month = futureDate.getMonth(); //month = 4
    month = months[month];
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} 0${hours}:0${minutes}am`;   //cf. innerHTML은 태그까지 포함해서 html로 넣어줌

//future time in millisec 현재시각과 미래시각을 각각 millisec 단위로 변환 후, 빼고, 그 값을 다시 시분초로 변환
const futureTime = futureDate.getTime();  //getTime: millisec 단위로 시간을 나타냄

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime-today;
  //values in ms
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;

  let days = t/oneDay;
  days = Math.floor(days);    //몫만 놔두고 소수점 다 버려라
  let hours = (t % oneDay) / oneHour;  //day를 다 계산하고 남은걸로만 hour계산(days가 아니고 oneday!)
  hours = Math.floor(hours);
  let minutes = Math.floor((t % oneHour) / oneMinute);  //math.floor합쳐 한줄로
  let seconds = Math.floor((t % oneMinute) / 1000);
 
  //set values array; 값을 한번에 넣기 위해
  const values = [days, hours, minutes, seconds];
  
  function format(item){    //10이하이면 앞에 0 붙여주는 함수
    if(item<10){
      return item = `0${item}`
    }
    return item;
  }

  items.forEach(function(item,index){  //콜백함수 이름이 item
    item.innerHTML = format(values[index])  //format함수를 적용하여 순서대로 넣어라 (values배열에서의 인덱스와 items nodelist에서의 인덱스가 같기 때문에 이렇게)
    //console.log(item, index); // <h4 class = 'days'>@@</h4>0 ...
  }); //item.innerHTML = format( values[0], values[1]...)
  
  if (t<0){
    clearInterval(countdown);  //매초마다 불러오는 거 멈춰라
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`; //html에는 .expired가 없고 css만 정의되어 있음
  } //css에 
}
//countdown
let countdown = setInterval(getRemainingTime, 1000)  //인자:(뭐에 대한 interval인지, interval간격)

getRemainingTime();    //interval 설정한 후 함수 호출해야함!

