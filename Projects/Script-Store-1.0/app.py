from flask import Flask, render_template, abort
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

    return render_template("iframe_page.html", content_template=f"previews/{filename}")

@app.after_request
def set_csp(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'; frame-ancestors 'none';"
    response.headers['X-Frame-Options'] = 'DENY'
    return response

@app.before_request
def check_referer():
    referer = request.headers.get('Referer')
    if referer and "script-store.netlify.app" not in referer:
        abort(403)
