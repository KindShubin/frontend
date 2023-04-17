//////////////////////////////////////////////////////////////////////////
//////////general functions and classes for all task//////////////////////
//////////////////////////////////////////////////////////////////////////
class DOMofTask {
	constructor(taskItem){
		this.btnTask = taskItem.getElementsByClassName('taskItem__btn')[0];
		this.output = taskItem.getElementsByClassName('taskItem__output')[0];
		this.inputData = this.output.getElementsByClassName('taskItem__inputData')[0];
		this.form = this.inputData.querySelector('form');
		this.textInputs = this.form.querySelectorAll('input[type="text"]');
		this.submitBtn = this.form.getElementsByClassName('taskItem__inputData__goBtn')[0];//goBtn
		this.result = this.output.querySelector('.taskItem__result');
		this.inputParamArr = new Array();//not element. this array of input data
		this.tempData = new Array();//not element. this array of temp data for task, like genereted array
		removeElement(this.result);
	}
}
// hide/unhide Task info;
// remove old result block, if it exist
function hideTask(){
	console.log("|hideTask this:|");
	console.log(this);
	this.output.classList.toggle("hide");
	if(!this.output.classList.contains("hide")){
		removeElement(this.result);
	}
}	
//func genarate div "Result:" with input data for each task
//if there is some arguments, printing it
function getNewResultDiv(dom){
	const result = document.createElement('div');
	result.classList.add('taskItem__result');
	result.innerHTML = '<b>Result: </b><br>';
	const spanArgs = document.createElement('span');
	dom.inputParamArr.forEach((e, index) => spanArgs.innerHTML += "Value " + (index+1) + ": " + e + "<br>");
	dom.tempData.forEach((e, index) => spanArgs.innerHTML += "Data " + (index+1) + ": " + e + "<br>");
	spanArgs.innerHTML += "<br>";
	result.appendChild(spanArgs);
	dom.result = result;
	return result;
}
//give out tag of form whith input data and give back array
function getDataFromForm(dom){
	const result = [];
	console.log("getDataFromForm");
	console.log(dom.textInputs);
	dom.textInputs.forEach(e => {
		const intVal = parseInt(e.value);
		result.push(isNaN(intVal) ? e.value : intVal);
		// console.log(e.value);
		// console.log(typeof(e.value));
		// console.log(+e.value);
		// console.log(Number(e.value));
		// console.log(parseInt(e.value));
		// try{
		// 	result.push(Number(e.value));
		// } catch{
		// 	result.push(e.value);
		// }
	});
		// e != undefined ? result.push(e.value) : null);
	return result;
}
function removeElement(element){
	try{ 
		element.remove();
	} catch(error) {
		// console.log("|removeDivElement error:|");
		// console.log(error);
	}
}
// generate array with size. Values from -1000 to 1000.
function generateNumArray(size){
	if(!size) {
		return null;
	}
	let arr = [];
	for(let i = 0; i<size; i++){
		arr[i] = Math.round(Math.random()*1000*(Math.random() > 0.5 ? 1 : -1));
	}
	return arr;
}
// доп методы warning... для визуала. Добавляет, удаляет следит за надписью рядом с пустым полем/кнопкой
function warningSpanForEmptyInput(inputElem){
	const warningSpan = inputElem.nextElementSibling;
	removeWarningAfterElement(inputElem);
	!inputElem.value ? createWarningAfterElement(inputElem, arguments[1]) : null;
}
function createWarningAfterElement(inputElem){
	const warningSpan = inputElem.nextElementSibling;
	removeWarningAfterElement(inputElem);
	const span = document.createElement('span');
	const action = arguments[1] ? arguments[1] : 'fill';
	span.innerText = `<--first ${action} here`;
	span.classList.add('warning');
	inputElem.insertAdjacentElement("afterend", span);
}
function removeWarningAfterElement(inputElem){
	const warningSpan = inputElem.nextElementSibling;
	warningSpan && warningSpan.className == 'warning' ? removeElement(warningSpan) : null;
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////// BEGIN ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
////////create variables for all task. Generate DOM for each task/////////
//////////////////////////////////////////////////////////////////////////
const taskItem1 = document.getElementById('task1');
const taskItem2 = document.getElementById('task2');
const taskItem3 = document.getElementById('task3');
const taskItem4 = document.getElementById('task4');
const taskItem5 = document.getElementById('task5');
const taskItem6 = document.getElementById('task6');
const domTask1 = new DOMofTask(taskItem1);
const domTask2 = new DOMofTask(taskItem2);
const domTask3 = new DOMofTask(taskItem3);
const domTask4 = new DOMofTask(taskItem4);
const domTask5 = new DOMofTask(taskItem5);
const domTask6 = new DOMofTask(taskItem6);
//блок листенеров на большие кнопки Task, которі сворачивают/разворачивают блок
taskItem1.querySelector('.taskItem__btn').addEventListener('click',	hideTask.bind(domTask1));
taskItem2.querySelector('.taskItem__btn').addEventListener('click', hideTask.bind(domTask2));
taskItem3.querySelector('.taskItem__btn').addEventListener('click', hideTask.bind(domTask3));
taskItem4.querySelector('.taskItem__btn').addEventListener('click', hideTask.bind(domTask4));
taskItem5.querySelector('.taskItem__btn').addEventListener('click', hideTask.bind(domTask5));
taskItem6.querySelector('.taskItem__btn').addEventListener('click', hideTask.bind(domTask6));
//блок листенеров на внутренню форму каждой таски
domTask1.output.addEventListener('click', function(e){ dataTask1(domTask1, e); });
domTask2.output.addEventListener('click', function(e){ dataTask2(domTask2, e); });
domTask3.output.addEventListener('click', function(e){ dataTask3(domTask3, e); });
domTask4.output.addEventListener('click', function(e){ dataTask4(domTask4, e); });
domTask5.output.addEventListener('click', function(e){ dataTask5(domTask5, e); });
domTask6.output.addEventListener('click', function(e){ dataTask6(domTask6, e); });

console.log('main||||||||||||||||||||||||');
///////////////////////////////TASK1//////////////////////////////////////
// создал наследника от Array и добавил пару методов
function dataTask1(dom, event){
	const goBtn = dom.form.querySelector('.taskItem__inputData__goBtn');
	dom.inputParamArr=getDataFromForm(dom);
	dom.form.querySelector('div').innerHTML = "Initial data:<br>";
	dom.form.querySelector('div').innerHTML += `Point X:${dom.inputParamArr[0]}<br>`;
	dom.form.querySelector('div').innerHTML += `Point Y:${dom.inputParamArr[1]}`;
	removeWarningAfterElement(dom.textInputs[0]);
	removeWarningAfterElement(dom.textInputs[1]);
	if(event.target == goBtn){
		if(!isNaN(dom.inputParamArr[0])){
			if(!isNaN(dom.inputParamArr[1])){
				task1(dom);
			} else{
				createWarningAfterElement(dom.textInputs[1], 'input Number');
			}
		} else{
			createWarningAfterElement(dom.textInputs[0], 'input Number');
		}
	}
	if(!dom.textInputs[0].value){
		createWarningAfterElement(dom.textInputs[0]);
	}
	if(!dom.textInputs[1].value){
		createWarningAfterElement(dom.textInputs[1]);
	}
}
var Point = {
	x : 0,
	y : 0,
	getQuadrant : function(){
		if (this.x > 0) {
			return this.y > 0 ? 
				'1th quadrant' : 
				this.y < 0 ? 
					'4th quadrant' : 
					'1th & 4th quadrants';
		}
		if (this.x < 0){
			return this.y > 0 ? 
				'2th quadrant' : 
				this.y < 0 ? 
					'3th quadrant' : 
					'2th & 3th quadrants';
		}
		else {
			return this.y > 0 ? 
				'1th & 3th quadrants' : 
				this.y < 0 ? 
					'3th & 4th quadrants' : 
					'1th & 2th & 3th & 4th quadrants';
		}
	}
}
function task1(dom){
	removeElement(dom.output.querySelector('.taskItem__result'));
	const point = Point;
	point.x=dom.inputParamArr[0];
	point.y=dom.inputParamArr[1];
	const stringResult = point.getQuadrant();
	const result = getNewResultDiv(dom);
	result.innerHTML += stringResult;
	dom.output.appendChild(result);
}
///////////////////////////////TASK2//////////////////////////////////////
function dataTask2(dom, e){
	const setSigns = ['+','-','/','*'];
	dom.inputParamArr = getDataFromForm(dom);
	const num1 = dom.textInputs[0];
	const num2 = dom.textInputs[1];
	const sign = dom.textInputs[2];
	if(e.target == dom.submitBtn){
		removeElement(dom.output.querySelector('.taskItem__result'));
		num1.value
			? isNaN(dom.inputParamArr[0])
				? createWarningAfterElement(num1, 'input Number')
				: removeWarningAfterElement(num1)
			: createWarningAfterElement(num1);
		num2.value
			? isNaN(dom.inputParamArr[1])
				? createWarningAfterElement(num2, 'input Number')
				: removeWarningAfterElement(num2)
			: createWarningAfterElement(num2);
		console.log("check sign");
		var checkSign = function(s) {
			for(e in setSigns){
				if(setSigns[e] == s){ return true; }
			};
			return false;
		};		
		sign.value
			? (!checkSign(dom.inputParamArr[2])
				? createWarningAfterElement(sign, 'input correct sign')
				: removeWarningAfterElement(sign))
			: createWarningAfterElement(sign);
		if (!isNaN(dom.inputParamArr[0]) && !isNaN(dom.inputParamArr[1]) && checkSign(dom.inputParamArr[2])){
			task2(dom);
		}
	}
}
var Calculator = {
	num1 : undefined,
	num2 : undefined,
	calculate : function(sign) {
		console.log(sign);
		return sign == '/'
			? this.divide() 
			: sign == '*'
				? this.multiplic()
				: sign == '+'
					? this.sum()
					: this.minus()
	},
	divide : function(){
		console.log('divide');
		return this.num1 / this.num2;
	},
	multiplic : function() {
		console.log('multiplic');
		return this.num1 * this.num2;
	},
	sum : function() {
		console.log('sum');
		return this.num1 + this.num2;
	},
	minus : function() {
		console.log('minus');
		return this.num1 - this.num2;
	}
}
function task2(dom){
	removeElement(dom.output.querySelector('.taskItem__result'));
	console.log("task2()");
	const calc = Calculator;
	calc.num1 = dom.inputParamArr[0];
	calc.num2 = dom.inputParamArr[1];
	const result = getNewResultDiv(dom);
	result.innerHTML += calc.calculate(dom.inputParamArr[2]);
	dom.output.appendChild(result);
}
///////////////////////////////TASK3//////////////////////////////////////
function dataTask3(dom, e){
	const addBtn = dom.form.querySelector("input[value='add']");
	dom.inputParamArr = getDataFromForm(dom);
	if(e.target == addBtn){
		removeWarningAfterElement(addBtn);
		dom.textInputs.forEach(e => warningSpanForEmptyInput(e));
		if(dom.inputParamArr[0] && dom.inputParamArr[1] && dom.inputParamArr[2] && dom.inputParamArr[3]){
			dom.tempData.push({
				name : dom.inputParamArr[0],
				sName : dom.inputParamArr[1],
				age : dom.inputParamArr[2],
				occupation : dom.inputParamArr[3],
				show : function(){
					return `Name:${this.name} Surname:${this.sName}	Age:${this.age} Occupation:${this.occupation}`;			
				}
			});
			dom.form.querySelector('div').innerHTML = ('we have '+ dom.tempData.length + ' employes');
			dom.form.querySelector('div').innerHTML += dom.tempData[dom.tempData.length - 1].show();
		} else{
			dom.form.querySelector('div').innerHTML = "Fill all areas!"
		}
	}
	if(e.target == dom.submitBtn){
		if(dom.tempData.length==0){
			createWarningAfterElement(addBtn, 'click');
		} else{
			task3(dom);
		}
	}
}
function task3(dom){
	removeElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(dom);
	dom.tempData.forEach(e => {
		console.log(e.show());
		result.innerHTML += e.show() + "<br>";
	})
	dom.output.appendChild(result);
}
///////////////////////////////TASK4//////////////////////////////////////
function dataTask4(dom, e){
	dom.inputParamArr = getDataFromForm(dom);
	const addBtn = dom.form.querySelector('input[value=add]');
	if (e.target == addBtn){
		removeWarningAfterElement(addBtn);
		const arr = domTask3.tempData;
		var counter = 0;
		const checkOccup = ['director', 'manager', 'programmer'];
		arr.forEach(e => counter += (checkOccup.includes(e.occupation) ? 1 : 0));
		if(counter == 3){
			dom.tempData = arr;
			dom.form.querySelector('div').innerHTML = "Initial data:<br>";
			arr.forEach(e => dom.form.querySelector('div').innerHTML += e.show() + '<br>');
		} else{
			dom.form.querySelector('div').innerHTML = "Initial data:<br>";
			dom.form.querySelector('div').innerHTML += "ERROR! Task 3 must include objects with director, manager, programmer<br>";
		}
	}
	if (e.target == dom.submitBtn){
		if(dom.tempData.length == 0){
			createWarningAfterElement(addBtn, 'click');
		} else {
			task4(dom);
		}
	}
}
function transform(array){
	array.forEach(e => {
		e.salary = e.occupation == 'director' 
			? 9000 : e.occupation == 'manager'
				? 1500 : e.occupation == 'programmer'
					? 10000 : 1000;
		e.show = function(){
			return `Name:${this.name} Surname:${this.sName}	Age:${this.age} Occupation:${this.occupation} Salary:${this.salary}`;
		}
	});
}
function task4(dom){
	removeElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(dom);
	transform(dom.tempData);
	dom.tempData.forEach(e => result.innerHTML += e.show() + '<br>');
	dom.output.appendChild(result);
}
///////////////////////////////TASK5//////////////////////////////////////
function dataTask5(dom, e){
	const addBtn = dom.form.querySelector('input[value=add]');
	const radio1 = document.getElementById('radio1');
	const radio2 = document.getElementById('radio2');
	const radio3 = document.getElementById('radio3');
	const radio4 = document.getElementById('radio4');
	const radio5 = document.getElementById('radio5');
	var sortField = radio1.checked ? 'name' 
		: radio2.checked ? 'sName' 
			: radio3.checked ? 'age' 
				: radio4.checked ? 'occupation'
					: radio5.checked ? 'salary' : 'name';  
	if (e.target == addBtn){
		removeWarningAfterElement(addBtn);
		dom.tempData = domTask3.tempData;
		if (dom.tempData.length > 1){
			dom.form.querySelector('div').innerHTML = "Initial data:<br>";
			dom.tempData.forEach(e => dom.form.querySelector('div').innerHTML += e.show() + '<br>');
		} else{
			dom.form.querySelector('div').innerHTML = "Initial data:<br>";
			dom.form.querySelector('div').innerHTML += "ERROR! Task 3 must have at least 2 objects<br>";
		}
	}
	if(e.target == dom.submitBtn){
		dom.tempData.length == 0 ? createWarningAfterElement(addBtn, 'click') : task5(dom, sortField);
	}
}
function task5(dom, sortField){
	removeElement(dom.output.querySelector('.taskItem__result'));
	sort(dom.tempData, sortField);
	const result = getNewResultDiv(dom, sortField);
	dom.tempData.forEach(e => result.innerHTML += e.show() + '<br>');
	dom.output.appendChild(result);
}
function sort(array, field){
	console.log('sort: ' + array.length + ' field: '+field);
	field == 'name' ? array.sort(sortNameAsc) : null;
	field == 'sName' ? array.sort(sortSnameAsc) : null;
	field == 'occupation' ? array.sort(sortOccupationAsc) : null;
	field == 'age' ? array.sort(sortAgeAsc) : null;
	field == 'salary' ? array.sort(sortSalaryAsc) : null;
}
function sortNameAsc(a, b){
	const aSmall = a.name.toLowerCase();
	const bSmall = b.name.toLowerCase();
	return aSmall < bSmall ? -1 : aSmall > bSmall ? 1 : 0;
}
function sortSnameAsc(a, b){
	const aSmall = a.sName.toLowerCase();
	const bSmall = b.sName.toLowerCase();
	return aSmall < bSmall ? -1 : aSmall > bSmall ? 1 : 0;
}
function sortOccupationAsc(a, b){
	const aSmall = a.occupation.toLowerCase();
	const bSmall = b.occupation.toLowerCase();
	return aSmall < bSmall ? -1 : aSmall > bSmall ? 1 : 0;
}
function sortAgeAsc(a, b){
	return a.age - b.age;
}
function sortSalaryAsc(a, b){
	return a.salary - b.salary;
}

//////////////////////////////////////////////////////////////////////////
function dataTask6(dom, e){
	console.log("************************************");
	console.log("!dataTask6!");
	const dataInput = dom.form.querySelector('input[type="text"]');
	if(e.target == dom.submitBtn && dataInput.value){
	// dom.submitBtn.addEventListener('click', function(){
		console.log("dom.submitBtn click");
		const dataValue = dataInput.value;
		console.log("Value:" + dataValue);
		dom.form.querySelector('div').innerHTML += dataValue;
		taskProcess6(dom, dataValue);
	};
}
function taskProcess6(dom, data){
	removeElement(dom.output.querySelector('.taskItem__result'));
	console.log("!taskProcess6! value:" + data);
	const result = getNewResultDiv(dom);
	dom.output.appendChild(result);
	result.innerHTML += data;
}


