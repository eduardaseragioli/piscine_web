const ftList = document.getElementById('ft_list'); //ft_list onde as tarefas vao aparecer
const btnNew = document.getElementById('new_btn'); //cria uma nova tarefa

//carrega ao inicio: le o cookie e reconstroi a lista
window.onload = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    if (cookie){
        //transforma a string do cookie de volta em array e cria as divs
        const tasks = JSON.parse(cookie.split('=')[1]);
        tasks.reverse().forEach(text => createTask(text));
    }
};

//botao new: abre o prompt e valida
btnNew.onclick = () => {
    const text = prompt("Digite sua nova tarefa: ");
    if (text && text.trim() !== "") {
        createTask(text);
        updateCookies();
    }
};

//criar tarefa: func que gera a div e add o evento de clique (remover)
function createTask(text){
    const div = document.createElement('div');
    div.textContent = text;

    //clicar para remover
    div.onclick = () => {
        if (confirm("Deseja excluir esta tarefa? ")){
            div.remove();
            updateCookies();
        }
    };

    //para colocar no topo
    ftList.prepend(div);
}

//atualizar cookies: pega os textos atuais e salva
function updateCookies(){
    const tasks = [];

    //pega todas as divs dentro da ft_list
    ftList.querySelectorAll('div').forEach(div => tasks.push(div.textContent));

    //salva como string JSON(expira em 7 dias)
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; max-age" + (7*24*60*60) + "; path=/";
}
