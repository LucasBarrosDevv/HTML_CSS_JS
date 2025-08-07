/**
 * Sistema Administrativo
 * Gerencia usuários, caixa e configurações
 */

class AdminSystem {
    constructor() {
        this.cashOperations = this.loadCashOperations();
        this.settings = this.loadSettings();
        this.currentBalance = this.calculateBalance();
        
        this.init();
    }

    // Inicializa o sistema
    init() {
        this.setupEventListeners();
        this.setupTabs();
        this.loadUsers();
        this.loadCashHistory();
        this.loadSettings();
        this.updateCashBalance();
    }

    // Carrega operações de caixa do localStorage
    loadCashOperations() {
        const operations = localStorage.getItem('loja_cash_operations');
        return operations ? JSON.parse(operations) : [];
    }

    // Salva operações de caixa no localStorage
    saveCashOperations() {
        localStorage.setItem('loja_cash_operations', JSON.stringify(this.cashOperations));
        this.currentBalance = this.calculateBalance();
        this.updateCashBalance();
    }

    // Carrega configurações do localStorage
    loadSettings() {
        const settings = localStorage.getItem('loja_settings');
        return settings ? JSON.parse(settings) : {
            storeName: 'Loja de Utilidades',
            minStockAlert: 5,
            currency: 'BRL'
        };
    }

    // Salva configurações no localStorage
    saveSettings() {
        localStorage.setItem('loja_settings', JSON.stringify(this.settings));
    }

