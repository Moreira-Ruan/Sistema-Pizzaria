document.addEventListener("DOMContentLoaded", function() {
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Obter o token do localStorage
    const token = localStorage.getItem('token');
    console.log(token)

    if (token) {
        // Fazer uma requisição para a API protegida para obter os dados do usuário
        fetch('http://localhost:8000/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados da API:', data); // Adicionado para depuração

            if (data && data.usuario && data.usuario.name) {
                // Exibir o nome do usuário
                welcomeMessage.textContent = `Bem-vindo, ${data.usuario.name}!`;
            } else {
                // Se não encontrar os dados do usuário, redirecionar para a página de login
                console.log('Usuário não encontrado, redirecionando...');
                window.location.href = 'signin.html'; 
            }
        })
        .catch(error => {
            console.log("Erro ao obter os dados do usuário:", error);
            window.location.href = 'signin.html'; // Redireciona se houver erro
        });
    } else {
        // Redireciona para o login se o token não existir
        console.log('Token não encontrado, redirecionando para a página de login...');
        window.location.href = 'signin.html';
    }
});
