//////////////////////////////////////////////////////////////////////////
/////////////////////////////BEGIN////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
const task1 = document.getElementById('task1');
const task2 = document.getElementById('task2');
const task3 = document.getElementById('task3');
const task4 = document.getElementById('task4');
const task5 = document.getElementById('task5');
const task6 = document.getElementById('task6');
// Было: task1.addEventListener('click',  preparingTask(firstTask));
// при передаче функции через аргумент другой функции,
// в данном случае передача funcFirstTask(firstTask)
// в функции funcFirstTask теряется контекст. Сбивает на window
// для сохранения контекста можно использовать bind(<context>)
// let bindFirstTask = preparingTask.bind(task1);
// bindFirstTask(<функция>)
task1.querySelector('#id_task_btn').addEventListener('click', function(){ 
	const bindFirstTask = preparingTask.bind(task1);
	bindFirstTask(firstTask);
	// preparingTask.bind(task1)(firstTask);
});
task2.querySelector('#id_task_btn').addEventListener('click', function(){
	preparingTask.bind(task2)(secondTask);});
task3.querySelector('#id_task_btn').addEventListener('click', function(){
	preparingTaskThree.bind(task3)(thirdTask);});
task4.querySelector('#id_task_btn').addEventListener('click', function(){
	preparingTask.bind(task4)(fourthTask);});
task5.querySelector('#id_task_btn').addEventListener('click', function(){
	preparingTask.bind(task5)(fifthTask);});
