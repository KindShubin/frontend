//first function for eath task. 
// - hide/unhide Task info;
// - fill inputs and listen button Go fo processing task data
function preparingTask(nextFunc){
	const output = this.querySelector('.taskItem__output');
	const btnTask = this.querySelector('button');
	const submitBtn = output.querySelector('input[type="button"]');
	const result = output.querySelector('.taskItem__result');
	output.classList.toggle("hide");
	submitBtn.addEventListener('click', nextFunc);
}
//func use for genarate div with Result info for each task
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
//get tag form whith input data and give back array 
function getDataFromForm(idForm){
	const result = [];
	for(i = 0; i < idForm.length; i++){
		result.push(idForm.elements[i].value);
	}
	// idForm.forEach(element => result.push(element.value));
	return result;
}
function removeDivElement(element){
	try{ 
		element.remove();
	} catch(error) {
		console.log(error);
	}
}
//////////////////////////////////////////////////////////////////////////
function firstTask(){
	const output = this.parentNode.parentNode.parentNode;
	const inputData = output.getElementsByClassName('taskItem__inputData')[0];
	const form = inputData.querySelector('form');
	const submitBtn = this;
	const oldResult = output.querySelector('.taskItem__result');
	removeDivElement(oldResult);
	const inputParamArr = getDataFromForm(form);
	const num1 = inputParamArr[0];
	const num2 = inputParamArr[1];
	const num3 = inputParamArr[2];
	// output.classList.remove("hide");
	const result = getNewResultDiv(num1,num2,num3);
	if (isNaN(num1) || isNaN(num2) || isNaN(num3)){
		result.innerHTML += "Error. Enter values is not a numbers!<br>";
		output.appendChild(result);
		return;
	}
	if(num1 == num2 || num1 == num3 || num2 == num3){
		result.innerHTML += "Error. You should input different numbers!<br>";
		output.appendChild(result);
		return;
	}
	result.innerHTML += "Average value:"+avg(num1,num2,num3);
	output.appendChild(result);
	return;
}
function avg(num1, num2, num3){
	const result = (+num1 + +num2 + +num3) / 3;
	return isNaN(result) ? "?????" : result;
}
/////////////////////////////////////////////////////////////////////////////////
function secondTask(){
	const output = this.parentNode.parentNode.parentNode;
	const inputData = output.getElementsByClassName('taskItem__inputData')[0];
	const form = inputData.querySelector('form');
	const submitBtn = this;
	const oldResult = output.querySelector('.taskItem__result');
	removeDivElement(oldResult);
	const inputParamArr = getDataFromForm(form);
	const size = inputParamArr[0];
	const result = getNewResultDiv(size);
	const triangle = getSpanOfTriangle(size);
	result.appendChild(triangle);
	output.appendChild(result);
	return;
}
function getSpanOfTriangle(size){
	const result = document.createElement('span');
	for(i = 0; i < size; i++){
		result.innerHTML+="*".repeat(i+1);
		result.innerHTML+="<br>";
	}
	return result;
}
//////////////////////////////////////////////
function thirdTask(){
	const output = this.parentNode.parentNode.parentNode;
	const inputData = output.getElementsByClassName('taskItem__inputData')[0];
	const form = inputData.querySelector('form');
	const submitBtn = this;
	const oldResult = output.querySelector('.taskItem__result');
	removeDivElement(oldResult);
	const inputParamArr = getDataFromForm(form);
	const num1 = inputParamArr[0];
	const num2 = inputParamArr[1];
	const num3 = inputParamArr[2];
	const result = getNewResultDiv(num1, num2, num3);
	const maxNumber = getMaxNumber(num1,num2,num3);
	result.innerHTML += "Max number: "+maxNumber;
	output.appendChild(result);
	return;
}
function getMaxNumber(){
	let result = -Infinity;
	console.log(arguments);
	for(i = 0; i < arguments.length; i++){
		if(isNaN(arguments[i])){
			return "Error. All input values must by Numbers";
		}
		console.log("i:"+i+" arguments[i]:"+arguments[i]+" result:"+result);
		result = +arguments[i] > +result ? arguments[i] : result;
		console.log("result:"+result);
	}
	return result;
}
//////////////////////////////////////////////
function fourthTask(){
	const output = this.parentNode.parentNode.parentNode;
	const inputData = output.getElementsByClassName('taskItem__inputData')[0];
	const form = inputData.querySelector('form');
	const submitBtn = this;
	const oldResult = output.querySelector('.taskItem__result');
	removeDivElement(oldResult);
	const inputParamArr = getDataFromForm(form);
	const numA = inputParamArr[0];
	const numB = inputParamArr[1];
	const result = getNewResultDiv(numA, numB);
	if (+numA >= +numB) {
		result.innerHTML += "Error. First number A  must be less then B";
		output.appendChild(result);
		return;
	}
	const arr = getAllRangeNumbers(numA, numB);
	const summ = getSummOfArray(arr);
	const odd = getArrOddNumbers(arr);
	result.innerHTML += "Summ numbers: "+summ+"<br>";
	result.innerHTML += "Odd numbers: "+odd;
	output.appendChild(result);
	return;
}
function getAllRangeNumbers(numA, numB){
	let result = [];
	for(i=+numA + 1; i < +numB; i++){
		result.push(i);
	}
	return result;
}
function getSummOfArray(arr){
	let result = 0;
	arr.forEach(element => result+=element);
	return result;
}
function getArrOddNumbers(arr){
	let result = [];
	arr.forEach(element => element%2 == 0 ? false : result.push(element));
	return result;
}
//////////////////////////////////////////////
function fifthTask(){
	const output = this.parentNode.parentNode.parentNode;
	const inputData = output.getElementsByClassName('taskItem__inputData')[0];
	const form = inputData.querySelector('form');
	const submitBtn = this;
	const oldResult = output.querySelector('.taskItem__result');
	removeDivElement(oldResult);
	const inputParamArr = getDataFromForm(form);
	const n = inputParamArr[0];
	const result = getNewResultDiv(n);
	if (+n < 1) {
		result.innerHTML += "Error. Enter value more then 0";
		output.appendChild(result);
		return;
	}
	const arrFibo = getArrFibo(n);
	result.innerHTML += "Fibonacci sequence:<br>" + arrFibo;
	output.appendChild(result);
	return;
}
function getArrFibo(n){
	let result = [0];
	for(i = 1; i < n; i++){
		if(i == 1){
			result.push(1);
		} else{
			result.push(+result[i-1] + +result[i-2]);
		}
	}
	return result;
}
//////////////////////////////////////////////
function sixthTask(){
	const output = this.parentNode.parentNode.parentNode;
	const inputData = output.getElementsByClassName('taskItem__inputData')[0];
	const form = inputData.querySelector('form');
	const submitBtn = this;
	const oldResult = output.querySelector('.taskItem__result');
	removeDivElement(oldResult);
	const result = getNewResultDiv();
	result.classList.add('six_result');
	for(i = 1; i <= 10; i++){
		const subdiv = document.createElement('div');
		subdiv.innerHTML = '<b> '+i+' </b><br>';
		let row = getMultiplication(i);
		row.forEach(el => subdiv.innerHTML += el + '<br>');
		result.appendChild(subdiv);
	}
	output.appendChild(result);
	return;
}
function getMultiplication(n){
	let result = [];
	for(j = 1; j <= 10; j++){
		result.push(j + " * " + n + " = " + j * n);
	}
	// console.log(result);
	return result;
}
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
const task1 = document.getElementById('task1');
const task2 = document.getElementById('task2');
const task3 = document.getElementById('task3');
const task4 = document.getElementById('task4');
const task5 = document.getElementById('task5');
const task6 = document.getElementById('task6');
// task1.addEventListener('click',  preparingTask(firstTask));
// при передаче функции через аргумент другой функции,
// в данном случае передача funcFirstTask(firstTask)
// в функции funcFirstTask теряется контекст. Сбивает на window
// для этого можно использовать bind(<context>)
// let bindFirstTask = preparingTask.bind(task1);
task1.querySelector('#id_task_btn').addEventListener('click', function(){ 
	const bindFirstTask = preparingTask.bind(task1);
	bindFirstTask(firstTask)});
task2.querySelector('#id_task_btn').addEventListener('click', function(){
	const bindSecondTask = preparingTask.bind(task2);	
	bindSecondTask(secondTask);});
task3.querySelector('#id_task_btn').addEventListener('click', function(){
	const bindThirdTask = preparingTask.bind(task3);
	bindThirdTask(thirdTask);});
task4.querySelector('#id_task_btn').addEventListener('click', function(){
	const bindFourthTask = preparingTask.bind(task4);
	bindFourthTask(fourthTask);});
task5.querySelector('#id_task_btn').addEventListener('click', function(){
	const bindFifthTask = preparingTask.bind(task5);
	bindFifthTask(fifthTask);});
task6.querySelector('#id_task_btn').addEventListener('click', function(){
	const bindSixthTask = preparingTask.bind(task6);
	bindSixthTask(sixthTask);});

