/**
 * Sistema de Relatórios
 * Gera relatórios financeiros e de vendas com gráficos
 */

class ReportsSystem {
    constructor() {
        this.charts = {};
        this.init();
    }

    // Inicializa o sistema
    init() {
        this.setupEventListeners();
        this.generateDashboardCharts();
        this.generateReports();
    }

    // Configura event listeners
    setupEventListeners() {
        const generateReportBtn = document.getElementById('generateReportBtn');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', () => this.generateCustomReport());
        }

        // Define datas padrão (últimos 30 dias)
        this.setDefaultDates();
    }

    // Define datas padrão para o relatório
    setDefaultDates() {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');

        if (startDateInput) {
            startDateInput.value = startDate.toISOString().split('T')[0];
        }

        if (endDateInput) {
            endDateInput.value = endDate.toISOString().split('T')[0];
        }
    }

    // Gera gráficos do dashboard
    generateDashboardCharts() {
        this.generateSalesChart();
        this.generateProductsChart();
    }

    // Gera gráfico de vendas dos últimos 7 dias
    generateSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        const last7Days = this.getLast7Days();
        const salesData = this.getSalesDataByDays(last7Days);

        // Destrói gráfico anterior se existir
        if (this.charts.sales) {
            this.charts.sales.destroy();
        }

        this.charts.sales = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days.map(date => 
                    date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' })
                ),
                datasets: [{
                    label: 'Vendas (R$)',
                    data: salesData.revenue,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    // Gera gráfico de produtos mais vendidos
    generateProductsChart() {
        const ctx = document.getElementById('productsChart');
        if (!ctx) return;

        const topProducts = this.getTopSellingProducts(5);

        // Destrói gráfico anterior se existir
        if (this.charts.products) {
            this.charts.products.destroy();
        }

        this.charts.products = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: topProducts.map(p => p.name),
                datasets: [{
                    data: topProducts.map(p => p.quantity),
                    backgroundColor: [
                        '#2563eb',
                        '#16a34a',
                        '#ea580c',
                        '#d97706',
                        '#dc2626'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    // Gera gráfico de métodos de pagamento
    generatePaymentMethodsChart() {
        const ctx = document.getElementById('paymentMethodsChart');
        if (!ctx) return;

        const paymentData = this.getPaymentMethodsData();

        // Destrói gráfico anterior se existir
        if (this.charts.payments) {
            this.charts.payments.destroy();
        }

        this.charts.payments = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(paymentData).map(method => this.getPaymentMethodName(method)),
                datasets: [{
                    label: 'Vendas',
                    data: Object.values(paymentData),
                    backgroundColor: [
                        '#2563eb',
                        '#16a34a',
                        '#ea580c',
                        '#d97706'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Obtém últimos 7 dias
    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date);
        }
        return days;
    }

    // Obtém dados de vendas por dias
    getSalesDataByDays(days) {
        const sales = window.salesSystem?.getSales() || [];
        const revenue = [];
        const quantities = [];

        days.forEach(day => {
            const dayStart = new Date(day);
            dayStart.setHours(0, 0, 0, 0);
            
            const dayEnd = new Date(day);
            dayEnd.setHours(23, 59, 59, 999);

            const daySales = sales.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate >= dayStart && saleDate <= dayEnd;
            });

            const dayRevenue = daySales.reduce((sum, sale) => sum + sale.total, 0);
            const dayQuantity = daySales.reduce((sum, sale) => 
                sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

            revenue.push(dayRevenue);
            quantities.push(dayQuantity);
        });

        return { revenue, quantities };
    }

    // Obtém produtos mais vendidos
    getTopSellingProducts(limit = 5) {
        const sales = window.salesSystem?.getSales() || [];
        const productSales = {};

        sales.forEach(sale => {
            sale.items.forEach(item => {
                if (!productSales[item.productId]) {
                    productSales[item.productId] = {
                        name: item.name,
                        quantity: 0,
                        revenue: 0
                    };
                }
                productSales[item.productId].quantity += item.quantity;
                productSales[item.productId].revenue += item.price * item.quantity;
            });
        });

        return Object.values(productSales)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, limit);
    }

    // Obtém dados de métodos de pagamento
    getPaymentMethodsData() {
        const sales = window.salesSystem?.getSales() || [];
        const methods = {};

        sales.forEach(sale => {
            if (!methods[sale.paymentMethod]) {
                methods[sale.paymentMethod] = 0;
            }
            methods[sale.paymentMethod]++;
        });

        return methods;
    }

    // Nome do método de pagamento
    getPaymentMethodName(method) {
        const names = {
            'cash': 'Dinheiro',
            'card': 'Cartão',
            'pix': 'PIX',
            'check': 'Cheque'
        };
        return names[method] || method;
    }

    // Gera relatório customizado
    generateCustomReport() {
        const startDate = new Date(document.getElementById('startDate')?.value || new Date());
        const endDate = new Date(document.getElementById('endDate')?.value || new Date());

        // Ajusta horários
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        const sales = window.salesSystem?.getSalesByPeriod(startDate, endDate) || [];
        
        this.updateFinancialSummary(sales);
        this.updateTopProductsList(sales);
        this.generatePaymentMethodsChart();
    }

    // Gera relatórios padrão
    generateReports() {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const sales = window.salesSystem?.getSalesByPeriod(startDate, endDate) || [];
        
        this.updateFinancialSummary(sales);
        this.updateTopProductsList(sales);
        this.generatePaymentMethodsChart();
    }

    // Atualiza resumo financeiro
    updateFinancialSummary(sales) {
        const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
        const totalCost = sales.reduce((sum, sale) => sum + sale.totalCost, 0);
        const grossProfit = totalSales - totalCost;
        const profitMargin = totalSales > 0 ? (grossProfit / totalSales) * 100 : 0;

        const reportTotalSales = document.getElementById('reportTotalSales');
        const reportGrossProfit = document.getElementById('reportGrossProfit');
        const reportProfitMargin = document.getElementById('reportProfitMargin');

        if (reportTotalSales) {
            reportTotalSales.textContent = `R$ ${totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }

        if (reportGrossProfit) {
            reportGrossProfit.textContent = `R$ ${grossProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }

        if (reportProfitMargin) {
            reportProfitMargin.textContent = `${profitMargin.toFixed(1)}%`;
        }
    }

    // Atualiza lista de produtos mais vendidos
    updateTopProductsList(sales) {
        const container = document.getElementById('topProductsList');
        if (!container) return;

        const productSales = {};

        sales.forEach(sale => {
            sale.items.forEach(item => {
                if (!productSales[item.productId]) {
                    productSales[item.productId] = {
                        name: item.name,
                        quantity: 0,
                        revenue: 0
                    };
                }
                productSales[item.productId].quantity += item.quantity;
                productSales[item.productId].revenue += item.price * item.quantity;
            });
        });

        const topProducts = Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        if (topProducts.length === 0) {
            container.innerHTML = '<p class="empty-state">Nenhum produto vendido no período</p>';
            return;
        }

        container.innerHTML = topProducts.map((product, index) => `
            <div class="top-product-item">
                <div class="product-rank">${index + 1}º</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-stats">
                        <span>${product.quantity} vendidos</span>
                        <span>R$ ${product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Exporta dados para CSV
    exportToCSV(data, filename) {
        const csvContent = this.arrayToCSV(data);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Converte array para CSV
    arrayToCSV(data) {
        if (!data || data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [];
        
        // Adiciona cabeçalhos
        csvRows.push(headers.join(','));
        
        // Adiciona dados
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value}"` : value;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    // Atualiza todos os gráficos
    updateAllCharts() {
        this.generateDashboardCharts();
        this.generateReports();
    }

    // Destrói todos os gráficos
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }

    // Redimensiona gráficos
    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.resize();
        });
    }
}

// Adiciona estilos específicos para relatórios
const reportStyles = `
<style>
.top-product-item {
    display: flex;
    align-items: center;
    padding: var(--space-3);
    border-bottom: 1px solid var(--gray-200);
}

.top-product-item:last-child {
    border-bottom: none;
}

.product-rank {
    width: 30px;
    height: 30px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: var(--font-size-sm);
    margin-right: var(--space-3);
}

.product-info {
    flex: 1;
}

.product-name {
    font-weight: 600;
    margin-bottom: var(--space-1);
}

.product-stats {
    display: flex;
    gap: var(--space-4);
    font-size: var(--font-size-sm);
    color: var(--gray-600);
}

.empty-state {
    text-align: center;
    padding: var(--space-8);
    color: var(--gray-500);
}

.empty-state i {
    width: 48px;
    height: 48px;
    margin-bottom: var(--space-4);
    color: var(--gray-400);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', reportStyles);

// Inicializa sistema de relatórios
window.reportsSystem = new ReportsSystem();