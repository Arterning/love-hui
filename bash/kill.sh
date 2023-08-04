#!/bin/bash

# 定义要杀死的端口号
PORT_TO_KILL=8080

# 使用lsof查找占用指定端口的进程ID
PID=$(lsof -t -i :$PORT_TO_KILL)

echo "$PID will be killed"

# 检查PID是否存在，并尝试杀死进程
if [ -n "$PID" ]; then
  echo "Killing process with PID $PID, which is using port $PORT_TO_KILL."
  kill $PID
else
  echo "No process found using port $PORT_TO_KILL."
fi
