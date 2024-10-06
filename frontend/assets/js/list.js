// Função para listar os usuários
async function listarUsuarios() {
    // Obter o token do localStorage
    const token = localStorage.getItem('token');
    const userIdLogado = localStorage.getItem('userId');
    console.log('Token armazenado:', token);
    console.log('ID do usuário logado:', userIdLogado);

    try {
        if (token) {
            console.log('Token encontrado, fazendo requisição para a API...');

            // Fazer uma requisição para a API protegida para obter os dados do usuário
            const response = await fetch('http://localhost:8000/api/user/listar', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Resposta da API recebida:', response);

            if (response.ok) {
                const usuarios = await response.json();
                console.log('Dados dos usuários recebidos:', usuarios);

                // Seleciona o corpo da tabela
                const tabelaUsuarios = document.getElementById('tabelaUsuarios');
                tabelaUsuarios.innerHTML = ''; // Limpa a tabela

                // Itera sobre os usuários e adiciona cada um à tabela
                usuarios.users.data.forEach((usuario, index) => {
                    console.log(`Adicionando usuário ${usuario.name} na tabela`);

                    const dataCriacao = new Date(usuario.created_at);
                    const dataFormatada = dataCriacao.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false // Formato 24 horas
                    });
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                        <td>${dataFormatada}</td>
                        <td>
                            ${usuario.id != userIdLogado
                            ? `<button class="btn btn-danger btn-sm excluir-usuario" data-id="${usuario.id}">
                                    <i class="fas fa-trash-alt"></i>
                                   </button>`
                            : ''
                        } <!-- Mostra o botão de excluir apenas se o id for diferente -->
                        </td>
                    `;
                    tabelaUsuarios.appendChild(row);
                });

                console.log('Usuários foram adicionados na tabela.');

                // Adiciona o evento de clique para excluir o usuário
                document.querySelectorAll('.excluir-usuario').forEach(button => {
                    button.addEventListener('click', async function () {
                        const userId = this.getAttribute('data-id');
                        console.log('Clique detectado no botão de excluir para o usuário:', userId);
                        const confirmar = confirm('Tem certeza que deseja excluir este usuário?');
                        if (confirmar) {
                            await excluirUsuario(userId);
                        }
                    });
                });
            } else {
                console.error('Erro ao buscar os usuários, status:', response.status);
                throw new Error('Erro ao buscar os usuários');
            }
        } else {
            console.log('Token não encontrado, redirecionando para a página de login...');
            // Redireciona para o login se o token não existir
            window.location.href = 'signin.html';
        }
    } catch (error) {
        console.error('Erro:', error); // Mostra o erro exato
        const mensagemErro = document.getElementById('mensagemErro');
        mensagemErro.textContent = 'Erro ao carregar a lista de usuários';
        mensagemErro.classList.remove('d-none');
    }
}

// Função para excluir o usuário
async function excluirUsuario(userId) {
    const token = localStorage.getItem('token');
    console.log('Excluindo o usuário com ID:', userId);
    try {
        const response = await fetch(`http://localhost:8000/api/user/deletar/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Resposta da API de exclusão recebida:', response);

        if (response.ok) {
            console.log('Usuário excluído com sucesso!');
            alert('Usuário excluído com sucesso!');
            listarUsuarios(); // Recarregar a lista de usuários
        } else {
            console.error('Erro ao excluir o usuário, status:', response.status);
            throw new Error('Erro ao excluir o usuário');
        }
    } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
        alert('Erro ao excluir o usuário.');
    }
}

// Chama a função para listar os usuários assim que a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada');
    listarUsuarios();  // A chamada é feita apenas ao carregar a página
});
