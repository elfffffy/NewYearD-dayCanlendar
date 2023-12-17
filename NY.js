//modal 생성하는 함수
function showModal(imageUrl, text, displayTxt, num){
    console.log('num:', num)
    // 기존에 modal이 있으면 제거하기
    const existingModal = document.querySelector('.modal');
    if (existingModal){
        existingModal.remove();
    }
    
    //modal 생성
    const modal = document.createElement('div');
    modal.className = 'modal hidden';

    //modal content를 담는 컨테이너 생성
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content zoomIn';

    //이미지를 표시할 요소 생성
    const image = document.createElement('div');
    image.style.backgroundImage = `url(${imageUrl})`;
    image.alt = 'Rotate Image';
    image.style.width = '100%';
    image.style.height = '220px';

    modalContent.appendChild(image);

    //텍스트를 표시할 요소 생성
    const textElement = document.createElement('p');
    textElement.textContent = text;

    modalContent.appendChild(textElement);

    //저장한 텍스트 요소 생성
    const displayBox = document.createElement('div');
    modalContent.appendChild(displayBox);

    //localStorage에 저장된 값 불러오기
    const savedContent = JSON.parse(localStorage.getItem('saved-items'));
    console.log("savedContent", savedContent)
    if(savedContent){
        for (let i = 0; i < savedContent.length; i++){
            if (i === num - 18){
                 displayBox.textContent = savedContent[i];
                 displayBox.id = 'displayBox';
                 //console.log("saved", savedContent[i]);
            }
        }
    }
    else{
         displayBox.textContent = displayTxt;
         displayBox.id = 'displayBox';
         //console.log('displayTxt:', displayTxt);
    }

    //텍스트를 입력받을 요소 생성
    const textArea = document.createElement('textarea');
    textArea.id = 'modifyVal';
    textArea.placeholder = "내용을 입력하세요.";
    //
    if ((displayTxt === '')&&(displayBox.textContent === '')){
        modalContent.appendChild(textArea);
    }
    else {
       textArea.remove();
    }

    //취소 및 저장 버튼 생성
    const span = document.createElement('span');
    span.id = 'inBtn';
    const okBtn = document.createElement('button');
    okBtn.id = 'ok';
    okBtn.innerHTML = "저장";
    const cancleBtn = document.createElement('button');
    cancleBtn.id = 'cancle';
    cancleBtn.innerHTML = "나가기";
    

    //span에 취소 및 저장 버튼 추가
    span.appendChild(okBtn);
    span.appendChild(cancleBtn);

    modalContent.appendChild(span);

    //modalContent에 image와 textElement와 input 추가
        //modalContent.appendChild(image);
        //modalContent.appendChild(textElement);
        //modalContent.appendChild(displayBox);
        //modalContent.appendChild(textArea);
        // modalContent.appendChild(span);

    //modal에 modalContent 추가
    modal.appendChild(modalContent);

    //cancle버튼
    cancleBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    })

    //ok버튼
    okBtn.addEventListener('click', (event) => {
        const textAreaContent = document.getElementById("modifyVal").value;
        if(textAreaContent === ''){
            alert('내용을 입력하세요.');
        }
        else{
            saveText();
            saveItem(displayTxtList, savedContent);
            //사용자에게 입력받고 난 뒤, 입력창 제거
            textArea.remove();
        }  
    })
    
    //사용자에게 입력받은 텍스트 저장하기 - saveText
    function saveText(){
        const textAreaContent = document.getElementById("modifyVal").value;
        
        //console.log('textAreaContent:', textAreaContent);
        updateList(textAreaContent, num);

        const displayBox = document.getElementById("displayBox");
        if (displayBox){
            for(let i = 0; i < displayTxtList.length; i++){
                if (displayTxtList[i].number === num) {
                    //console.log('displayTxtList[i].number', displayTxtList[i].number);
                    //console.log('num', num);
                    const displayTxt2 = displayTxtList[i].displayText;
                    //console.log('displayTxt2', displayTxt2);
                    displayBox.textContent = displayTxt2;
                    displayTxt2.className = 'displayTxt';
                    break;
                }
            }
        }
    }

    //문서에 modal 추가
    document.body.appendChild(modal);

    //modal을 표시
    setTimeout(()=> modal.classList.remove('hidden'),0);
}

