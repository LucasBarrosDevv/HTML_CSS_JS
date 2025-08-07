/**
 * Sistema de Gestão de Produtos
 * Gerencia CRUD de produtos, busca fuzzy e filtros
 */

class ProductsSystem {
    constructor() {
        this.products = this.loadProducts();
        this.categories = [
            'alimentacao', 'limpeza', 'higiene', 'eletronicos',
            'utilidades', 'decoracao', 'papelaria', 'outros'
        ];
        this.nextCode = this.getNextProductCode();
        this.currentEditingProduct = null;
        
        this.init();
    }

    // Inicializa o sistema
    init() {
        this.setupEventListeners();
        this.loadCategoryOptions();
        this.renderProducts();
        this.updateMetrics();
    }

    // Carrega produtos do localStorage
    loadProducts() {
        const products = localStorage.getItem('loja_products');
        return products ? JSON.parse(products) : this.getDefaultProducts();
    }

    // Produtos padrão para demonstração
    getDefaultProducts() {
        return [
            {
                id: 1,
                code: 1,
                name: 'Detergente Ypê',
                description: 'Detergente líquido concentrado para lavar louças',
                category: 'limpeza',
                price: 2.99,
                cost: 1.50,
                stock: 50,
                image: 'https://images.pexels.com/photos/4039921/pexels-photo-4039921.jpeg',
                active: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                code: 2,
                name: 'Arroz Branco 5kg',
                description: 'Arroz tipo 1, pacote de 5 quilos',
                category: 'alimentacao',
                price: 12.90,
                cost: 8.50,
                stock: 25,
                image: 'https://images.pexels.com/photos/4110003/pexels-photo-4110003.jpeg',
                active: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                code: 3,
                name: 'Pasta de Dente Colgate',
                description: 'Creme dental com flúor, 90g',
                category: 'higiene',
                price: 4.50,
                cost: 2.80,
                stock: 3,
                image: 'https://images.pexels.com/photos/298298/pexels-photo-298298.jpeg',
                active: true,
                createdAt: new Date().toISOString()
            }
        ];
    }

    // Salva produtos no localStorage
    saveProducts() {
        localStorage.setItem('loja_products', JSON.stringify(this.products));
        this.updateMetrics();
    }

    // Obtém o próximo código de produto
    getNextProductCode() {
        if (this.products.length === 0) return 1;
        return Math.max(...this.products.map(p => p.code)) + 1;
    }

    // Configura event listeners
    setupEventListeners() {
        // Botão adicionar produto
        const addProductBtn = document.getElementById('addProductBtn');
        if (addProductBtn) {
            addProductBtn.addEventListener('click', () => this.showProductModal());
        }

        // Busca de produtos
        const productSearch = document.getElementById('productSearch');
        if (productSearch) {
            productSearch.addEventListener('input', (e) => this.searchProducts(e.target.value));
        }

        // Filtros
        const categoryFilter = document.getElementById('categoryFilter');
        const statusFilter = document.getElementById('statusFilter');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');

        [categoryFilter, statusFilter, minPrice, maxPrice].forEach(element => {
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
            }
        });

