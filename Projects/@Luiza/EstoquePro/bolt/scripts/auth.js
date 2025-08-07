/**
 * Sistema de Autenticação
 * Gerencia login, logout e controle de acesso por níveis
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    // Inicializa o sistema de autenticação
    init() {
        this.createDefaultAdmin();
        this.loadCurrentUser();
        this.setupEventListeners();
    }

    // Cria usuário admin padrão se não existir
    createDefaultAdmin() {
        if (this.users.length === 0) {
            const defaultAdmin = {
                id: this.generateId(),
                name: 'Administrador',
                email: 'admin@loja.com',
                password: this.hashPassword('admin123'),
                role: 'admin',
                createdAt: new Date().toISOString(),
                active: true
            };
            
            this.users.push(defaultAdmin);
            this.saveUsers();
        }
    }

    // Carrega usuários do localStorage
    loadUsers() {
        const users = localStorage.getItem('loja_users');
        return users ? JSON.parse(users) : [];
    }

    // Salva usuários no localStorage
    saveUsers() {
        localStorage.setItem('loja_users', JSON.stringify(this.users));
    }

    // Carrega usuário atual da sessão
    loadCurrentUser() {
        const userData = localStorage.getItem('loja_current_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUserInterface();
        } else {
            this.showLoginForm();
        }
    }

    // Salva usuário atual na sessão
    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('loja_current_user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('loja_current_user');
        }
    }

    // Configura event listeners
    setupEventListeners() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    // Exibe formulário de login
    showLoginForm() {
        const loginHTML = `
            <div class="login-overlay">
                <div class="login-form">
                    <div class="login-header">
                        <i data-feather="lock"></i>
                        <h2>Login - Sistema de Gestão</h2>
                        <p>Acesse sua conta para continuar</p>
                    </div>
                    
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="loginEmail">E-mail:</label>
                            <input type="email" id="loginEmail" required autocomplete="username">
                        </div>
                        
                        <div class="form-group">
                            <label for="loginPassword">Senha:</label>
                            <input type="password" id="loginPassword" required autocomplete="current-password">
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-large">
                            <i data-feather="log-in"></i>
                            Entrar
                        </button>
                    </form>
                    
                    <div class="login-help">
                        <p><strong>Usuário padrão:</strong></p>
                        <p>E-mail: admin@loja.com</p>
                        <p>Senha: admin123</p>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', loginHTML);
        
        // Adiciona estilos do formulário de login
        this.addLoginStyles();
        
        // Configura eventos do formulário
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Inicializa ícones
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Adiciona estilos CSS para o formulário de login
    addLoginStyles() {
        if (!document.getElementById('login-styles')) {
            const styles = `
                <style id="login-styles">
                .login-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                }

                .login-form {
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 400px;
                    margin: 1rem;
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .login-header i {
                    width: 48px;
                    height: 48px;
                    color: #2563eb;
                    margin-bottom: 1rem;
                }

                .login-header h2 {
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                    font-size: 1.5rem;
                }

                .login-header p {
                    color: #6b7280;
                    font-size: 0.875rem;
                }

                .login-help {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: #f3f4f6;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    color: #4b5563;
                }

                .login-help p {
                    margin: 0.25rem 0;
                }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }
    }

    // Manipula o login do usuário
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = this.authenticate(email, password);
        
        if (user) {
            this.currentUser = user;
            this.saveCurrentUser();
            this.updateUserInterface();
            this.removeLoginForm();
            this.showToast('Login realizado com sucesso!', 'success');
        } else {
            this.showToast('E-mail ou senha incorretos!', 'error');
        }
    }

    // Autentica usuário
    authenticate(email, password) {
        const hashedPassword = this.hashPassword(password);
        return this.users.find(user => 
            user.email === email && 
            user.password === hashedPassword && 
            user.active
        );
    }

    // Hash simples para senha (em produção, usar bcrypt)
    hashPassword(password) {
        // Implementação simples - em produção usar algo mais seguro
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    // Remove formulário de login
    removeLoginForm() {
        const loginOverlay = document.querySelector('.login-overlay');
        if (loginOverlay) {
            loginOverlay.remove();
        }
    }

    // Atualiza interface com dados do usuário
    updateUserInterface() {
        if (this.currentUser) {
            const userNameElement = document.getElementById('currentUser');
            if (userNameElement) {
                userNameElement.textContent = this.currentUser.name;
            }

            // Controla acesso baseado no nível do usuário
            this.controlAccess();
        }
    }

    // Controla acesso baseado no nível do usuário
    controlAccess() {
        const userRole = this.currentUser.role;
        
        // Elementos que apenas gerentes e admins podem ver
        const managerElements = document.querySelectorAll('[data-role="manager"], [data-role="admin"]');
        managerElements.forEach(element => {
            if (userRole === 'vendedor') {
                element.style.display = 'none';
            } else {
                element.style.display = '';
            }
        });

        // Elementos que apenas admins podem ver
        const adminElements = document.querySelectorAll('[data-role="admin"]');
        adminElements.forEach(element => {
            if (userRole !== 'admin') {
                element.style.display = 'none';
            } else {
                element.style.display = '';
            }
        });

        // Oculta seção admin para não-admins
        const adminSection = document.querySelector('[data-section="admin"]');
        if (adminSection && userRole !== 'admin') {
            adminSection.style.display = 'none';
        }
    }

    // Logout do usuário
    logout() {
        this.currentUser = null;
        this.saveCurrentUser();
        this.showToast('Logout realizado com sucesso!', 'success');
        location.reload();
    }

    // Verifica se usuário tem permissão
    hasPermission(requiredRole) {
        if (!this.currentUser) return false;
        
        const roleHierarchy = {
            'vendedor': 1,
            'gerente': 2,
            'admin': 3
        };
        
        const userLevel = roleHierarchy[this.currentUser.role] || 0;
        const requiredLevel = roleHierarchy[requiredRole] || 0;
        
        return userLevel >= requiredLevel;
    }

    // Cria novo usuário
    createUser(userData) {
        const newUser = {
            id: this.generateId(),
            name: userData.name,
            email: userData.email,
            password: this.hashPassword(userData.password),
            role: userData.role,
            createdAt: new Date().toISOString(),
            active: true
        };

        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    // Atualiza usuário
    updateUser(userId, userData) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...userData };
            this.saveUsers();
            return this.users[userIndex];
        }
        return null;
    }

    // Remove usuário
    deleteUser(userId) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            this.saveUsers();
            return true;
        }
        return false;
    }

    // Desativa usuário
    deactivateUser(userId) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.active = false;
            this.saveUsers();
            return true;
        }
        return false;
    }

    // Reativa usuário
    activateUser(userId) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.active = true;
            this.saveUsers();
            return true;
        }
        return false;
    }

    // Gera ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Mostra notificação toast
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <p>${message}</p>
            </div>
        `;

        const container = document.getElementById('toastContainer');
        if (container) {
            container.appendChild(toast);

            // Remove toast após 5 segundos
            setTimeout(() => {
                toast.remove();
            }, 5000);
        }
    }

    // Getter para usuário atual
    getCurrentUser() {
        return this.currentUser;
    }

    // Getter para todos os usuários
    getAllUsers() {
        return this.users.filter(user => user.active);
    }
}

// Inicializa sistema de autenticação
window.authSystem = new AuthSystem();