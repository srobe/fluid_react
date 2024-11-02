# watchdog_handler.py

import os
import time
import threading
import requests
from typing import List
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class FileChangeHandler(FileSystemEventHandler):
    """
    Custom event handler to watch for changes in specified directories.
    On any change, it triggers a restart of the Flask server.
    """
    def on_any_event(self, event) -> None:
        """
        Handle any file system event (e.g., modified, created, deleted).

        Args:
            event: The event object containing information about the file system event.
        """
        print(f"Change detected in: {event.src_path}. Restarting Flask...")
        requests.post('http://localhost:5001/shutdown')

def watch_directories(directories: List[str]) -> None:
    """
    Start watching the specified directories for changes using watchdog.
    If any changes are detected, the Flask server will be restarted.

    Args:
        directories (List[str]): List of directories to monitor for changes.
    """
    event_handler: FileChangeHandler = FileChangeHandler()
    observer: Observer = Observer()
    for directory in directories:
        observer.schedule(event_handler, directory, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

def start_watch_thread(directories: List[str]) -> None:
    """
    Start a new thread to watch specified directories.

    Args:
        directories (List[str]): List of directories to monitor for changes.
    """
    watch_thread: threading.Thread = threading.Thread(target=watch_directories, args=(directories,))
    watch_thread.daemon = True
    watch_thread.start()
    
def shutdown() -> str:
    """
    Route to gracefully shutdown the Flask server (development only).

    Returns:
        A message indicating the server is shutting down.
    """
    print("Shutting down server for restart...")
    shutdown_server()
    return "Server shutting down..."

def shutdown_server() -> None:
    """
    Shuts down the Flask server gracefully by calling the shutdown function from the request environment.
    """
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        print('Shutdown request received, but not running with the Werkzeug Server.')
        return
    func()