        // Modal de produto
        this.setupProductModal();
    }

    // Configura modal de produto
    setupProductModal() {
        const modal = document.getElementById('productModal');
        const closeBtn = document.getElementById('closeProductModal');
        const cancelBtn = document.getElementById('cancelProductBtn');
        const form = document.getElementById('productForm');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideProductModal());
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hideProductModal());
        }

        if (form) {
            form.addEventListener('submit', (e) => this.handleProductSubmit(e));
        }

        // Fechar modal clicando fora
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideProductModal();
                }
            });
        }
    }

    // Carrega opções de categoria
    loadCategoryOptions() {
        const categorySelects = document.querySelectorAll('#categoryFilter, #productCategory');
        
        categorySelects.forEach(select => {
            if (select && select.id === 'categoryFilter') {
                // Para o filtro, manter opção "Todas as Categorias"
                select.innerHTML = '<option value="">Todas as Categorias</option>';
                this.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = this.getCategoryName(category);
                    select.appendChild(option);
                });
            } else if (select) {
                // Para o formulário
                this.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = this.getCategoryName(category);
                    select.appendChild(option);
                });
            }
        });
    }

    // Obtém nome da categoria em português
    getCategoryName(category) {
        const names = {
            'alimentacao': 'Alimentação',
            'limpeza': 'Limpeza',
            'higiene': 'Higiene',
            'eletronicos': 'Eletrônicos',
            'utilidades': 'Utilidades',
            'decoracao': 'Decoração',
            'papelaria': 'Papelaria',
            'outros': 'Outros'
        };
        return names[category] || category;
    }

    // Busca produtos com fuzzy search
    searchProducts(query) {
        if (!query.trim()) {
            this.renderProducts();
            return;
        }

        const filteredProducts = this.products.filter(product => {
            return this.fuzzyMatch(product.name, query) ||
                   this.fuzzyMatch(product.description, query) ||
                   this.fuzzyMatch(this.getCategoryName(product.category), query) ||
                   product.code.toString().includes(query);
        });

        this.renderProducts(filteredProducts);
    }

    // Implementação de busca fuzzy
    fuzzyMatch(text, query) {
        if (!text || !query) return false;
        
        text = text.toLowerCase();
        query = query.toLowerCase();
        
        // Busca exata
        if (text.includes(query)) return true;
        
        // Busca fuzzy simples
        let textIndex = 0;
        for (let queryIndex = 0; queryIndex < query.length; queryIndex++) {
            const char = query[queryIndex];
            const foundIndex = text.indexOf(char, textIndex);
            if (foundIndex === -1) return false;
            textIndex = foundIndex + 1;
        }
        
        return true;
    }

    // Aplica filtros
    applyFilters() {
        const categoryFilter = document.getElementById('categoryFilter')?.value;
        const statusFilter = document.getElementById('statusFilter')?.value;
        const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;

        let filteredProducts = this.products;

        // Filtro de categoria
        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product => 
                product.category === categoryFilter
            );
        }

        // Filtro de status
        if (statusFilter) {
            filteredProducts = filteredProducts.filter(product => {
                switch (statusFilter) {
                    case 'active': return product.active;
                    case 'inactive': return !product.active;
                    case 'low-stock': return product.stock <= 5;
                    default: return true;
                }
            });
        }

        // Filtro de preço
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );

        this.renderProducts(filteredProducts);
    }

    // Renderiza produtos
    renderProducts(products = this.products) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        if (products.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i data-feather="package"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente ajustar os filtros ou adicione novos produtos</p>
                </div>
            `;
            feather.replace();
            return;
        }

        grid.innerHTML = products.map(product => this.generateProductCard(product)).join('');
        feather.replace();
        
        // Configura event listeners dos cards
        this.setupProductCardEvents();
    }

    // Gera HTML do card de produto
    generateProductCard(product) {
        const stockStatus = this.getStockStatus(product.stock);
        const profitMargin = (((product.price - product.cost) / product.cost) * 100).toFixed(1);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'}" 
                     alt="${product.name}" class="product-image" 
                     onerror="this.src='https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'">
                
                <div class="product-info">
                    <div class="product-header">
                        <span class="product-code">#${product.code}</span>
                        <span class="product-status ${product.active ? 'active' : 'inactive'}">
                            ${product.active ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>
                    
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${this.getCategoryName(product.category)}</p>
                    
                    ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                    
                    <div class="product-details">
                        <div class="detail-item">
                            <span class="detail-label">Preço</span>
                            <span class="detail-value product-price">R$ ${product.price.toFixed(2)}</span>
                        </div>
                        
                        <div class="detail-item">
                            <span class="detail-label">Estoque</span>
                            <span class="detail-value ${stockStatus.class}">${product.stock} un.</span>
                        </div>
                        
                        <div class="detail-item">
                            <span class="detail-label">Custo</span>
                            <span class="detail-value">R$ ${product.cost.toFixed(2)}</span>
                        </div>
                        
                        <div class="detail-item">
                            <span class="detail-label">Margem</span>
                            <span class="detail-value">${profitMargin}%</span>
                        </div>
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn btn-small btn-primary edit-product" data-product-id="${product.id}">
                            <i data-feather="edit"></i>
                            Editar
                        </button>
                        
                        <button class="btn btn-small btn-secondary toggle-status" data-product-id="${product.id}">
                            <i data-feather="${product.active ? 'eye-off' : 'eye'}"></i>
                            ${product.active ? 'Desativar' : 'Ativar'}
                        </button>
                        
                        <button class="btn btn-small btn-danger delete-product" data-product-id="${product.id}" data-role="admin">
                            <i data-feather="trash-2"></i>
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Obtém status do estoque
    getStockStatus(stock) {
        if (stock === 0) {
            return { class: 'stock-out', text: 'Sem estoque' };
        } else if (stock <= 5) {
            return { class: 'stock-low', text: 'Estoque baixo' };
        } else {
            return { class: '', text: 'Em estoque' };
        }
    }

    // Configura eventos dos cards de produto
    setupProductCardEvents() {
        // Botões de editar
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
                this.editProduct(productId);
            });
        });

        // Botões de toggle status
        document.querySelectorAll('.toggle-status').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
                this.toggleProductStatus(productId);
            });
        });

        // Botões de excluir
        document.querySelectorAll('.delete-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
                this.deleteProduct(productId);
            });
        });
    }

    // Mostra modal de produto
    showProductModal(product = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('productModalTitle');
        const form = document.getElementById('productForm');
        
        if (!modal || !form) return;

        this.currentEditingProduct = product;
        
        if (product) {
            title.textContent = 'Editar Produto';
            this.fillProductForm(product);
        } else {
            title.textContent = 'Novo Produto';
            form.reset();
            document.getElementById('productCode').value = this.nextCode;
        }

        modal.classList.add('active');
        feather.replace();
    }

    // Preenche formulário com dados do produto
    fillProductForm(product) {
        document.getElementById('productCode').value = product.code;
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productCost').value = product.cost;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.image || '';
    }

    // Esconde modal de produto
    hideProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.remove('active');
            this.currentEditingProduct = null;
        }
    }

    // Manipula submissão do formulário
    handleProductSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const productData = {
            name: document.getElementById('productName').value.trim(),
            description: document.getElementById('productDescription').value.trim(),
            category: document.getElementById('productCategory').value,
            stock: parseInt(document.getElementById('productStock').value),
            cost: parseFloat(document.getElementById('productCost').value),
            price: parseFloat(document.getElementById('productPrice').value),
            image: document.getElementById('productImage').value.trim()
        };

        // Validações
        if (!this.validateProductData(productData)) {
            return;
        }

        if (this.currentEditingProduct) {
            this.updateProduct(this.currentEditingProduct.id, productData);
        } else {
            this.createProduct(productData);
        }

        this.hideProductModal();
    }

    // Valida dados do produto
    validateProductData(data) {
        if (!data.name) {
            this.showToast('Nome do produto é obrigatório!', 'error');
            return false;
        }

        if (!data.category) {
            this.showToast('Categoria é obrigatória!', 'error');
            return false;
        }

        if (data.cost <= 0) {
            this.showToast('Preço de custo deve ser maior que zero!', 'error');
            return false;
        }

        if (data.price <= 0) {
            this.showToast('Preço de venda deve ser maior que zero!', 'error');
            return false;
        }

        if (data.price <= data.cost) {
            this.showToast('Preço de venda deve ser maior que o custo!', 'error');
            return false;
        }

        if (data.stock < 0) {
            this.showToast('Estoque não pode ser negativo!', 'error');
            return false;
        }

        return true;
    }

    // Cria novo produto
    createProduct(productData) {
        const newProduct = {
            id: this.generateId(),
            code: this.nextCode,
            ...productData,
            active: true,
            createdAt: new Date().toISOString()
        };

        this.products.push(newProduct);
        this.nextCode++;
        this.saveProducts();
        this.renderProducts();
        
        this.showToast('Produto criado com sucesso!', 'success');
    }

    // Atualiza produto
    updateProduct(productId, productData) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...productData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveProducts();
            this.renderProducts();
            
            this.showToast('Produto atualizado com sucesso!', 'success');
        }
    }

    // Edita produto
    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.showProductModal(product);
        }
    }

    // Toggle status do produto
    toggleProductStatus(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.active = !product.active;
            this.saveProducts();
            this.renderProducts();
            
            const status = product.active ? 'ativado' : 'desativado';
            this.showToast(`Produto ${status} com sucesso!`, 'success');
        }
    }

    // Exclui produto
    deleteProduct(productId) {
        if (!window.authSystem?.hasPermission('admin')) {
            this.showToast('Apenas administradores podem excluir produtos!', 'error');
            return;
        }

        if (confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
            const index = this.products.findIndex(p => p.id === productId);
            if (index !== -1) {
                this.products.splice(index, 1);
                this.saveProducts();
                this.renderProducts();
                
                this.showToast('Produto excluído com sucesso!', 'success');
            }
        }
    }

    // Atualiza métricas do dashboard
    updateMetrics() {
        const totalProducts = document.getElementById('totalProducts');
        const lowStock = document.getElementById('lowStock');

        if (totalProducts) {
            totalProducts.textContent = this.products.filter(p => p.active).length;
        }

        if (lowStock) {
            lowStock.textContent = this.products.filter(p => p.active && p.stock <= 5).length;
        }
    }

    // Gera ID único
    generateId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    // Mostra toast
    showToast(message, type = 'info') {
        if (window.authSystem) {
            window.authSystem.showToast(message, type);
        }
    }

    // Getters
    getProducts() {
        return this.products;
    }

    getActiveProducts() {
        return this.products.filter(p => p.active);
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    getProductByCode(code) {
        return this.products.find(p => p.code === code);
    }

    getLowStockProducts() {
        return this.products.filter(p => p.active && p.stock <= 5);
    }

    // Atualiza estoque
    updateStock(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.stock += quantity;
            if (product.stock < 0) product.stock = 0;
            this.saveProducts();
            return true;
        }
        return false;
    }
}

// Inicializa sistema de produtos
window.productsSystem = new ProductsSystem();