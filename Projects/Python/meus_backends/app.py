import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)  # Permite CORS para todas as rotas

@app.route('/get_video', methods=['POST'])
def get_video():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({'error': 'URL não fornecida'}), 400

    url = data['url']

    ydl_opts = {
        'format': 'best',
        'quiet': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            video_url = info['url']
    except Exception as e:
        return jsonify({'error': 'Erro ao extrair vídeo', 'details': str(e)}), 500

    return jsonify({'stream_url': video_url})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
