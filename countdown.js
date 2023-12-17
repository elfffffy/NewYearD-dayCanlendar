// 목표 날짜 설정 (예시: 2024년 1월 1일)
const targetDate = new Date("2024-01-01");

function updateCountdown() {
    // 현재 한국 시간을 얻어오기
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

    // 남은 시간 계산
    const timeRemaining = targetDate - now;

    // 시간, 분, 초 계산
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // 결과를 HTML에 업데이트
    const countdownElement = document.getElementById('countdown');
		countdownElement.style.color = '#FF9EA9'
    countdownElement.innerHTML = `
      <span>D-${days} ${hours}시간 ${minutes}분 ${seconds}초 </span>`;
}
// 페이지 로드 시에도 업데이트 수행
updateCountdown();

// 1초마다 업데이트
setInterval(updateCountdown, 1000);


// 날짜 기준 카드 오픈 기능
const rotates = document.querySelectorAll('.rotate');
rotates.forEach((rotate, index) => {//currentElement, index
  rotate.addEventListener('click', () => {
    // 현재 한국 시간을 얻어오기
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

    // 각 날짜에 해당하는 날짜를 계산
    const openDate = new Date(2023, 11, index + 18);
    //console.log("index", index);
    //console.log("openDate", openDate);

    // 현재 날짜가 열 수 있는 날짜 이후인지 확인
    if (now.getTime() > openDate.getTime()) {
      //카드 뒤집기
      const unlock = document.getElementsByClassName('rotate'); //unlock은 배열임.
      for (let i = 0; i < unlock.length; i++){
        //index 값과 일치할 경우에만 카드 뒤집기(전부 class가 rotate이기 때문에)
        if (i === index){
          //console.log("unlock[i]", unlock[i]);
          //console.log("unlock[i].style", unlock[i].style);
          //만약 뒤집혀 있는 경우에는 다시 앞면으로 뒤집을 것
          if(unlock[i].style.transform === 'rotateY(180deg)'){
            unlock[i].style.transform = 'rotateY(0deg)';
            console.log(index, "카드 앞면 나와!");
          }
          else{
            unlock[i].style.transform = 'rotateY(180deg)';
            console.log(index, "카드 뒷면 나와!");
          }
        }
      }
      //상위 div의 class 번호를 찾아서 imageUrl에 사용함.
      const imageUrl = `./image/Card/Card${index+18}.png`;
      //'back' 클래스를 가진 요소를 찾아 스타일 가져오기
      const rotateDiv = document.querySelector(`.day${index+18}`) //index..0부터 시작..
      const backDiv = rotateDiv.querySelector('.back');

      const style = window.getComputedStyle(backDiv);
      const pTag = backDiv.querySelector('p');
      const text = modalMessageList[index]['message'];
      const num = modalMessageList[index]['number'];
      const displayTxt = displayTxtList[index].displayText;

      //showModal 함수 호출
      showModal(imageUrl, text, displayTxt, num);
    } 
    else {
      // 현재 날짜가 열 수 있는 날짜보다 이전인 경우 몇 일 후에 열 수 있다는 메시지를 표시
      const daysRemaining = Math.ceil((openDate - now) / (1000 * 60 * 60 * 24));
      //console.log(openDate, now, daysRemaining)
      alert(`이 카드는 ${daysRemaining}일 후에 열 수 있어요!`);
    }
  });
});