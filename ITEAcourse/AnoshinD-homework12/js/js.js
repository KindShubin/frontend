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
taskItem6.querySelector('.taskItem__btn').addEventListener('click', function(){
	preparingTask.bind(taskItem6)(dataTask6);});
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
function task1(dom, array){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
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
	let newarr = new NewArray();
	array.forEach(e => newarr.push(e));
	newarrsqrt = newarr.sqrt();
	newarrrand = newarr.random();
	const result = getNewResultDiv();
	result.innerHTML += "Cоздал наследника NewArray от Array и добавил ему пару методов: sqrt() random()<br>";
	result.innerHTML += "let newarr = new NewArray();<br>";
	result.innerHTML += "newarr.sqrt() --> возводит во 2 степень каждый элемент и отдает результат<br>";
	result.innerHTML += newarrsqrt + "<br>";
	result.innerHTML += "newarr.random() --> перемешивает местами все элементы массива и возвращает результат<br>";
	result.innerHTML += newarrrand + "<br>";
	dom.output.appendChild(result);
}
function dataTask1(dom){
	const generateArr = dom.form.querySelector('input[value="generate"]');
	dom.form.querySelector('div').innerHTML = '';
	let array = [];
	generateArr.addEventListener('click', function(){
		array=generateNumArray(10);
		dom.form.querySelector('div').innerHTML = "Initial array:<br>";
		dom.form.querySelector('div').innerHTML += array;
	});
	dom.submitBtn.addEventListener('click', function(){
		if(array.length == 0){
			array=generateNumArray(10);
			dom.form.querySelector('div').innerHTML = "Initial array:<br>";
			dom.form.querySelector('div').innerHTML += array;
		}
		task1(dom, array);
		});
}
///////////////////////////////TASK2//////////////////////////////////////
function task2(dom, array, size, a, b){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const resArray = array.slice(a,b);
	console.log("task2() resArray:");
	console.log(resArray);
	const result = getNewResultDiv(size, a, b);
	result.innerHTML += resArray;
	dom.output.appendChild(result);
}
function dataTask2(dom){
	dom.form.querySelector('div').innerHTML = "";
	var array = [];
	const generateArr = dom.form.querySelector('input[value="generate"]');
	generateArr.addEventListener('click', function(){
		dom.inputParamArr = getDataFromForm(dom.form);
		const size = +dom.inputParamArr[0];
		array=generateNumArray(size);
		dom.form.querySelector('div').innerHTML = "Initial array:<br>";
		dom.form.querySelector('div').innerHTML += array;
	});
	dom.submitBtn.addEventListener('click', function(){
		dom.inputParamArr = getDataFromForm(dom.form);
		const size = dom.inputParamArr[0];
		const a = dom.inputParamArr[1];
		const b = dom.inputParamArr[2];
		if(array.length == 0 || a<0 || b<1){
			console.log("array.length:"+array.length+" a:"+a+" b:"+b+" size:"+size);
			dom.form.querySelector('div').innerHTML = "Fill all inputs!<br>";
			return;	
		} else {
			task2(dom, array, size, a, b);
		}});
}
///////////////////////////////TASK3//////////////////////////////////////
function task3(dom, arr){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(arr);
	const clonearr = [...arr];//клонирую массив т.к. sort() изменяет исходных массив arr
	//что приводит к ошибке если несколько раз нажать Go
	const sortarr = clonearr.sort(function(a,b){return a-b;});
	result.innerHTML += sortarr;
	dom.output.appendChild(result);
}

function dataTask3(dom){
	const addBtn = dom.output.querySelector('#idForm3__add');
	const newElement = dom.output.querySelector('#idForm3__addInput');
	const genareteCheck = dom.output.querySelector('input[type="checkbox"]');
	let array = [];
	dom.form.querySelector('div').innerHTML = "Initial array:<br>";
	addBtn.addEventListener('click', function(event){
		if (!newElement.value.isNaN){
			array.push(+newElement.value);
		}
		dom.form.querySelector('div').innerHTML += (','+ +newElement.value);
		});
	genareteCheck.addEventListener('change', function(){
		if (this.checked){
			array=generateNumArray(10);
			dom.form.querySelector('div').innerHTML = "Initial array:<br>";
			dom.form.querySelector('div').innerHTML += array;	
		} else {
			array = [];
			dom.form.querySelector('div').innerHTML = "Initial array:<br>";
		}	
		});
	dom.submitBtn.addEventListener('click', function(){
		task3(dom, array);
		});
}
///////////////////////////////TASK4//////////////////////////////////////
function task4(dom, array, index, newElement){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const result = getNewResultDiv(array.length, index, newElement, array);
	array.splice(+index + 1, 0, isNaN(newElement) ? newElement : +newElement);
	dom.form.querySelector('div').innerHTML = "Initial array:<br>";
	dom.form.querySelector('div').innerHTML += array;
	result.innerHTML += array;
	dom.output.appendChild(result);
}

