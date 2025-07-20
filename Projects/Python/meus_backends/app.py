import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)  # Permite CORS para todas as rotas

COOKIE_FILE_PATH = 'cookies.txt'  # Arquivo de cookies exportado do navegador

@app.route('/get_video', methods=['POST'])
def get_video():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({'error': 'URL não fornecida'}), 400

    url = data['url']

    # Configurações do yt_dlp
    ydl_opts = {
        'format': 'best',
        'quiet': True,
    }

    # Se cookies.txt existir, adiciona para autenticação
    if os.path.isfile(COOKIE_FILE_PATH):
        ydl_opts['cookiefile'] = COOKIE_FILE_PATH

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Extrai as informações do vídeo sem baixar
            info = ydl.extract_info(url, download=False)

            # Pega a URL direta do stream, título, thumbnail e duração
            video_url = info.get('url')
            title = info.get('title')
            thumbnail = info.get('thumbnail')
            duration = info.get('duration')

    except Exception as e:
        return jsonify({'error': 'Erro ao extrair vídeo', 'details': str(e)}), 500

    # Retorna dados em JSON para o frontend
    return jsonify({
        'stream_url': video_url,
        'title': title,
        'thumbnail': thumbnail,
        'duration': duration
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