    // Configura event listeners
    setupEventListeners() {
        // Botão adicionar usuário
        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.showUserModal());
        }

        // Botão adicionar operação de caixa
        const addOperationBtn = document.getElementById('addOperationBtn');
        if (addOperationBtn) {
            addOperationBtn.addEventListener('click', () => this.addCashOperation());
        }

        // Botão salvar configurações
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettingsForm());
        }

        // Modal de usuário
        this.setupUserModal();
    }

    // Configura sistema de abas
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                
                // Remove active de todas as abas
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Ativa aba atual
                button.classList.add('active');
                const targetContent = document.getElementById(`${tabName}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Configura modal de usuário
    setupUserModal() {
        const modal = document.getElementById('userModal');
        const closeBtn = document.getElementById('closeUserModal');
        const cancelBtn = document.getElementById('cancelUserBtn');
        const form = document.getElementById('userForm');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideUserModal());
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hideUserModal());
        }

        if (form) {
            form.addEventListener('submit', (e) => this.handleUserSubmit(e));
        }

        // Fechar modal clicando fora
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideUserModal();
                }
            });
        }
    }

    // Carrega lista de usuários
    loadUsers() {
        const container = document.getElementById('usersList');
        if (!container) return;

        const users = window.authSystem?.getAllUsers() || [];

        if (users.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i data-feather="users"></i>
                    <p>Nenhum usuário cadastrado</p>
                </div>
            `;
            feather.replace();
            return;
        }

        container.innerHTML = users.map(user => `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                    <div class="user-role">${this.getRoleName(user.role)}</div>
                    <div class="user-created">Criado em: ${new Date(user.createdAt).toLocaleDateString('pt-BR')}</div>
                </div>
                
                <div class="user-actions">
                    <button class="btn btn-small btn-primary edit-user" data-user-id="${user.id}">
                        <i data-feather="edit"></i>
                        Editar
                    </button>
                    
                    <button class="btn btn-small btn-secondary toggle-user" data-user-id="${user.id}">
                        <i data-feather="${user.active ? 'user-x' : 'user-check'}"></i>
                        ${user.active ? 'Desativar' : 'Ativar'}
                    </button>
                    
                    <button class="btn btn-small btn-danger delete-user" data-user-id="${user.id}">
                        <i data-feather="trash-2"></i>
                        Excluir
                    </button>
                </div>
            </div>
        `).join('');

        // Configura eventos dos cards de usuário
        this.setupUserCardEvents();
        feather.replace();
    }

    // Nome da função/cargo
    getRoleName(role) {
        const names = {
            'vendedor': 'Vendedor',
            'gerente': 'Gerente',
            'admin': 'Administrador'
        };
        return names[role] || role;
    }

    // Configura eventos dos cards de usuário
    setupUserCardEvents() {
        // Botões de editar
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('[data-user-id]').dataset.userId;
                this.editUser(userId);
            });
        });

        // Botões de toggle status
        document.querySelectorAll('.toggle-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('[data-user-id]').dataset.userId;
                this.toggleUserStatus(userId);
            });
        });

        // Botões de excluir
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('[data-user-id]').dataset.userId;
                this.deleteUser(userId);
            });
        });
    }

    // Mostra modal de usuário
    showUserModal(user = null) {
        const modal = document.getElementById('userModal');
        const form = document.getElementById('userForm');
        
        if (!modal || !form) return;

        this.currentEditingUser = user;
        
        if (user) {
            document.querySelector('#userModal .modal-header h3').textContent = 'Editar Usuário';
            this.fillUserForm(user);
        } else {
            document.querySelector('#userModal .modal-header h3').textContent = 'Novo Usuário';
            form.reset();
        }

        modal.classList.add('active');
        feather.replace();
    }

    // Preenche formulário com dados do usuário
    fillUserForm(user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userRole').value = user.role;
        
        // Não preenche senha para edição
        document.getElementById('userPassword').value = '';
        document.getElementById('userPassword').placeholder = 'Deixe em branco para manter a senha atual';
    }

    // Esconde modal de usuário
    hideUserModal() {
        const modal = document.getElementById('userModal');
        if (modal) {
            modal.classList.remove('active');
            this.currentEditingUser = null;
        }
    }

    // Manipula submissão do formulário de usuário
    handleUserSubmit(e) {
        e.preventDefault();
        
        const userData = {
            name: document.getElementById('userName').value.trim(),
            email: document.getElementById('userEmail').value.trim(),
            role: document.getElementById('userRole').value,
            password: document.getElementById('userPassword').value
        };

        // Validações
        if (!this.validateUserData(userData)) {
            return;
        }

        if (this.currentEditingUser) {
            this.updateUser(this.currentEditingUser.id, userData);
        } else {
            this.createUser(userData);
        }

        this.hideUserModal();
    }

    // Valida dados do usuário
    validateUserData(data) {
        if (!data.name) {
            this.showToast('Nome é obrigatório!', 'error');
            return false;
        }

        if (!data.email) {
            this.showToast('E-mail é obrigatório!', 'error');
            return false;
        }

        if (!data.role) {
            this.showToast('Nível de acesso é obrigatório!', 'error');
            return false;
        }

        // Verifica se é novo usuário e senha está vazia
        if (!this.currentEditingUser && !data.password) {
            this.showToast('Senha é obrigatória para novos usuários!', 'error');
            return false;
        }

        // Verifica se e-mail já existe
        const existingUsers = window.authSystem?.getAllUsers() || [];
        const emailExists = existingUsers.some(user => 
            user.email === data.email && 
            (!this.currentEditingUser || user.id !== this.currentEditingUser.id)
        );

        if (emailExists) {
            this.showToast('E-mail já está em uso!', 'error');
            return false;
        }

        return true;
    }

    // Cria novo usuário
    createUser(userData) {
        const newUser = window.authSystem?.createUser(userData);
        
        if (newUser) {
            this.loadUsers();
            this.showToast('Usuário criado com sucesso!', 'success');
        } else {
            this.showToast('Erro ao criar usuário!', 'error');
        }
    }

    // Atualiza usuário
    updateUser(userId, userData) {
        // Remove senha se estiver vazia (manter senha atual)
        if (!userData.password) {
            delete userData.password;
        }

        const updated = window.authSystem?.updateUser(userId, userData);
        
        if (updated) {
            this.loadUsers();
            this.showToast('Usuário atualizado com sucesso!', 'success');
        } else {
            this.showToast('Erro ao atualizar usuário!', 'error');
        }
    }

    // Edita usuário
    editUser(userId) {
        const users = window.authSystem?.getAllUsers() || [];
        const user = users.find(u => u.id === userId);
        
        if (user) {
            this.showUserModal(user);
        }
    }

    // Toggle status do usuário
    toggleUserStatus(userId) {
        const users = window.authSystem?.getAllUsers() || [];
        const user = users.find(u => u.id === userId);
        
        if (user) {
            if (user.active) {
                window.authSystem?.deactivateUser(userId);
                this.showToast('Usuário desativado!', 'success');
            } else {
                window.authSystem?.activateUser(userId);
                this.showToast('Usuário ativado!', 'success');
            }
            
            this.loadUsers();
        }
    }

    // Exclui usuário
    deleteUser(userId) {
        if (confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
            const deleted = window.authSystem?.deleteUser(userId);
            
            if (deleted) {
                this.loadUsers();
                this.showToast('Usuário excluído com sucesso!', 'success');
            } else {
                this.showToast('Erro ao excluir usuário!', 'error');
            }
        }
    }

    // Adiciona operação de caixa
    addCashOperation(type = null, amount = null, description = null) {
        if (type && amount && description) {
            // Chamada programática (ex: de uma venda)
            const operation = {
                id: this.generateId(),
                type: type,
                amount: parseFloat(amount),
                description: description,
                date: new Date().toISOString(),
                userId: window.authSystem?.getCurrentUser()?.id || 'system',
                userName: window.authSystem?.getCurrentUser()?.name || 'Sistema'
            };

            this.cashOperations.push(operation);
            this.saveCashOperations();
            return;
        }

        // Chamada manual via formulário
        const operationType = document.getElementById('operationType')?.value;
        const operationAmount = parseFloat(document.getElementById('operationAmount')?.value || 0);
        const operationDescription = document.getElementById('operationDescription')?.value?.trim();

        if (!operationType || !operationAmount || !operationDescription) {
            this.showToast('Preencha todos os campos!', 'error');
            return;
        }

        if (operationAmount <= 0) {
            this.showToast('Valor deve ser maior que zero!', 'error');
            return;
        }

        const operation = {
            id: this.generateId(),
            type: operationType,
            amount: operationAmount,
            description: operationDescription,
            date: new Date().toISOString(),
            userId: window.authSystem?.getCurrentUser()?.id || 'unknown',
            userName: window.authSystem?.getCurrentUser()?.name || 'Usuário'
        };

        this.cashOperations.push(operation);
        this.saveCashOperations();
        this.loadCashHistory();

        // Limpa formulário
        document.getElementById('operationType').value = 'in';
        document.getElementById('operationAmount').value = '';
        document.getElementById('operationDescription').value = '';

        this.showToast('Operação de caixa registrada!', 'success');
    }

    // Calcula saldo do caixa
    calculateBalance() {
        return this.cashOperations.reduce((balance, operation) => {
            return operation.type === 'in' ? 
                balance + operation.amount : 
                balance - operation.amount;
        }, 0);
    }

    // Atualiza saldo do caixa na interface
    updateCashBalance() {
        const balanceElement = document.getElementById('currentBalance');
        if (balanceElement) {
            balanceElement.textContent = `R$ ${this.currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            
            // Muda cor baseado no saldo
            if (this.currentBalance >= 0) {
                balanceElement.style.color = '#16a34a';
            } else {
                balanceElement.style.color = '#dc2626';
            }
        }
    }

    // Carrega histórico de caixa
    loadCashHistory() {
        const container = document.getElementById('cashHistory');
        if (!container) return;

        const operations = this.cashOperations.slice().reverse(); // Mais recentes primeiro

        if (operations.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i data-feather="dollar-sign"></i>
                    <p>Nenhuma operação registrada</p>
                </div>
            `;
            feather.replace();
            return;
        }

        container.innerHTML = `
            <div class="cash-history-header">
                <h4>Histórico de Operações</h4>
            </div>
            <div class="cash-history-list">
                ${operations.map(operation => `
                    <div class="cash-operation-item ${operation.type}">
                        <div class="operation-icon">
                            <i data-feather="${operation.type === 'in' ? 'plus-circle' : 'minus-circle'}"></i>
                        </div>
                        
                        <div class="operation-info">
                            <div class="operation-description">${operation.description}</div>
                            <div class="operation-details">
                                <span class="operation-user">${operation.userName}</span>
                                <span class="operation-date">${new Date(operation.date).toLocaleString('pt-BR')}</span>
                            </div>
                        </div>
                        
                        <div class="operation-amount ${operation.type}">
                            ${operation.type === 'in' ? '+' : '-'} R$ ${operation.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        feather.replace();
    }

    // Carrega configurações na interface
    loadSettings() {
        const storeName = document.getElementById('storeName');
        const minStockAlert = document.getElementById('minStockAlert');
        const currency = document.getElementById('currency');

        if (storeName) storeName.value = this.settings.storeName;
        if (minStockAlert) minStockAlert.value = this.settings.minStockAlert;
        if (currency) currency.value = this.settings.currency;
    }

    // Salva formulário de configurações
    saveSettingsForm() {
        const storeName = document.getElementById('storeName')?.value?.trim();
        const minStockAlert = parseInt(document.getElementById('minStockAlert')?.value || 5);
        const currency = document.getElementById('currency')?.value;

        if (!storeName) {
            this.showToast('Nome da loja é obrigatório!', 'error');
            return;
        }

        if (minStockAlert < 0) {
            this.showToast('Estoque mínimo não pode ser negativo!', 'error');
            return;
        }

        this.settings = {
            storeName,
            minStockAlert,
            currency
        };

        this.saveSettings();
        this.showToast('Configurações salvas com sucesso!', 'success');

        // Atualiza título da página
        document.title = `${storeName} - Sistema de Gestão`;
        
        // Atualiza nome no header se existir
        const logoTitle = document.querySelector('.logo h1');
        if (logoTitle) {
            logoTitle.textContent = storeName;
        }
    }

    // Gera ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Mostra toast
    showToast(message, type = 'info') {
        if (window.authSystem) {
            window.authSystem.showToast(message, type);
        }
    }

    // Getters
    getCashOperations() {
        return this.cashOperations;
    }

    getCurrentBalance() {
        return this.currentBalance;
    }

    getSettings() {
        return this.settings;
    }
}

