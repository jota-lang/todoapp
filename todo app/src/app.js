document.addEventListener('DOMContentLoaded', ()=>{
    
    const botao = document.getElementById('buttonAdd');
    const inputTarefa = document.getElementById('addTask');
    const container = document.querySelector('.background2');
    const quantidadeTarefasConcluidas = document.getElementById('quantidade-tarefas-concluidas')
    const barraDeProgresso = document.querySelector('.progress-bar');
    const numProgresso = document.querySelector('.progress-text')

    let count = 0;

    botao.addEventListener('click',()=>{
        const valor = inputTarefa.value.trim();
        adicionarTarefa(valor);
    })

    function adicionarTarefa(valor) {
        
        if(valor === '') {
            const modal = document.createElement('dialog')
            modal.innerHTML = `
            <button id="close-dialog">
                <i class="fa-solid fa-xmark"></i>
            </button>
                <h2>Atenção!</h2>
            <p id="dialog-text">Preencha o campo 
            para adicionar uma tarefa.</p>
            <div class="dialog-buttons">
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

        const updateIcon = document.createElement('i');
        updateIcon.htmlFor = checkbox.id;
        updateIcon.className = 'fa-regular fa-pen-to-square'

        const deleteIcon = document.createElement('i');
        deleteIcon.htmlFor = checkbox.id;
        deleteIcon.className = 'fa-regular fa-trash-can'

        linha.appendChild(checkbox);
        linha.appendChild(newLabel);
        linha.appendChild(updateIcon);
        linha.appendChild(deleteIcon);
        
        container.appendChild(linha);
        const espaco = document.createElement('br');
        container.appendChild(espaco);

        count++;
        inputTarefa.value = '';

        updateIcon.addEventListener('click',()=>{

            const modalAlterar = document.createElement('dialog')
            modalAlterar.innerHTML = `
            <button id="close-dialog-alterar">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <p id="dialog-text-alterar">Nome da Tarefa:</p>
            <input id="textoAlterado"type="text"></input>
            <button id="botaoAlterar">Alterar Registro</button>
            <div class="dialog-buttons">
            </div>`;

            container.appendChild(modalAlterar);
            const fecharModalAlterar = document.getElementById('close-dialog-alterar');

            fecharModalAlterar.addEventListener('click',()=>{
                modalAlterar.close();
                modalAlterar.remove();
            })

            const botaoAlterar = document.getElementById('botaoAlterar')

            botaoAlterar.addEventListener('click',()=>{
                alterarTarefa(newLabel);
            })

            modalAlterar.showModal();
            return;
        })

       

        deleteIcon.addEventListener('click',()=>{
            linha.remove();
            count--;
            quantidadeTarefasConcluidas.textContent = count;
            tarefasConcluídas()
            espaco.remove();
        });
        quantidadeTarefasConcluidas.textContent = count;

    }

    function tarefasConcluídas() {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const contagem = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        
        const porcentagem = (contagem/count) * 100
        
        barraDeProgresso.style.width = `${porcentagem}%`
        numProgresso.textContent = `${Math.round(porcentagem)}%`;
        barraDeProgresso.setAttribute('aria-valuenow', porcentagem);

        if (parseFloat(barraDeProgresso.style.width) >= 50) {
            numProgresso.style.color = 'white';
        }else{
            numProgresso.style.color = 'black';
        }
    }

    function alterarTarefa(textoAlteravel) {
        const novoTexto = textoAlterado.value;
        textoAlteravel.textContent = novoTexto;
    }
})
