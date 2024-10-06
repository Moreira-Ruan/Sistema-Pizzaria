async function carregarDetalhesUsuario() {
    const token = localStorage.getItem('token');

    // Pega o ID do usuário da query string
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id'); // Obtém o ID da query string

    if (token && userId) {
        try {
            const response = await fetch(`http://localhost:8000/api/user/visualizar/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const usuario = await response.json();
                document.getElementById('nome').textContent = usuario.user.name; // Ajuste aqui
                document.getElementById('email').textContent = usuario.user.email; // Ajuste aqui

                const dataCriacao = new Date(usuario.user.created_at); // Ajuste aqui
                const dataFormatada = dataCriacao.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false // Formato 24 horas
                });
                document.getElementById('dataCriacao').textContent = dataFormatada;
            } else {
                throw new Error('Erro ao buscar os detalhes do usuário');
            }
        } catch (error) {
            console.error('Erro:', error);
            const mensagemErro = document.getElementById('mensagemErro');
            mensagemErro.textContent = 'Erro ao carregar os detalhes do usuário';
            mensagemErro.classList.remove('d-none');
        }
    } else {
        // Redireciona para o login se o token não existir
        window.location.href = 'login.html';
    }
}

// Carrega os detalhes do usuário ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDetalhesUsuario);