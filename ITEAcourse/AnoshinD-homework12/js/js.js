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
	dom.textInputs.forEach(e1 => console.log(e1.value));
	dom.textInputs.forEach(e => e != undefined ? result.push(e.value) : null);
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
	const generateArrBtn = dom.form.querySelector('input[value="generate"]');
	const goBtn = dom.form.querySelector('.taskItem__inputData__goBtn');
	// const warningFirstClick = generateArrBtn.nextElementSibling;
	dom.form.querySelector('div').innerHTML = "Initial array:<br>";
	dom.form.querySelector('div').innerHTML += dom.tempData[0];
	let array = [];
	console.log("array:");
	console.log(dom.tempData[0]);
	
	if(event.target == generateArrBtn){
		// warningFirstClick.nodeName.toLowerCase() = 'span' ? removeElement(warningFirstClick) : null;
		array=generateNumArray(10);
		dom.tempData[0]=array;
		dom.form.querySelector('div').innerHTML = "Initial array:<br>";
		dom.form.querySelector('div').innerHTML += dom.tempData[0];
		removeWarningAfterElement(generateArrBtn);
	}
	if(event.target == goBtn){
		if(dom.tempData[0]){
			task1(dom);	
		}
	}
	if(dom.tempData[0] == undefined){
		createWarningAfterElement(generateArrBtn, 'click');
	}
	
	// if(dom.tempData[0] == undefined && !warningFirstClick){
	// 	createWarningAboutFillInput(generateArrBtn, 'click');
	// }
}
function task1(dom){
	removeElement(dom.output.querySelector('.taskItem__result'));
	class NewArray extends Array {
		check() { console.log('works!'); }
		//sqrt - возводит во вторую степень все элементы и отдает результирующий массив
		sqrt(){
			const arr = new NewArray();
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
	const array = dom.tempData[0];
	let newarr = new NewArray();
	array.forEach(e => newarr.push(e));
	newarrsqrt = newarr.sqrt();
	newarrrand = newarr.random();
	const result = getNewResultDiv(dom, array);
	result.innerHTML += "Cоздал наследника NewArray от Array и добавил ему пару методов: sqrt() random()<br>";
	result.innerHTML += "let newarr = new NewArray();<br>";
	result.innerHTML += "newarr.sqrt() --> возводит во 2 степень каждый элемент и отдает результат<br>";
	result.innerHTML += newarrsqrt + "<br>";
	result.innerHTML += "newarr.random() --> перемешивает местами все элементы массива и возвращает результат<br>";
	result.innerHTML += newarrrand + "<br>";
	dom.output.appendChild(result);
}
///////////////////////////////TASK2//////////////////////////////////////
function dataTask2(dom, e){
	dom.inputParamArr = getDataFromForm(dom);
	const generateArr = dom.form.querySelector('input[value="generate"]');
	if (e.target == generateArr){
		removeWarningAfterElement(generateArr);
		dom.inputParamArr = getDataFromForm(dom);
		array=generateNumArray(dom.inputParamArr[0]);
		console.log("array");
		console.log(array);
		dom.tempData[0] = array;
		dom.form.querySelector('div').innerHTML = "Initial array:<br>";
		dom.form.querySelector('div').innerHTML += dom.tempData[0];
	}
	if(e.target == dom.submitBtn){
		if(!dom.tempData[0]){
			createWarningAfterElement(generateArr, 'click');
		}
		if(dom.tempData[0] && dom.inputParamArr[1]>=0 && dom.inputParamArr[2]>1){
			task2(dom);
		} else {
			dom.form.querySelector('div').innerHTML = "Insert correct data!:<br>";
		}
	}
	dom.textInputs.forEach(e => warningSpanForEmptyInput(e));
}
function task2(dom){
	const array = dom.tempData[0];
	const size = dom.inputParamArr[0];
	const a = dom.inputParamArr[1];
	const b = dom. inputParamArr[2];
	removeElement(dom.output.querySelector('.taskItem__result'));
	const resArray = array.slice(a,b);
	console.log("task2() resArray:");
	console.log(resArray);
	const result = getNewResultDiv(dom);
	result.innerHTML += resArray;
	dom.output.appendChild(result);
}
///////////////////////////////TASK3//////////////////////////////////////
function dataTask3(dom, e){
	const addBtn = dom.form.querySelector("input[value='add']");
	const newElement = dom.form.querySelector("input[type='text']");
	const genareteCheck = dom.form.querySelector('input[type="checkbox"]');
	dom.inputParamArr = getDataFromForm(dom);
	if(e.target == genareteCheck){
		const arr = generateNumArray(10);
		dom.tempData[0] = arr;
		dom.form.querySelector('div').innerHTML = "Initial array:<br>";
		dom.form.querySelector('div').innerHTML += arr;	
	}
	if(e.target == addBtn){
		if(dom.inputParamArr[0] && !dom.inputParamArr[0].isNaN){
			removeWarningAfterElement(newElement)
			dom.tempData[0].push(dom.inputParamArr[0]);
			dom.form.querySelector('div').innerHTML += (','+ +dom.inputParamArr[0]);
		} else{
			warningSpanForEmptyInput(newElement);
		}
	}
	if(e.target == dom.submitBtn){
		if(dom.tempData[0]){
			removeWarningAfterElement(addBtn);
			removeWarningAfterElement(genareteCheck);
			task3(dom);
		} else{
			warningSpanForEmptyInput(addBtn, 'click');
			warningSpanForEmptyInput(genareteCheck, 'check');
		}
	}
}
function task3(dom){
	const arr = dom.tempData[0];
	removeElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(dom);
	const clonearr = arr;
	// const clonearr = [...arr];//клонирую массив т.к. sort() изменяет исходных массив arr
	//что приводит к ошибке если несколько раз нажать Go
	const sortarr = clonearr.sort(function(a,b){return a-b;});
	result.innerHTML += sortarr;
	dom.output.appendChild(result);
}
///////////////////////////////TASK4//////////////////////////////////////
function dataTask4(dom, e){
	// dom.form.querySelector('div').innerHTML = '';
	dom.inputParamArr = getDataFromForm(dom);
	const sizeArrField = dom.textInputs[0];
	const indexField = dom.textInputs[1];
	const newElemField = dom.textInputs[2];
	const btnGenerate = dom.form.querySelector('input[value=generate]');
	if (e.target == btnGenerate){
		if(parseInt(dom.inputParamArr[0]) > 1){
			console.log("|btnGenerate| in");
			removeWarningAfterElement(sizeArrField);
			const sizeArr = +dom.inputParamArr[0];
			dom.tempData[0] = generateNumArray(sizeArr);
			dom.form.querySelector('div').innerHTML = "Initial array:<br>";
			dom.form.querySelector('div').innerHTML += dom.tempData[0];
		} else{
			console.log("|btnGenerate| out");
			createWarningAfterElement(sizeArrField);
		}
	}
	if (e.target == dom.submitBtn){
		dom.tempData[0]	? removeWarningAfterElement(btnGenerate) : warningSpanForEmptyInput(btnGenerate, 'click');
		parseInt(dom.textInputs[1].value) ? removeWarningAfterElement(indexField) : createWarningAfterElement(indexField);
		dom.textInputs[2].value.length > 0 ? removeWarningAfterElement(newElemField) : createWarningAfterElement(newElemField);
		dom.tempData[0] ? removeWarningAfterElement(btnGenerate) : createWarningAfterElement(btnGenerate, 'click');
		const sizeArr = dom.inputParamArr[0];
		const index = dom.inputParamArr[1];
		const newElem = dom.inputParamArr[2];
		console.log("sizeArr: %s indexToInput : %s newElement : %s array:", sizeArr, index, newElem);
		console.log(dom.tempData[0]);
		if (index && newElem && dom.tempData[0] && index < dom.tempData[0].length){
			dom.form.querySelector('div').innerHTML = "Initial array:<br>";
			dom.form.querySelector('div').innerHTML += dom.tempData[0];
			task4(dom, dom.tempData[0], index, newElem);
		} else {
			dom.form.querySelector('div').innerHTML = "Input correct data!<br>";
			dom.form.querySelector('div').innerHTML += dom.tempData[0];
			removeElement(dom.output.querySelector('.taskItem__result'));
		}
	}
}
function task4(dom, array, index, newElem){
	removeElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(dom);
	array.splice(+index + 1, 0, isNaN(newElem) ? newElem : +newElem);
	dom.form.querySelector('div').innerHTML = "Initial array:<br>";
	dom.form.querySelector('div').innerHTML += array;
	result.innerHTML += array;
	dom.output.appendChild(result);
}
///////////////////////////////TASK5//////////////////////////////////////
function dataTask5(dom, e){
	var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	dom.form.querySelector('div').innerHTML = "Initial array:<br>";
	dom.form.querySelector('div').innerHTML += month;
	console.log("month:");
	console.log(month);
	const radio1 = document.getElementById('radio1');
	const radio2 = document.getElementById('radio2');
	const radio3 = document.getElementById('radio3');
	let nextFunc = task5_at;
	if (e.target == radio1){
		nextFunc = task5_at;
		console.log("at() func is selected");
	}
	if (e.target == radio2){
		nextFunc = task5_pop;
		console.log("pop() func is selected");
	}
	if (e.target == radio3){
		nextFunc = task5_splice;
		console.log("splice() func is selected");
	}
	if (e.target == dom.submitBtn){
		if (nextFunc){
			nextFunc(dom, [...month]);
		} else{
			console.log(event);
			return;
		}
	}
}
function task5_at(dom, array){
	removeElement(dom.output.querySelector('.taskItem__result'));
	const res = array.at(-2);
	console.log("res:%s\n" , res);
	const result = getNewResultDiv(dom, 'at', array, "const res = array.at(-2);");
	result.innerHTML += `at() <br>${array}<br>const res = array.at(-2);`;
	result.innerHTML += "<br><br>Output: " + res;
	dom.output.appendChild(result);
}
function task5_pop(dom, array){
	removeElement(dom.output.querySelector('.taskItem__result'));
	array.pop();
	const res = array.pop();
	console.log("res:%s\n" , res);
	const result = getNewResultDiv(dom);
	result.innerHTML += `pop() <br>${array}<br>array.pop(); const res = array.pop();`;
	result.innerHTML += "<br><br>Output: " + res;
	dom.output.appendChild(result);
}
function task5_splice(dom, array){
	removeElement(dom.output.querySelector('.taskItem__result'));
	console.log("this is splice() func");
	const res = array.splice(-2, 1);
	console.log("res:%s\n" , res);
	const result = getNewResultDiv(dom, 'splice', array, "const res = array.splice(-2, 1);");
	result.innerHTML += `splice() <br>${array}<br>const res = array.splice(-2, 1);`;
	result.innerHTML += "<br><br>Output: " + res;
	dom.output.appendChild(result);
}
//////////////////////////////////////////////////////////////////////////
function dataTask6(dom, e){
	console.log("************************************");
	console.log("!dataTask6!");
	const dataInput = dom.form.querySelector('input[type="text"]');
	if(e.target == dataInput)
	dom.submitBtn.addEventListener('click', function(){
		console.log("dom.submitBtn click");
		const dataValue = dataInput.value;
		console.log("Value:" + dataValue);
		dom.form.querySelector('div').innerHTML += dataValue;
		taskProcess6(dom, dataValue);
	});
}
function taskProcess6(dom, data){
	removeElement(dom.output.querySelector('.taskItem__result'));
	console.log("!taskProcess6! value:" + data);
	const result = getNewResultDiv(dom);
	dom.output.appendChild(result);
	result.innerHTML += data;
}