//////////////////////////////////////////////////////////////////////////
// first function for each task. 
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
//func genarate div "Result:" with input data for each task
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
function generateNumArray(size){
	let arr = new Array(size);
	arr.fill(0);
	arr.forEach((e,index) => 
		arr[index] = Math.round(Math.random()*1000*(Math.random() > 0.5 ? 1 : -1)));
	return arr;
}
class DOMOfTask {
	constructor(goBtn){
		this.output = goBtn.parentNode.parentNode.parentNode;
		this.inputData = this.output.getElementsByClassName('taskItem__inputData')[0];
		this.form = this.inputData.querySelector('form');
		this.submitBtn = goBtn;
		this.oldResult = this.output.querySelector('.taskItem__result');
		removeDivElement(this.oldResult);
		this.inputParamArr = getDataFromForm(this.form);
	}
}
//////////////////////////////////////////////////////////////////////////
// создал наследникf от Array и добавил пару методов
function firstTask(){
	const dom = new DOMOfTask(this);
	console.log(dom);
	arr = generateNumArray(10);
	dom.inputData.querySelector("div").innerHTML = arr;
	console.log("arr:"+arr);
	class NewArray extends Array {
		wtf() { console.log('works!'); }
		//sqrt - возводит во вторую степень все элементы и отдает результирующий массив
		sqrt(){
			arr = new NewArray();
			this.forEach(e => arr.push(e*e))
			return arr;
		}
		//random - миксует все значения массива в рандомном порядке и отдает результат
		random(){
			const arr = new NewArray(this.length);//empty result array
			this.forEach(function(e) {
				const arrIndex=[];	//вспомогательный массив для хранения индексов результирующего 
									//массива в которы[] еще остались пустые ячейки
				const iterator = arr.keys();
				for (const key of iterator){
					// console.log("key: " + key + " | arr[key]: " + arr[key]);
					if (arr[key] == undefined) {
						arrIndex.push(key);
					}
				}
				const random = Math.floor(Math.random() * arrIndex.length);
				arr[arrIndex[random]] = e;
			});
			return arr;
		}
		
	}
	let newarr = new NewArray();
	arr.forEach(e => newarr.push(e));
	newarrsqrt = newarr.sqrt();
	newarrrand = newarr.random();
	// output.classList.remove("hide");
	const result = getNewResultDiv();
	result.innerHTML += "Cоздал наследника NewArray от Array и добавил ему пару методов: sqrt() random()<br>";
	result.innerHTML += "let newarr = new NewArray();<br>";
	result.innerHTML += "newarr.sqrt() --> возводит во 2 степень каждый элемент и отдает результат<br>";
	result.innerHTML += newarrsqrt + "<br>";
	result.innerHTML += "newarr.random() --> перемешивает местами все элементы массива и возвращает результат<br>";
	result.innerHTML += newarrrand + "<br>";
	dom.output.appendChild(result);
}
//////////////////////////////////////////////////////////////////////////
function secondTask(){
	const dom = new DOMOfTask(this);
	console.log(dom);
	const size = dom.inputParamArr[0];
	const a = dom.inputParamArr[1];
	const b = dom.inputParamArr[2];
	arr = generateNumArray(+size);
	console.log("a:"+a+" b: "+b+" arr:");
	console.log(arr);
	dom.inputData.querySelector("div").innerHTML = arr;
	
	const resArr = arr.slice(a,b);
	console.log(resArr);
	const result = getNewResultDiv(size, a, b);
	result.innerHTML += resArr;
	dom.output.appendChild(result);
}
//////////////////////////////////////////////////////////////////////////
function thirdTask(arr){
	console.log("thirdTask()");
	console.log(this);
	const dom = new DOMOfTask(this);
	console.log(dom);
	console.log("thirdTask() arr:");
	console.log(arr);
	const result = getNewResultDiv(arr);
	const sortarr = arr.sort(function(a,b){return a-b;});
	console.log("thirdTask() sort arr:");
	console.log(sortarr);
	result.innerHTML += sortarr;
	dom.output.appendChild(result);
	return;
}
function preparingTaskThree(nextFunc){
	console.log(this);
	const output = this.querySelector('.taskItem__output');
	const form = output.querySelector('form');
	const btnTask = this.querySelector('button');
	console.log(btnTask);
	const submitBtn = output.querySelector('#idForm3__go');
	console.log(submitBtn);
	const addBtn = output.querySelector('#idForm3__add');
	console.log(addBtn);
	const newElement = output.querySelector('#idForm3__addInput');
	const genareteCheck = output.querySelector('input[type="checkbox"]');
	const result = output.querySelector('.taskItem__result');
	console.log("nextFunc:");
	console.log(nextFunc);
	let array = [];
	output.classList.toggle("hide");
	addBtn.addEventListener('click', function(){
		console.log("newElement.value:" + newElement.value);
		if (!newElement.value.isNaN){
			array.push(+newElement.value);
		}
		form.querySelector('div').innerHTML += (+newElement.value + ', ');
	});
	genareteCheck.addEventListener('change', function(){
		if (this.checked){
			array=generateNumArray(10);
			console.log("generete arr:");
			console.log(array);
			form.querySelector('div').innerHTML = "Initial array:<br>";
			form.querySelector('div').innerHTML += array;	
		} else {
			array = undefined;
			form.querySelector('div').innerHTML = "Initial array:<br>";
		}	
	});
	// submitBtn.addEventListener('click', nextFunc);
	submitBtn.addEventListener('click', function(){
		nextFunc.bind(this)(array)});
}
//////////////////////////////////////////////////////////////////////////
function fourthTask(){
	const dom = new DOMOfTask(this);
	const numA = dom.inputParamArr[0];
	const numB = dom.inputParamArr[1];
	const result = getNewResultDiv(numA, numB);
	if (+numA >= +numB) {
		result.innerHTML += "Error. First number A  must be less then B";
		dom.output.appendChild(result);
		return;
	}
	const arr = getAllRangeNumbers(numA, numB);
	const summ = getSummOfArray(arr);
	const odd = getArrOddNumbers(arr);
	result.innerHTML += "Summ numbers: "+summ+"<br>";
	result.innerHTML += "Odd numbers: "+odd;
	dom.output.appendChild(result);
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
//////////////////////////////////////////////////////////////////////////
function fifthTask(){
	const dom = new DOMOfTask(this);
	const n = dom.inputParamArr[0];
	const result = getNewResultDiv(n);
	if (+n < 1) {
		result.innerHTML += "Error. Enter value more then 0";
		dom.output.appendChild(result);
		return;
	}
	const arrFibo = getArrFibo(n);
	result.innerHTML += "Fibonacci sequence:<br>" + arrFibo;
	dom.output.appendChild(result);
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
//////////////////////////////////////////////////////////////////////////
function sixthTask(){
	const dom = new DOMOfTask(this);
	const result = getNewResultDiv();
	result.classList.add('six_result');
	for(i = 1; i <= 10; i++){
		const subdiv = document.createElement('div');
		subdiv.innerHTML = '<b> '+i+' </b><br>';
		let row = getMultiplication(i);
		row.forEach(el => subdiv.innerHTML += el + '<br>');
		result.appendChild(subdiv);
	}
	dom.output.appendChild(result);
	return;
}
function getMultiplication(n){
	let result = [];
	for(j = 1; j <= 10; j++){
		result.push(j + " * " + n + " = " + j * n);
	}
	return result;
}


