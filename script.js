// URL base da sua API Java (Spring Boot)
// Certifique-se de que o servidor Java está rodando na porta 8080
const API_URL = 'http://localhost:8080/api/v1/produtos';
const container = document.getElementById('product-list'); // Referência ao seu grid no HTML

/**
 * 1. Função principal para buscar os dados da API
 */
async function fetchProducts() {
    try {
        console.log("Tentando buscar produtos da API:", API_URL);
        
        // Faz a chamada HTTP para o endpoint Java
        const response = await fetch(API_URL);

        // Verifica se a resposta foi bem-sucedida (status 200)
        if (!response.ok) {
            // Lança um erro se o status for 4xx ou 5xx
            throw new Error(`Erro ao buscar dados: Status ${response.status}`);
        }

        // Converte a resposta para JSON
        const products = await response.json();
        
        console.log("Produtos recebidos:", products);
        
        // Chama a função para renderizar os produtos na tela
        displayProducts(products);

    } catch (error) {
        console.error("Erro no carregamento dos produtos:", error);
        // Exibe uma mensagem de erro para o usuário (opcional)
        if (container) {
            container.innerHTML = `<p style="text-align: center; color: red;">Não foi possível carregar os produtos. Verifique se o servidor Java está rodando em ${API_URL}.</p>`;
        }
    }
}

/**
 * 2. Função para injetar os produtos no HTML
 */
function displayProducts(products) {
    if (!container) {
        console.error("Elemento 'product-list' não encontrado no DOM.");
        return;
    }
    
    // Limpa o conteúdo antes de injetar (útil se for recarregar a lista)
    container.innerHTML = ''; 
    
    products.forEach(product => {
        // Cria um elemento <a> para envolver o produto, como no HTML estático
        const itemLink = document.createElement('a');
        itemLink.href = `/produto/${product.id}`; // Cria um link para a página de detalhes do produto
        itemLink.classList.add('item');

        // Formata o preço para o padrão brasileiro (R$ X.XXX,XX)
        const precoFormatado = product.preco.toFixed(2).replace('.', ',');

        // Cria a estrutura HTML interna do produto
        itemLink.innerHTML = `
            <img src="${product.urlImagem}" alt="${product.nome}" class="item-img-placeholder">
            <p class="item-name">${product.nome}</p>
            <p class="item-price">R$ ${precoFormatado}</p>
        `;
        
        // Adiciona o item ao container (grid)
        container.appendChild(itemLink);
    });
}