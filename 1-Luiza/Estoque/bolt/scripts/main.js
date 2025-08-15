/**
 * Script Principal
 * Coordena todos os sistemas e gerencia navegação
 */

class MainSystem {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }

    // Inicializa o sistema principal
    init() {
        this.setupNavigation();
        this.setupGlobalEvents();
        this.initializeFeatherIcons();
        this.showSection('dashboard');
        
        // Aguarda outros sistemas serem carregados
        this.waitForSystems().then(() => {
            this.initializeDashboard();
        });
    }

    // Aguarda sistemas dependentes
    async waitForSystems() {
        const maxWait = 50; // máximo 5 segundos
        let attempts = 0;
        
        while (attempts < maxWait) {
            if (window.authSystem && window.productsSystem && 
                window.salesSystem && window.reportsSystem && 
                window.adminSystem) {
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
    }

    // Configura navegação principal
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const section = button.dataset.section;
                
                if (section) {
                    this.showSection(section);
                    this.updateActiveNavButton(button);
                }
            });
        });
    }

    // Mostra seção específica
    showSection(sectionName) {
        // Esconde todas as seções
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Mostra seção solicitada
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            
            // Executa ações específicas da seção
            this.handleSectionChange(sectionName);
        }
    }

    // Atualiza botão de navegação ativo
    updateActiveNavButton(activeButton) {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    // Manipula mudanças de seção
    handleSectionChange(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.refreshDashboard();
                break;
            case 'products':
                if (window.productsSystem) {
                    window.productsSystem.renderProducts();
                }
                break;
            case 'sales':
                if (window.salesSystem) {
                    window.salesSystem.renderSaleProducts();
                    window.salesSystem.updateCart();
                }
                break;
            case 'reports':
                if (window.reportsSystem) {
                    window.reportsSystem.updateAllCharts();
                }
                break;
            case 'admin':
                if (window.adminSystem) {
                    window.adminSystem.loadUsers();
                    window.adminSystem.loadCashHistory();
                }
                break;
        }
    }

    // Configura eventos globais
    setupGlobalEvents() {
        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Clique fora de modais
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });

        // Prevenção de perda de dados
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    // Manipula redimensionamento da janela
    handleWindowResize() {
        // Redimensiona gráficos se existirem
        if (window.reportsSystem) {
            window.reportsSystem.resizeCharts();
        }

        // Ajusta layout mobile/desktop
        this.adjustLayoutForScreenSize();
    }

    // Ajusta layout baseado no tamanho da tela
    adjustLayoutForScreenSize() {
        const isMobile = window.innerWidth < 768;
        
        // Ajusta navegação para mobile
        const mainNav = document.querySelector('.main-nav');
        if (mainNav) {
            if (isMobile) {
                mainNav.classList.add('mobile-nav');
            } else {
                mainNav.classList.remove('mobile-nav');
            }
        }
    }

    // Manipula atalhos de teclado
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + teclas de atalho
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    this.showSection('dashboard');
                    break;
                case '2':
                    e.preventDefault();
                    this.showSection('products');
                    break;
                case '3':
                    e.preventDefault();
                    this.showSection('sales');
                    break;
                case '4':
                    e.preventDefault();
                    this.showSection('reports');
                    break;
                case '5':
                    e.preventDefault();
                    if (window.authSystem?.hasPermission('admin')) {
                        this.showSection('admin');
                    }
                    break;
            }
        }

        // ESC para fechar modais
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }

    // Manipula cliques fora de elementos
    handleOutsideClick(e) {
        // Fecha dropdowns e menus contextuais
        const dropdowns = document.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Verifica se há mudanças não salvas
    hasUnsavedChanges() {
        // Implementar lógica para verificar mudanças não salvas
        // Por exemplo, formulários em edição
        return false;
    }

    // Fecha todos os modais
    closeAllModals() {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Inicializa ícones Feather
    initializeFeatherIcons() {
        if (typeof feather !== 'undefined') {
            feather.replace();
            
            // Observer para novos elementos
            const observer = new MutationObserver(() => {
                feather.replace();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Inicializa dashboard
    initializeDashboard() {
        this.refreshDashboard();
        
        // Atualiza métricas a cada 30 segundos
        setInterval(() => {
            if (this.currentSection === 'dashboard') {
                this.refreshDashboard();
            }
        }, 30000);
    }

    // Atualiza dashboard
    refreshDashboard() {
        // Atualiza métricas dos cards
        this.updateDashboardMetrics();
        
        // Atualiza gráficos
        if (window.reportsSystem) {
            window.reportsSystem.generateDashboardCharts();
        }
    }

    // Atualiza métricas do dashboard
    updateDashboardMetrics() {
        // Atualiza através dos sistemas específicos
        if (window.productsSystem) {
            window.productsSystem.updateMetrics();
        }
        
        if (window.salesSystem) {
            window.salesSystem.updateMetrics();
        }
    }

    // Mostra loading global
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('active');
        }
    }

    // Esconde loading global
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.remove('active');
        }
    }

    // Exporta dados do sistema
    exportSystemData() {
        const data = {
            products: window.productsSystem?.getProducts() || [],
            sales: window.salesSystem?.getSales() || [],
            users: window.authSystem?.getAllUsers() || [],
            cashOperations: window.adminSystem?.getCashOperations() || [],
            settings: window.adminSystem?.getSettings() || {},
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `loja-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Importa dados do sistema
    importSystemData(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (confirm('Importar dados irá sobrescrever todos os dados atuais. Continuar?')) {
                    // Salva dados importados
                    if (data.products) localStorage.setItem('loja_products', JSON.stringify(data.products));
                    if (data.sales) localStorage.setItem('loja_sales', JSON.stringify(data.sales));
                    if (data.users) localStorage.setItem('loja_users', JSON.stringify(data.users));
                    if (data.cashOperations) localStorage.setItem('loja_cash_operations', JSON.stringify(data.cashOperations));
                    if (data.settings) localStorage.setItem('loja_settings', JSON.stringify(data.settings));
                    
                    // Recarrega página
                    location.reload();
                }
            } catch (error) {
                alert('Erro ao importar dados: arquivo inválido');
            }
        };
        
        reader.readAsText(file);
    }

    // Limpa todos os dados
    clearAllData() {
        if (confirm('Esta ação irá apagar TODOS os dados do sistema. Esta ação não pode ser desfeita. Continuar?')) {
            if (confirm('Tem certeza absoluta? Todos os produtos, vendas e usuários serão perdidos!')) {
                localStorage.clear();
                location.reload();
            }
        }
    }

    // Getter para seção atual
    getCurrentSection() {
        return this.currentSection;
    }
}

// Inicializa sistema principal quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.mainSystem = new MainSystem();
});

// Adiciona estilos globais adicionais
const globalStyles = `
<style>
/* Estilos para dropdown e menus contextuais */
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: var(--shadow-lg);
    border-radius: var(--border-radius-md);
    z-index: 1000;
    border: 1px solid var(--gray-200);
}

.dropdown.active .dropdown-content {
    display: block;
}

.dropdown-content a,
.dropdown-content button {
    color: var(--gray-700);
    padding: var(--space-3) var(--space-4);
    text-decoration: none;
    display: block;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: var(--transition-base);
}

.dropdown-content a:hover,
.dropdown-content button:hover {
    background-color: var(--gray-50);
}

/* Estilos para mobile navigation */
.mobile-nav {
    flex-wrap: wrap;
    justify-content: center;
}

.mobile-nav .nav-btn {
    flex: 1;
    min-width: 80px;
    max-width: 120px;
}

/* Animações de loading customizadas */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideInUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

.slide-in-up {
    animation: slideInUp 0.3s ease-out;
}

/* Melhorias para acessibilidade */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Estados de foco melhorados */
*:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* Suavização geral */
* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Estilo para impressão */
@media print {
    .no-print {
        display: none !important;
    }
    
    .print-only {
        display: block !important;
    }
}

/* Otimizações de performance */
.will-change-transform {
    will-change: transform;
}

.will-change-opacity {
    will-change: opacity;
}

.gpu-accelerated {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
}

/* Mensagens de status */
.status-online {
    color: var(--secondary-color);
}

.status-offline {
    color: var(--danger-color);
}

.status-warning {
    color: var(--warning-color);
}

/* Badges e tags */
.badge {
    display: inline-flex;
    align-items: center;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.badge-primary {
    background-color: var(--primary-color);
    color: white;
}

.badge-success {
    background-color: var(--secondary-color);
    color: white;
}

.badge-warning {
    background-color: var(--warning-color);
    color: white;
}

.badge-danger {
    background-color: var(--danger-color);
    color: white;
}

.badge-secondary {
    background-color: var(--gray-200);
    color: var(--gray-700);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', globalStyles);

// Funções utilitárias globais
window.utils = {
    // Formatar moeda
    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    // Formatar data
    formatDate: (date) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    },

    // Formatar data e hora
    formatDateTime: (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Gerar ID único
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Validar email
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Truncar texto
    truncateText: (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
};