const modalMessageList = [
    {"number" : 18, "message" : "올해 내가 가장 재밌게 본 영화는?"},
    {"number" : 19, "message" : "올해 내가 많이 쓴 이모지 3가지는?"},
    {"number" : 20, "message" : "올해 내가 이룬 것은?"},
    {"number" : 21, "message" : "올해 내가 가장 맛있게 먹은 음식은?"},
    {"number" : 22, "message" : "올해 내가 가장 잊을 수 없는 사건은?"},
    {"number" : 23, "message" : "올해 내가 가장 비싸게 주고 산 것은?"},
    {"number" : 24, "message" : "올해 내가 새롭게 도전해 본 것은?"},
    {"number" : 25, "message" : "올해 가장 고마웠던 사람은?"},
    {"number" : 26, "message" : "올해 내가 가장 잘한 일은?"},
    {"number" : 27, "message" : "올해 내가 가장 많이 들었던 노래는?"},
    {"number" : 28, "message" : "올해 새로 생긴 취미는?"},
    {"number" : 29, "message" : "올해 가장 기억에 남는 밈은?"},
    {"number" : 30, "message" : "올해 들었던 말 중 가장 기분이 좋았던 말은?"},
    {"number" : 31, "message" : "2024년에 이루고 싶은 3가지 적어보기!"},
    {"number" : 32, "message" : "Happy New Year"}
];

//updatList
function updateList(txt, number){
    for(let i = 0; i < displayTxtList.length; i++){
        if (displayTxtList[i].number === number) {
            displayTxtList[i].displayText = txt;
            //console.log('수정된 text:', displayTxtList[i].displayText)
            //console.log('txt:', txt);
        }
    }
}

//displayTxtList
const displayTxtList = [
    {"number" : 18, "displayText": ''},
    {"number" : 19, "displayText": ''},
    {"number" : 20, "displayText": ''},
    {"number" : 21, "displayText": ''},
    {"number" : 22, "displayText": ''},
    {"number" : 23, "displayText": ''},
    {"number" : 24, "displayText": ''},
    {"number" : 25, "displayText": ''},
    {"number" : 26, "displayText": ''},
    {"number" : 27, "displayText": ''},
    {"number" : 28, "displayText": ''},
    {"number" : 29, "displayText": ''},
    {"number" : 30, "displayText": ''},
    {"number" : 31, "displayText": ''},
    {"number" : 32, "displayText": '★2024★'}
];
//localStorage에 저장하기
function saveItem(list, sc){
    const saveItems = [];
    //console.log("list", list);
    //console.log("saveItem", saveItems);
    //console.log("sc", sc);
    for (let i =0; i<list.length; i++){
        if(sc){
            console.log("sc 존재");
            //console.log("sc", sc);
            if(sc[i]){
                console.log("sc[i]", sc[i]);
                saveItems[i] = sc[i];
                console.log("i", i);
                console.log("saveItem", saveItems);
            }
            else{
                console.log('sc[i] 존재 하지 않음.')
                saveItems[i] = list[i].displayText;
                console.log("list[i].displayText", list[i].displayText);
            }
        }
        else{
            console.log("sc 존재안함");
            saveItems[i] = list[i].displayText;
        }
        //console.log("list[i].displayText", list[i].displayText);
        
        //console.log("saveItems", saveItems);
    }
    //console.log(JSON.stringify(saveItems));
    localStorage.setItem('saved-items', JSON.stringify(saveItems));
}