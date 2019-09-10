//Массив объектов:
var question = [
	{
		text: 'Вопрос 1 текст тыры-пыры?',
		img: 'img link1',
		answer: ['ответ 1', 'ответ 2', 'ответ 3'],
		answerTrue: 1,
		prompt: 'html text',
		topic: 1,
		ticket: 65,
		tickeTopic: 5,
	},
	{
		text: 'Вопрос 2 текст тыры-пыры?',
		img: 'img link2',
		answer: ['ответ 1', 'ответ 2', 'ответ 3'],
		answerTrue: 2,
		prompt: 'html text',
		topic: 2,
		ticket: 64,
		tickeTopic: 2,
	},
	{
		text: 'Вопрос 3 текст тыры-пыры?',
		img: 'img link3',
		answer: ['ответ 1', 'ответ 2', 'ответ 3'],
		answerTrue: 3,
		prompt: 'html text',
		topic: 3,
		ticket: 67,
		tickeTopic: 3,
	},
];

//добавить элемент в конец массива
question.push({
		text: 'Вопрос 4 текст тыры-пыры?',
		img: 'img link3',
		answer: ['ответ 1', 'ответ 2', 'ответ 3'],
		answerTrue: 3,
		prompt: 'html text',
		topic: 3,
		ticket: 67,
		tickeTopic: 3,
	}
);

//массив билетов
var tickets = {
	t01: [1,3,56,7,98,54,6,12,34,55,21,33,27,25,78,45,41,66,44,11],
	t02: [2,3,56,7,98,54,6,12,34,55,21,33,27,25,78,45,41,66,44,11],
	//...
	t80: [80,3,56,7,98,54,6,12,34,55,21,33,27,25,78,45,41,66,44,11],
};