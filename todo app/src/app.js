const botao = document.getElementById('buttonAdd');
const inputTarefa = document.getElementById('addTask');
const container = document.querySelector('.background2');

let count = 0;
let valores = []

botao.addEventListener('click',()=>{

    const valor = inputTarefa.value.trim();
    adicionarTarefa(valor);
    valores.push(valor);
    console.log(valores)
})

function adicionarTarefa(valor) {
    
    if(valor === '') {
        const modal = document.createElement('dialog')
        modal.innerHTML = `
        <h2>Atenção!</h2>
        <p id="dialog-text">Preencha o campo para adicionar uma tarefa.</p>
        <div class="dialog-buttons">
            <button id="close-dialog">Close</button>
        </div>
    `;
        container.appendChild(modal);
        const fecharModal = document.getElementById('close-dialog');
        
        fecharModal.addEventListener('click',()=>{
            modal.close();
            modal.remove();
        })

        
        modal.showModal();
        return;
    }

    const linha = document.createElement('span')
    linha.id = 'linhaCheckbox'

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.id = `checkbox${count}`
    checkbox.name = `checkbox${count}`

    const newLabel = document.createElement('label');
    newLabel.id = 'checkLabel'
    newLabel.htmlFor = checkbox.id;
    newLabel.textContent = valor;

    const deleteIcon = document.createElement('i');
    deleteIcon.htmlFor = checkbox.id;
    deleteIcon.className = 'fa-regular fa-trash-can'
    

    linha.appendChild(checkbox);
    linha.appendChild(newLabel);
    linha.appendChild(deleteIcon);

    container.appendChild(linha);
    container.appendChild(document.createElement('br'));

    count++

    inputTarefa.value = '';
}

function excluirTarefa(valor) {
    
}
