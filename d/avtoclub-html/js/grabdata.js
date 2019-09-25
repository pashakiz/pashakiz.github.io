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

questions.shift();
console.log( JSON.stringify(questions, null, 4) );

/*========================================================================*/
// поиск дублей
function checkDoubles() {
	var indexes = [];
	var res = [{text:'text', indexes: [0,0,0]}];
	for (var i = 0; i < questions.length-1; i++) {
        for (var j = 0; j < questions.length-1; j++) {
        	if (i != j) {
                if (questions[i].text == questions[j].text) {
                    indexes.push(j);
				}
			}
		}
		if (indexes.length) {
            indexes.unshift(i);
            res.push({
            	text: questions[i].text,
				indexes: indexes
			});
		}
        indexes = [];
	}
    console.log( JSON.stringify(res, null, 1) );
}
/*=================================================================*/
// поиск дублей
var questionsStrs = [];
for (var i = 0; i < questions.length-1; i++) {
    questionsStrs.push(questions[i].img);
}
var testres = questionsStrs.filter(function (elem, pos, arr) {
    return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
});
console.log(testres);
/*=================================================================*/
function getAllImgs() {
    var res = [];
    for (var i = 0; i < questions.length-1; i++) {
        if (questions[i].img) {
        	res.push(questions[i].img);
		}
    }
    console.log(res);
}
/*=================================================================*/