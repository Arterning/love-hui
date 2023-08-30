tar -czf build.tar.gz build
ssh root@arterning.site 'cd /root/love-hui/nginx-data/html && rm build.tar.gz'
scp build.tar.gz root@arterning.site:/root/love-hui/nginx-data/html
ssh root@arterning.site 'cd /root/love-hui/nginx-data/html && tar -xzf /root/love-hui/nginx-data/html/build.tar.gz'
ssh root@arterning.site 'bash -s' < test.sh
rm -rf build.tar.gz
