const inputTarefa = document.querySelector('.input-nova-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas'); // ESSA AQUI É UM UL 

function criaLi () {
    const li = document.createElement('li');
    li.style.marginLeft ='25px';
    return li;
}

inputTarefa.addEventListener('keypress', function(e){
if(e.keyCode === 13){
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    // inputTarefa.value = ''; 

}
});

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();

}

function criaBotaoApagar (li){
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar'); //esse aqui é muito bom, pois serve para inumeras coisas dentro da manipulação do DOM
    li.appendChild(botaoApagar);
}

function criaTarefa (textoInput){
const li = criaLi();
li.innerHTML = textoInput;
tarefas.appendChild(li);
limpaInput();
criaBotaoApagar(li);
SalvarTarefas();
}


btnTarefa.addEventListener('click', function (){
 if (!inputTarefa.value) return;
 criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target; // esse aqui assume o valor do botao que foi selecionado
    //assim que clicado em algo; 
    if(el.classList.contains('apagar')){
        el.parentElement.remove(); // aqui o parentElement chama o pai do botao selecionado, no caso o pai do "apagar"
        // e o REMOVE APAGA ELE; 
        SalvarTarefas();
    }
})

function SalvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto  = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);        
    }
   const tarefasJSON  = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}


function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }

}


adicionaTarefasSalvas();
