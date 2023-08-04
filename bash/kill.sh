#!/bin/bash

# 检查是否提供了端口号作为脚本参数
if [ $# -eq 0 ]; then
  echo "Usage: $0 <port>"
  exit 1
fi

# 获取脚本的第一个参数，即要杀死的端口号
PORT_TO_KILL=$1

# 使用lsof查找占用指定端口的进程ID
PID=$(lsof -t -i :$PORT_TO_KILL)


# 检查PID是否存在，并尝试杀死进程
if [ -n "$PID" ]; then
  echo "Killing process with PID $PID, which is using port $PORT_TO_KILL."
  kill $PID
else
  echo "No process found using port $PORT_TO_KILL."
fi
