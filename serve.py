import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    print(f"==================================================")
    print(f"  ☕ ROTTICIOUS CAFE WEB SERVER")
    print(f"  Serving directory: {DIRECTORY}")
    print(f"  URL: http://localhost:{PORT}")
    print(f"==================================================")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server online at http://localhost:{PORT} (Press Ctrl+C to stop)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    main()
