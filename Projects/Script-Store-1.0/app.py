from flask import Flask, render_template, abort, request
import os

app = Flask(__name__)

VALID_PREVIEWS = {
    "amor-em-pixels": "amor-em-pixels/index.html",
    "birthday": "Bitthday/index.html",
    "hacker": "hacker/index.html",
    "love": "rain-love/index.html",
}

@app.route('/preview/<name>')
def preview(name):
    filename = VALID_PREVIEWS.get(name)
    if not filename:
        abort(404)
    return render_template("code-pages.html", content_template=f"previews/{filename}")

@app.after_request
def set_csp(response):
    # Liberar iframe só pro seu front
    response.headers['Content-Security-Policy'] = "default-src 'self'; frame-ancestors https://script-store.netlify.app;"
    # X-Frame-Options ALLOW-FROM não é suportado por todos os browsers, mas vamos deixar aqui
    response.headers['X-Frame-Options'] = 'ALLOW-FROM https://script-store.netlify.app'
    return response



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Porta que a Render define
    app.run(host="0.0.0.0", port=port)
