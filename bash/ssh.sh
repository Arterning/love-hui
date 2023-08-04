#密钥ssh-keygen，并替换您的电子邮件地址。
ssh-keygen -t ed25519 -C "your_email@example.com"

# 将密钥传输到您的服务器
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@localhost

# 密钥登录
ssh -i id_ed25519 root@localhost

# 如果已经在config中配置了密钥，那么可以直接这样登录
ssh root@localhost