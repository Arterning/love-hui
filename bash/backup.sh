#!/bin/bash

# 数据库连接信息
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root"
DB_PASS="123456"
DB_NAME="personal_manage"

# 备份保存路径
LOCAL_BACKUP_DIR="/mnt/d/backup/${DB_HOST}"

# 检查备份保存路径是否存在，如果不存在则创建目录
if [ ! -d "$LOCAL_BACKUP_DIR" ]; then
  mkdir -p "$LOCAL_BACKUP_DIR"
fi

# 生成备份文件名，添加日期时间后缀
BACKUP_FILE="${LOCAL_BACKUP_DIR}/backup_${DB_NAME}_$(date '+%Y%m%d_%H%M%S').sql"

# 执行备份命令
mysqldump -h ${DB_HOST} -P ${DB_PORT} -u ${DB_USER} -p${DB_PASS} ${DB_NAME} > ${BACKUP_FILE}

# 压缩备份文件（可选）
#gzip ${BACKUP_FILE}
