#密钥ssh-keygen，并替换您的电子邮件地址。
ssh-keygen -t ed25519 -C "your_email@example.com"

# 将密钥传输到您的服务器
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@192.0.2.123