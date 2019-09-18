var quest = document.getElementById('test').getElementsByTagName('li');

var questions = [
	{
		text: 'QUESTION TEST',
		img: '',
		answer: [
			'A1',
			'A2',
			'A3',
		],
		answerTrue: 0,
		prompt: 'html text',
	}
];

for (var i = 0; i < quest.length; i++) {

	var img = quest[i].childNodes[3].childNodes[1].src;
    //console.log(img);
	
	var question = quest[i].childNodes[5].innerText.split('\n');
	//console.log(question[1]); //question
	
	var alltext = quest[i].innerText; //all text
	var arr = alltext.split('\n');
	var answers = [];
	for (var j = 0; j < arr.length; j++) {
		if (arr[j] != '') {
			answers.push(arr[j].trim());
		}
	}
	answers.shift();
	//console.log(answers); //answers
	
	questions.push({
		text: question[1],
		img: img,
		answer: answers,
		answerTrue: res[i]-1,
		prompt: ''
	});

}

console.log( JSON.stringify(questions, null, 4) );



БИЛЕТ2:

[
    {
        "text": "QUESTION TEST",
        "img": "",
        "answer": [
            "A1",
            "A2",
            "A3"
        ],
        "answerTrue": 0,
        "prompt": "html text"
    },
    {
        "text": "При движении на автомобилях, оборудованных ремнями безопасности, пристегиваться ремнями должны:",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/noimage.png",
        "answer": [
            "Только водитель.",
            "Только водитель и пассажир на переднем сиденье.",
            "Все лица, находящиеся в автомобиле."
        ],
        "answerTrue": 2,
        "prompt": ""
    },
    {
        "text": "Можете ли вы въехать на мост первым?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-02.jpg",
        "answer": [
            "Да.",
            "Нет."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "С какой максимальной скоростью вы можете продолжить движение на грузовом автомобиле с разрешенной максимальной массой не более 3,5 т?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-03.jpg",
        "answer": [
            "60 км/ч.",
            "70 км/ч.",
            "80 км/ч."
        ],
        "answerTrue": 2,
        "prompt": ""
    },
    {
        "text": "Что запрещено в зоне действия этого знака?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-04.jpg",
        "answer": [
            "Движение автомобилей со скоростью менее 20 км/ч.",
            "Движение пешеходов по проезжей части.",
            "Учебная езда."
        ],
        "answerTrue": 2,
        "prompt": ""
    },
    {
        "text": "Разрешен ли вам обгон, если реверсивные светофоры отключены?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-05.jpg",
        "answer": [
            "Разрешен.",
            "Разрешен, если скорость автобуса менее 30 км/ч.",
            "Не разрешен."
        ],
        "answerTrue": 2,
        "prompt": ""
    },
    {
        "text": "В каких направлениях вам разрешено продолжить движение?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-06.jpg",
        "answer": [
            "Только налево.",
            "Прямо и налево.",
            "Налево и в обратном направлении."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "Поднятая рука вверх водителя легкового автомобиля является сигналом, информирующим вас:",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-07.jpg",
        "answer": [
            "О его намерении повернуть направо.",
            "О его намерении продолжить движение прямо.",
            "О его намерении снизить скорость, чтобы остановиться и уступить дорогу мотоциклисту."
        ],
        "answerTrue": 2,
        "prompt": ""
    },
    {
        "text": "Двигаясь по левой полосе, вы намерены перестроиться на правую. На каком из рисунков показана ситуация, в которой вы обязаны уступить дорогу?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-08.jpg",
        "answer": [
            "На левом.",
            "На правом.",
            "На обоих."
        ],
        "answerTrue": 2,
        "prompt": ""
    },
    {
        "text": "Разрешен ли вам разворот в указанном месте?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-09.jpg",
        "answer": [
            "Разрешен только при отсутствии приближающегося поезда.",
            "Разрешен.",
            "Запрещен."
        ],
        "answerTrue": 1,
        "prompt": ""
    },
    {
        "text": "В каких случаях вы можете наезжать на прерывистые линии разметки, разделяющие проезжую часть на полосы движения?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/noimage.png",
        "answer": [
            "Только при перестроении.",
            "Только при движении в темное время суток.",
            "Только если на дороге нет других транспортных средств.",
            "Во всех перечисленных случаях."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "Разрешено ли вам обогнать мотоциклиста?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-11.jpg",
        "answer": [
            "Разрешено.",
            "Запрещено."
        ],
        "answerTrue": 1,
        "prompt": ""
    },
    {
        "text": "Нарушил ли водитель грузового автомобиля с разрешенной массой не более 3,5 т правила стоянки в данной ситуации?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-12.jpg",
        "answer": [
            "Да.",
            "Нет."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "Вы намерены повернуть налево. Кому следует уступить дорогу?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-13.jpg",
        "answer": [
            "Только пешеходам.",
            "Только автобусу.",
            "Автобусу и пешеходам.",
            "Никому."
        ],
        "answerTrue": 2,
        "prompt": ""
    },
    {
        "text": "Вы намерены повернуть налево. Ваши действия?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-14.jpg",
        "answer": [
            "Проедете перекресток первым.",
            "Уступите дорогу автомобилю."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "Обязан ли мотоциклист уступить вам дорогу в данной ситуации?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-15.jpg",
        "answer": [
            "Да.",
            "Нет."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "В данной ситуации вы:",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/02-16.jpg",
        "answer": [
            "Должны уступить дорогу автобусу, начинающему движение от обозначенного места остановки.",
            "Имеете преимущество, т.к. водитель автобуса начинает движение с выездом на вторую полосу."
        ],
        "answerTrue": 1,
        "prompt": ""
    },
    {
        "text": "В каких из перечисленных случаев запрещена буксировка на гибкой сцепке?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/noimage.png",
        "answer": [
            "Только на горных дорогах.",
            "Только в гололедицу.",
            "Только в темное время суток и в условиях недостаточной видимости.",
            "Правильные ответы 1 и 2."
        ],
        "answerTrue": 3,
        "prompt": ""
    },
    {
        "text": "Какая наименьшая величина остаточной высоты рисунка протектора допускается при эксплуатации мотоцикла?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/noimage.png",
        "answer": [
            "0,8 мм.",
            "1,0 мм.",
            "1,6 мм.",
            "2,0 мм."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "Что подразумевается под остановочным путем?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/noimage.png",
        "answer": [
            "Расстояние, пройденное транспортным средством с момента обнаружения водителем опасности до полной остановки.",
            "Расстояние, пройденное транспортным средством с момента начала срабатывания тормозного привода до полной остановки.",
            "Расстояние, соответствующее тормозному пути, определенному технической характеристикой данного транспортного средства."
        ],
        "answerTrue": 0,
        "prompt": ""
    },
    {
        "text": "Что подразумевается под временем реакции водителя?",
        "img": "http://avtoclub.dn.ua/test/test/ab_images/noimage.png",
        "answer": [
            "Время с момента обнаружения водителем опасности до полной остановки транспортного средства.",
            "Время со момента обнаружения водителем опасности до начала принятия мер по ее избежанию.",
            "Время, необходимое для переноса ноги с педали подачи топлива на педаль тормоза."
        ],
        "answerTrue": 1,
        "prompt": ""
    }
]
