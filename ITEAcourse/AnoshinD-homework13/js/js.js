//////////////////////////////////////////////////////////////////////////
/////////////////////////////BEGIN////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
const taskItem1 = document.getElementById('task1');
const taskItem2 = document.getElementById('task2');
const taskItem3 = document.getElementById('task3');
const taskItem4 = document.getElementById('task4');
const taskItem5 = document.getElementById('task5');
const taskItem6 = document.getElementById('task6');
// Было: taskItem1.addEventListener('click',  preparingTask(dataTask1));
// при передаче функции через аргумент другой функции,
// в данном случае передача preparingTask(dataTask1)
// в функции dataTask1 теряется контекст. Сбивает на window
// для сохранения контекста можно использовать bind(<context>)
// let bindFirstTask = preparingTask.bind(taskItem1);
// bindFirstTask(<функция>)
taskItem1.querySelector('.taskItem__btn').addEventListener('click', function(){ 
	const bindFirstTask = preparingTask.bind(taskItem1);
	bindFirstTask(dataTask1);
});
// taskItem1.querySelector('.taskItem__btn').addEventListener('click', function(){ 
// 	preparingTask.bind(task1)(dataTask1);
// });
taskItem2.querySelector('.taskItem__btn').addEventListener('click', function(){
	preparingTask.bind(taskItem2)(dataTask2);});
taskItem3.querySelector('.taskItem__btn').addEventListener('click', function(){
	preparingTask.bind(taskItem3)(dataTask3);});
taskItem4.querySelector('.taskItem__btn').addEventListener('click', function(){
	preparingTask.bind(taskItem4)(dataTask4);});
taskItem5.querySelector('.taskItem__btn').addEventListener('click', function(){
	preparingTask.bind(taskItem5)(dataTask5);});