// Adiciona estilos específicos para admin
const adminStyles = `
<style>
.user-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: var(--space-4);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--space-3);
    border: 1px solid var(--gray-200);
}

.user-info {
    flex: 1;
}

.user-name {
    font-weight: 600;
    font-size: var(--font-size-lg);
    color: var(--gray-900);
    margin-bottom: var(--space-1);
}

.user-email {
    color: var(--gray-600);
    margin-bottom: var(--space-1);
}

.user-role {
    display: inline-block;
    background: var(--primary-color);
    color: white;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 500;
    margin-bottom: var(--space-1);
}

.user-created {
    font-size: var(--font-size-xs);
    color: var(--gray-500);
}

.user-actions {
    display: flex;
    gap: var(--space-2);
}

.cash-operation-item {
    display: flex;
    align-items: center;
    padding: var(--space-3);
    border-bottom: 1px solid var(--gray-200);
    background: white;
    margin-bottom: var(--space-2);
    border-radius: var(--border-radius-md);
}

.cash-operation-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.operation-icon {
    margin-right: var(--space-3);
}

.operation-icon i {
    width: 24px;
    height: 24px;
}

.cash-operation-item.in .operation-icon i {
    color: var(--secondary-color);
}

.cash-operation-item.out .operation-icon i {
    color: var(--danger-color);
}

.operation-info {
    flex: 1;
}

.operation-description {
    font-weight: 600;
    margin-bottom: var(--space-1);
}

.operation-details {
    display: flex;
    gap: var(--space-3);
    font-size: var(--font-size-sm);
    color: var(--gray-600);
}

.operation-amount {
    font-weight: 700;
    font-size: var(--font-size-lg);
}

.operation-amount.in {
    color: var(--secondary-color);
}

.operation-amount.out {
    color: var(--danger-color);
}

.cash-history-header {
    margin-bottom: var(--space-4);
}

.cash-history-list {
    max-height: 500px;
    overflow-y: auto;
}

.settings-form {
    background: white;
    padding: var(--space-6);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-md);
}

.setting-group {
    margin-bottom: var(--space-4);
}

.setting-group label {
    display: block;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: var(--space-2);
}

.setting-group input,
.setting-group select {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--gray-200);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-base);
    transition: var(--transition-base);
}

.setting-group input:focus,
.setting-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', adminStyles);

// Inicializa sistema administrativo
window.adminSystem = new AdminSystem();