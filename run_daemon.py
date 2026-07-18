#!/usr/bin/env python3
"""Double-fork daemon for 42mjj Next.js production server."""
from __future__ import annotations

import os
import signal
import subprocess
import sys
import time
from pathlib import Path

APP = Path("/root/42mjj")
PID_FILE = Path("/var/run/42mjj.pid")
LOG_FILE = Path("/var/log/42mjj.log")
HOST = "127.0.0.1"
PORT = "3042"
NODE = "/usr/bin/node"
NPM = "/usr/bin/npm"


def already_running() -> bool:
    if not PID_FILE.exists():
        return False
    try:
        pid = int(PID_FILE.read_text().strip())
        os.kill(pid, 0)
        return True
    except (ValueError, OSError, ProcessLookupError):
        return False


def daemonize() -> None:
    if os.fork() > 0:
        sys.exit(0)
    os.setsid()
    if os.fork() > 0:
        sys.exit(0)
    sys.stdout.flush()
    sys.stderr.flush()
    with open("/dev/null", "rb", 0) as devnull:
        os.dup2(devnull.fileno(), sys.stdin.fileno())
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    log_fd = open(LOG_FILE, "ab", buffering=0)
    os.dup2(log_fd.fileno(), sys.stdout.fileno())
    os.dup2(log_fd.fileno(), sys.stderr.fileno())


def main() -> int:
    if already_running():
        print("already running", file=sys.stderr)
        return 0

    os.chdir(APP)
    env = os.environ.copy()
    env["NODE_ENV"] = "production"
    env["PORT"] = PORT
    env["HOSTNAME"] = HOST

    # Prefer local next binary
    next_bin = APP / "node_modules" / ".bin" / "next"
    if next_bin.exists():
        cmd = [str(next_bin), "start", "-H", HOST, "-p", PORT]
    else:
        cmd = [NPM, "run", "start", "--", "-H", HOST, "-p", PORT]

    daemonize()
    # After fork: write pid of child process group leader (this process will exec via Popen wait)
    proc = subprocess.Popen(
        cmd,
        cwd=str(APP),
        env=env,
        stdout=open(LOG_FILE, "ab"),
        stderr=subprocess.STDOUT,
        start_new_session=True,
    )
    PID_FILE.write_text(str(proc.pid))
    # Reap when child exits; clear pid
    code = proc.wait()
    try:
        if PID_FILE.exists() and PID_FILE.read_text().strip() == str(proc.pid):
            PID_FILE.unlink(missing_ok=True)
    except OSError:
        pass
    return int(code or 0)


if __name__ == "__main__":
    raise SystemExit(main())