//////////////////////////////////////////////////////////////////////////
/////////////additional functions and classes for all task////////////////
//////////////////////////////////////////////////////////////////////////
// first function for each task. 
// - hide/unhide Task info;
// - create DOM for task
function preparingTask(nextFunc){
	const dom = new DOMOfTask(this);
	dom.output.classList.toggle("hide");
	if(!dom.output.classList.contains("hide")){
		nextFunc.bind(this)(dom);
	}
}	
//func genarate div "Result:" with input data for each task
//if there is some arguments, printing it
function getNewResultDiv(){
	const result = document.createElement('div');
	result.classList.add('taskItem__result');
	result.innerHTML = '<b>Result: </b><br>';
	if(arguments.length == 0){
		return result;
	}
	const spanArgs = document.createElement('span');
	for(i = 0; i < arguments.length; i++){
		const string = "Value " + (i+1) + ": " + arguments[i] + " <br>";
		spanArgs.innerHTML += string;
	}
	result.appendChild(spanArgs);
	return result;
}
//give out tag of form whith input data and give back array
function getDataFromForm(idForm){
	const allInputsWithoutButton = idForm.querySelectorAll('input:not([type="button"])');
	const result = [];
	allInputsWithoutButton.forEach(e => result.push(e.value));
	return result;
}
function removeDivElement(element){
	try{ 
		element.remove();
	} catch(error) {
		console.log(error);
	}
}
// generate array with size. Values from -1000 to 1000.
function generateNumArray(size){
	let arr = new Array(size);
	arr.fill(0);
	arr.forEach((e,index) => 
		arr[index] = Math.round(Math.random()*1000*(Math.random() > 0.5 ? 1 : -1)));
	return arr;
}
class DOMOfTask {
	constructor(taskItem){
		this.btnTask = taskItem.getElementsByClassName('taskItem__btn')[0];
		this.output = taskItem.getElementsByClassName('taskItem__output')[0];
		this.inputData = this.output.getElementsByClassName('taskItem__inputData')[0];
		this.form = this.inputData.querySelector('form');
		this.submitBtn = this.form.getElementsByClassName('taskItem__inputData__goBtn')[0];
		this.oldResult = this.output.querySelector('.taskItem__result');
		this.inputParamArr = getDataFromForm(this.form);//not element. this array of input data
		removeDivElement(this.oldResult);
	}
}
///////////////////////////////TASK1//////////////////////////////////////
// создал наследника от Array и добавил пару методов
function task1(dom, operand1, operand2, sign){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(operand1, operand2, sign);
	result.innerHTML += `${operand1} ${sign} ${operand2} = `;
	result.innerHTML += calculate(operand1, operand2, sign);
	dom.output.appendChild(result);
}
function dataTask1(dom){
	// dom.form.querySelector('div').innerHTML = '';
	let operand1;
	let operand2;
	let sign;
	dom.submitBtn.addEventListener('click', function(){
		dom.inputParamArr = getDataFromForm(dom.form);
		operand1 = dom.inputParamArr[0];
		operand2 = dom.inputParamArr[1];
		sign = dom.inputParamArr[2];
		console.log("operand1: %s operand2: %s sign: %s", operand1, operand2, sign);
		if(checkIncorrectSign(sign) || checkIncorrectOperands(operand1, operand2)){
			dom.form.querySelector('div').innerHTML = "Initial data:<br>";
			dom.form.querySelector('div').innerHTML += checkIncorrectSign(sign);
			dom.form.querySelector('div').innerHTML += checkIncorrectOperands(operand1, operand2);
		} else{
			dom.form.querySelector('div').innerHTML = "";
			task1(dom, operand1, operand2, sign);
		}
		});
}
function calculate(operand1, operand2, sign){
	return 	sign == '-' ? +operand1 - +operand2 : 
			sign == '+' ? +operand1 + +operand2 : 
			sign == '*' ? +operand1 * +operand2 :
			sign == '/' ? +operand1 / +operand2 : undefined;
}
//if not + - / * - return text error/ If sign correct return false
function checkIncorrectSign(sign){
	if (sign == '-' || sign == '+' || sign == '*' || sign == '/'){
		return '';
	}
	return "Error. Sign must be + or - or * or /<br>";
}
function checkIncorrectOperands(operand1, operand2){
	if (isNaN(operand1)){
		return "Error. Operand1 is not Number<br>";
	}
	if (isNaN(operand2)){
		return "Error. Operand2 is not Number<br>";
	}
	return '';
}
///////////////////////////////TASK2//////////////////////////////////////
function task2(dom, number, exponent){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	console.log("task2() number:%s exponent:%s" , number, exponent);
	const result = getNewResultDiv(number, exponent);
	result.innerHTML += `${number} in ${exponent} degree = `;
	result.innerHTML += getExponentiate(number, exponent);
	dom.output.appendChild(result);
}
function dataTask2(dom){
	dom.form.querySelector('div').innerHTML = "";
	dom.submitBtn.addEventListener('click', function(){
		dom.inputParamArr = getDataFromForm(dom.form);
		const number = dom.inputParamArr[0];
		const exponent = dom.inputParamArr[1];
		const invalidNumber = isValueIsNAN(number, 'Number');
		const invalidExponent = isValueIsNAN(exponent, 'Degree');
		if(invalidNumber || invalidExponent){
			dom.form.querySelector('div').innerHTML = "Initial data:<br>";
			dom.form.querySelector('div').innerHTML += invalidNumber + invalidExponent;
		} else {
			dom.form.querySelector('div').innerHTML = "";
			task2(dom, number, exponent);
		}});
}
function getExponentiate(number, exponent){
	return Math.pow(number, exponent);
}
// true - return String error if argument isNaN
// false - return empty string
function isValueIsNAN(argument, name) {
	if (isNaN(argument)){
		return `Error. ${name} is not a number<br>`;
	}
	return '';
}
///////////////////////////////TASK3//////////////////////////////////////
function task3(dom, mychoice, pcchoice){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(mychoice, pcchoice);
	result.innerHTML += getResultFight(mychoice, pcchoice);
	dom.output.appendChild(result);
}

