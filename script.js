console.log(`
██╗  ██╗ ██████╗ ██╗      ██████╗ ███╗   ███╗██╗███████╗████████╗███████╗    ███╗   ███╗ █████╗ ██╗  ██╗██╗███╗   ███╗
██║ ██╔╝██╔═══██╗██║     ██╔═══██╗████╗ ████║██║██╔════╝╚══██╔══╝██╔════╝    ████╗ ████║██╔══██╗╚██╗██╔╝██║████╗ ████║
█████╔╝ ██║   ██║██║     ██║   ██║██╔████╔██║██║█████╗     ██║   ███████╗    ██╔████╔██║███████║ ╚███╔╝ ██║██╔████╔██║
██╔═██╗ ██║   ██║██║     ██║   ██║██║╚██╔╝██║██║██╔══╝     ██║   ╚════██║    ██║╚██╔╝██║██╔══██║ ██╔██╗ ██║██║╚██╔╝██║
██║  ██╗╚██████╔╝███████╗╚██████╔╝██║ ╚═╝ ██║██║███████╗   ██║   ███████║    ██║ ╚═╝ ██║██║  ██║██╔╝ ██╗██║██║ ╚═╝ ██║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚══════╝   ╚═╝   ╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝
                                                                                                                      
`);

let name = document.querySelector('#inpuyName');
let description = document.querySelector('#inputDescription');
const image = document.querySelector('#inputImage');

//-------------------реализаци через масивы по тз
let cardsName = [];
let cardsDiscription = [];
let cardsImage = [];
let cardIndex = []

const newCard = () => {
    debugger
   if ( ( description.value === "" || (name.value === ""))) {
       alert('Все поля должны быть заполнены');
       
   } else {
       cardsName.push(name.value);
       cardsDiscription.push(description.value);
       cardIndex.push(cardsName.length)
   
       {
           cardsImage === 0
               ? cardsImage.push('Фотография не была звгруженна')
               : cardsImage;
       }
       displayCard(name, description, cardsImage);
   
       name.value = '';
       description.value = '';
       image.value = '';

   
       console.log('success 1');
   }
};

image.addEventListener('change', function (event) {
    
   // Получаем загруженный файл
   const file = event.target.files[0];

   // Создаем новый объект FileReader
   const reader = new FileReader();

   if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
       alert('Файл должен быть в формате .jpeg или .png');
       name.value = '';
       description.value = '';
       image.value = '';
       return;
   }
   // Добавляем обработчик события для успешного чтения файла
   reader.onload = function (event) {
       // Получаем URL содержимого файла
       let fileURL = event.target.result;

       // Вставляем URL изображения в компонент
       cardsImage.push(fileURL);
       fileURL = ""
   };

   // Читаем содержимое файла
   reader.readAsDataURL(file);

   console.log('success 2');
});

const displayCard = () => {
    
   let cardContainer = document.querySelector('#right_side');

   cardContainer.innerHTML = '';

   for (let i = 0; i < cardsName.length; i++) {
       let cardDiv = document.createElement('div');
       cardDiv.id = 'card'

       {
           cardsImage[i] === 'Фотография не была звгруженна'
               ? (cardDiv.innerHTML = ` <h3 class="card-title"> ${cardsName[i]} </h3> <p class="card-des">${cardsDiscription[i]}</p> `)
               : (cardDiv.innerHTML = `<img class="card-img" src="${cardsImage[i]} alt="${cardsName[i]}/> <h3 class="card-title"> ${cardsName[i]} </h3> <p class="card-des">${cardsDiscription[i]}</p>`);
       }

       // Добавляем кнопку удаления
       let deleteButton = document.createElement('button');
       deleteButton.textContent = 'Удалить';
       deleteButton.id = 'delet-button'
       deleteButton.addEventListener('click', function() {
           deletCard(i);
       });
       cardDiv.appendChild(deleteButton);

       cardContainer.appendChild(cardDiv);
   
   }
   console.log(cardIndex, cardsDiscription, cardsName, cardsImage);
};

document.querySelector('#button').addEventListener('click', newCard);

// document.querySelector("#deled").addEventListener("click", deletCard)


const deletCard = (index) => {
   // Удаляем карточку из массивов
   cardsName.splice(index, 1);
   cardsDiscription.splice(index, 1);
   cardsImage.splice(index, 1);

   // Обновляем отображение карточек
   displayCard();
}


