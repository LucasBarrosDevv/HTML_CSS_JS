from flask import Flask, render_template

# Inicializa a aplicação Flask
app = Flask(__name__)

# Rota principal para a página inicial
@app.route('/')
def home():
    # Renderiza um template HTML chamado 'index.html'
    return render_template('index.html')

# Se o script for executado diretamente, o servidor será iniciado
if __name__ == '__main__':
    # O 'debug=True' é ótimo para desenvolvimento, mas deve ser desativado em produção
    app.run(debug=True)