function dataTask4(dom){
	dom.form.querySelector('div').innerHTML = '';
	const btnGenerate = dom.form.querySelector('input[value=generate]');
	let array = [];
	btnGenerate.addEventListener('click', function(){
		dom.inputParamArr=getDataFromForm(dom.form);
		const sizeArr = +dom.inputParamArr[0];
		array = generateNumArray(sizeArr);
		dom.form.querySelector('div').innerHTML = "Initial array:<br>";
		dom.form.querySelector('div').innerHTML += array;
	});
	dom.submitBtn.addEventListener('click', function(){
		dom.inputParamArr=getDataFromForm(dom.form);
		const sizeArr = +dom.inputParamArr[0];
		const indexToInput = dom.inputParamArr[1];
		const newElement = dom.inputParamArr[2];
		console.log("sizeArr: %s indexToInput : %s newElement : %s array:", sizeArr, indexToInput, newElement);
		console.log(array);
		task4(dom, array, indexToInput, newElement);
	});

}

///////////////////////////////TASK5//////////////////////////////////////
function task5_at(dom, array){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	const res = array.at(-2);
	console.log("res:%s\n" , res);
	const result = getNewResultDiv('at', array, "const res = array.at(-2);");
	result.innerHTML += "Output: " + res;
	dom.output.appendChild(result);
}
function task5_pop(dom, array){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	array.pop();
	const res = array.pop();
	console.log("res:%s\n" , res);
	const result = getNewResultDiv('pop', array, "array.pop(); const res = array.pop();");
	result.innerHTML += "Output: " + res;
	dom.output.appendChild(result);
}
function task5_splice(dom, array){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	console.log("this is splice() func");
	const res = array.splice(-2, 1);
	console.log("res:%s\n" , res);
	const result = getNewResultDiv('splice', array, "const res = array.splice(-2, 1);");
	result.innerHTML += "Output: " + res;
	dom.output.appendChild(result);
}
function dataTask5(dom){
	var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	dom.form.querySelector('div').innerHTML = "Initial array:<br>";
	dom.form.querySelector('div').innerHTML += month;
	console.log("month:");
	console.log(month);
	const radio1 = document.getElementById('radio1');
	const radio2 = document.getElementById('radio2');
	const radio3 = document.getElementById('radio3');
	let nextFunc = task5_at;
	radio1.addEventListener('change', function(){
		nextFunc = task5_at;
		console.log("at() func is selected");
	});
	radio2.addEventListener('change', function(){
		nextFunc = task5_pop;
		console.log("pop() func is selected");
	});
	radio3.addEventListener('change', function(){
		nextFunc = task5_splice;
		console.log("splice() func is selected");
	});
	dom.submitBtn.addEventListener('click', function(){
		console.log("dom.submitBtn click");
		console.log("nextFunc:");
		console.log(nextFunc);
		if (nextFunc){
			nextFunc(dom, [...month]);
		} else{
			console.log(event);
			return;
		}
	})
}
//////////////////////////////////////////////////////////////////////////
function taskProcess6(dom, data){
	removeDivElement(dom.output.querySelector('.taskItem__result'));
	console.log("!taskProcess6! value:" + data);
	const result = getNewResultDiv(data);
	dom.output.appendChild(result);
	result.innerHTML += data;
}
function dataTask6(dom){
	console.log("************************************");
	console.log("!dataTask6!");
	const dataInput = dom.form.querySelector('input[type="text"]');
	// const result = getNewResultDiv();
	// dom.output.appendChild(result)
	dom.submitBtn.addEventListener('click', function(){
		console.log("dom.submitBtn click");
		const dataValue = dataInput.value;
		console.log("Value:" + dataValue);
		dom.form.querySelector('div').innerHTML += dataValue;
		// result.innerHTML += dataValue;
		taskProcess6(dom, dataValue);
	});
}


