document.addEventListener('DOMContentLoaded', ()=>{
    
    const botao = document.getElementById('buttonAdd');
    const inputTarefa = document.getElementById('addTask');
    const container = document.querySelector('.background2');

    const quantidadeTarefas  = document.getElementById('quantidade-tarefas');


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
        checkbox.addEventListener('change', tarefasConcluídas);

        const newLabel = document.createElement('label');
        newLabel.id = 'checkLabel'
        newLabel.htmlFor = checkbox.id;
        newLabel.textContent = valor;

        const deleteIcon = document.createElement('i');
        deleteIcon.htmlFor = checkbox.id;
        deleteIcon.className = 'fa-regular fa-trash-can'

        deleteIcon.addEventListener('click',()=>{
            linha.remove();
            espaco.remove();
        });
        
        linha.appendChild(checkbox);
        linha.appendChild(newLabel);
        linha.appendChild(deleteIcon);

        container.appendChild(linha);
        const espaco = document.createElement('br');
        container.appendChild(espaco);

        count++
        inputTarefa.value = '';
    }

    function tarefasConcluídas() {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const contagem = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        quantidadeTarefas.textContent = contagem;
    }
})
