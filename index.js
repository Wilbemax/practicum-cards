console.log(`

██╗    ██╗██╗██╗     ██╗     ██████╗ ███████╗███╗   ███╗ █████╗ ██╗  ██╗
██║    ██║██║██║     ██║     ██╔══██╗██╔════╝████╗ ████║██╔══██╗╚██╗██╔╝
██║ █╗ ██║██║██║     ██║     ██████╔╝█████╗  ██╔████╔██║███████║ ╚███╔╝ 
██║███╗██║██║██║     ██║     ██╔══██╗██╔══╝  ██║╚██╔╝██║██╔══██║ ██╔██╗ 
╚███╔███╔╝██║███████╗███████╗██████╔╝███████╗██║ ╚═╝ ██║██║  ██║██╔╝ ██╗
 ╚══╝╚══╝ ╚═╝╚══════╝╚══════╝╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
                                                                        
                                                                        
`);
const email = 'max22042007@yandex.ru';

const cardContainer = document.querySelector('#right_side');

let cards = [];

const FORM = document.forms.addHero;
const title_input = FORM.elements.title;
const description_input = FORM.elements.description;
const paramsStr_input = FORM.elements.str;
const paramsAgi_input = FORM.elements.agi;
const paramsHp_input = FORM.elements.hp;
const paramsInt_input = FORM.elements.int;
const paper_input = FORM.elements.paper;
const submitButton = document.querySelector('#addHero');

function render(cardsData) {
	cardContainer.innerHTML = '';

	for (let i = 0; i < cardsData.length; i++) {
		let card = cardsData[i];

		const cardPusher = `
            <div  class="card" id="card">
        
                <div class="card-typography">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-des">${card.description}</p>
             </div>

                <div class="card-params">
                <div calss='card-params-block'>
                    <p class="params">${card.str}</p>
                </div>
                <div calss='card-params-block'>
                <p class="params">${card.agi}</p>
                                </div>
                <div calss='card-params-block'>
                <p class="params">${card.hp}</p>
                                </div>
                                <div calss='card-params-block'>
                                <p class="params">${card.int}</p>
                                </div>
                    
                    
                    
                    
             </div>
         </div>
                    `;

		cardContainer.innerHTML += cardPusher;
	}
}

function onSubmit(event) {
	event.preventDefault();

	submitButton.disable = true;
	submitButton.textContent = 'Создаем карточку';

	let newCard = {
		title: title_input.value,
		description: description_input.value,
		str: paramsStr_input.value,
		agi: paramsAgi_input.value,
		hp: paramsHp_input.value,
		int: paramsInt_input.value,
		paper: paper_input.value,
	};

	let newCardJSON = JSON.stringify(newCard);

	fetch('https://api-code.practicum-team.ru/heroes', {
		method: 'POST',
		body: newCardJSON,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			cards.push(data);
			render(cards);
			FORM.reset();
		})
		.catch((e) => {
			console.log('error:' + e);
			submitButton.textContent = 'Произошла ошибка:(';
			setTimeout(() => {
				submitButton.textContent = 'Попробывать еще раз';
			}, 5000);
		})
		.finally(() => {
			submitButton.disable = false;
			submitButton.textContent = 'Карточка созданна ';
		});
}

fetch(
	`https://api-code.practicum-team.ru/heroes?_where[_or][0][studentEmail]=${email}&_where[_or][1][studentEmail]=`
)
	.then((response) => response.json())
	.then((data) => {
        console.log(data);
		cards = data;
		render(cards);
	}).catch((e)=> console.log(e));

FORM.addEventListener('submit', function onSubmit(event) {
	event.preventDefault();

	submitButton.disable = true;
	submitButton.textContent = 'Создаем карточку';

	let newCard = {
		title: title_input.value,
		description: description_input.value,
		str: paramsStr_input.value,
		agi: paramsAgi_input.value,
		hp: paramsHp_input.value,
		int: paramsInt_input.value,
	};

	let newCardJSON = JSON.stringify(newCard);

	fetch('https://api-code.practicum-team.ru/heroes', {
		method: 'POST',
		body: newCardJSON,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => response.json())
		.then((data) => {
           
			cards.push(data);
			render(cards);
			FORM.reset();
		})
		.catch((e) => {
			console.log('error:' + e);
			submitButton.textContent = 'Произошла ошибка:(';
			setTimeout(() => {
				submitButton.textContent = 'Попробывать еще раз';
			}, 5000);
		})
		.finally(() => {
			submitButton.disable = false;
			submitButton.textContent = 'Карточка созданна ';
		});
})