function dataTask3(dom){
	const choice = dom.output.querySelectorAll('.game__me_area > div:nth-child(n+2)');
	// const choice = dom.output.querySelectorAll('.game__me_area > div');
	const stone = dom.output.querySelector('.game__me_area > .stone');
	const scissors = dom.output.querySelector('.game__me_area > .scissors');
	const paper = dom.output.querySelector('.game__me_area > .paper');
	console.log(choice);
	console.log(stone);
	console.log(scissors);
	console.log(paper);
	var mychoice = '';
	var pcchoice = '';
	choice.forEach((elem) => {
		elem.addEventListener('click', function(){
			console.log(elem.classList);
			choice.forEach(e => e.classList.remove('bgGrey'));
			console.log(elem.classList);
			elem.classList.add('bgGrey');
			elem.classList.forEach(className => {
				// getting classes and get stone|scissors|paper
				mychoice = className == 'game__ssp_block' || className == 'bgGrey' 
					? mychoice : className;
			});
			pcchoice = getComputerChoise();
			console.log('mychoice: ' + mychoice);
			console.log('pcchoice: ' + pcchoice);
			task3(dom, mychoice, pcchoice);
		});
	});
}
// 0-0,333 - stone; 0,333-0,666 - scissors; <1 - paper
function getComputerChoise(){
	const rand = Math.random();
	console.log('rand:'+rand);
	if (rand < 1/3){
		return 'stone';
	}
	if (rand < 2/3){
		return 'scissors';
	}
	else {
		return 'paper';
	}
}
function getResultFight(mychoice, pcchoice){
	if (mychoice == pcchoice){
		return "DRAW";
	}
	switch (mychoice){
		case 'stone':
			if (pcchoice == 'scissors'){
				return "YOU WIN";
			} else {
				return "PC WIN";
			}
		case 'scissors':
			if (pcchoice == 'paper'){
				return "YOU WIN";
			} else {
				return "PC WIN";
			}
		case 'paper':
			if (pcchoice == 'stone'){
				return "YOU WIN";
			} else {
				return "PC WIN";
			}
		default:
			return 'wtf';
	}
}
///////////////////////////////TASK4//////////////////////////////////////
function task4(dom, n){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(n);
	array = getFibArr(n);
	// dom.form.querySelector('div').innerHTML = "Initial array:<br>";
	// dom.form.querySelector('div').innerHTML += array;
	result.innerHTML += array;
	result.innerHTML += `<br> ${n}th element: ${array[n-1]}<br>`;
	dom.output.appendChild(result);
}

function dataTask4(dom){
	dom.form.querySelector('div').innerHTML = '';
	// const n = dom.form.querySelector('input[type=text]');
	dom.submitBtn.addEventListener('click', function(){
		dom.inputParamArr=getDataFromForm(dom.form);
		const n = +dom.inputParamArr[0];
		console.log("n: %d", n);
		task4(dom, n);
	});

}

function getFibArr(n){
	if(n < 1) {
		return "Error. input number > 0";
	}
	if (n == 1) {
		return [0];
	}
	if (n == 2) {
		return [0, 1];
	}
	const result = [0, 1];
	for(let i=2; i<n; i++){
		result[i] = result[i-1] + result[i - 2];
	}
	return result;
}

///////////////////////////////TASK5//////////////////////////////////////
function task5(dom, table){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv();
	result.appendChild(table);
	dom.output.appendChild(result);
}

function dataTask5(dom){
	dom.form.querySelector('div').innerHTML = "Initial table:<br>";
	dom.submitBtn.addEventListener('click', function(){
		dom.inputParamArr=getDataFromForm(dom.form);
		const col = +dom.inputParamArr[0];
		const row = +dom.inputParamArr[1];
		let table = createTableElement(col, row);
		task5(dom, table);
		table = fillTheTable(table);
		task5(dom, table);	
	});
}

function createTableElement(col, row){
	const table = document.createElement("table");
	table.setAttribute('border', 1);
	for(let i=1; i<=row; i++){
		const row = document.createElement("tr");
		for(let j=1; j<=col; j++){
			const cell = document.createElement("td");
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	return table;
}

function fillTheTable(table){
	const rowsAll = table.getElementsByTagName("tr");
		console.log(rowsAll);
		Array.prototype.forEach.call(rowsAll, function(item, iRow, arr){
			const colsAll = item.getElementsByTagName("td");
			console.log(colsAll);
			Array.prototype.forEach.call(colsAll, function(item, iCol, arr){
				let textPrompt = "You make " + colsAll.length + " x " + rowsAll.length + " table\n";
				textPrompt += "Input text for " + (iCol+1) + " column, " + (iRow+1) + " row";
				item.innerHTML = prompt(textPrompt);
			});
		});
	return table;
}
//////////////////////////////////////////////////////////////////////////