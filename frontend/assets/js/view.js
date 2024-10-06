document.getElementById('loadUserBtn').addEventListener('click', function(event) {
    // Evitar o comportamento padrão do botão que recarrega a página
    event.preventDefault();

    // Obter o ID do usuário logado
    const userId = localStorage.getItem('userId'); // Pegando o userId do localStorage
    const token = localStorage.getItem('token'); // Pegando o token do localStorage

    if (!token || !userId) {
        alert('Token ou ID do usuário não encontrados. Faça o login novamente.');
        return;
    }

    // Fazer a requisição para a API usando o userId dinâmico
    fetch(`http://localhost:8000/api/user/visualizar/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            const user = data.user;
            document.getElementById('userName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userCreated').textContent = new Date(user.created_at).toLocaleString('pt-BR');

            // Exibir os dados
            document.getElementById('usuarioInfo').classList.remove('d-none');
        } else {
            document.getElementById('mensagemErro').textContent = 'Erro ao carregar o usuário.';
            document.getElementById('mensagemErro').classList.remove('d-none');
        }
    })
    .catch(error => {
        console.error('Erro ao carregar o usuário:', error);
        document.getElementById('mensagemErro').textContent = 'Erro ao carregar o usuário.';
        document.getElementById('mensagemErro').classList.remove('d-none');
    });
});
