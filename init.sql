insert into personal_manage.ranks (id, uid, score, name, color, created_at, updated_at)
values  ('1', 1, 10, '宁哥', 'orange', '2023-07-19 10:54:05', '2023-07-21 16:10:47'),
        ('2', 2, 30, '小慧', 'blue', '2023-07-19 10:54:18', '2023-07-21 16:00:50');


insert into personal_manage.users (id, uid, provider, login_name, username, password, token, avatar_url, location, bio, email, ip_addr, role, created_at, updated_at)
values  ('634451e9-bbfb-40e3-8da9-c0a4994ad60e', 1, 'github', 'ning', 'ning', '8aa285d2dc45e75428411e559a01cc72', '', 'https://avatars.githubusercontent.com/u/22109804?v=4', '长沙', '帅气的宁哥', '123@qq.com', '127.0.0.1', 1, '2023-07-04 21:47:28', '2023-07-04 21:47:28'),
        ('affab1e4-25bc-4d30-8a71-cae258d9a3c9', 2, 'github', 'xiaohui', 'xiaohui', '8aa285d2dc45e75428411e559a01cc72', '', 'https://media.discordapp.net/attachments/1131462354127814747/1131499052295532604/20230720161108.jpg', '长沙', '可爱的小慧', '123@qq.com', '127.0.0.1', 1, '2023-07-16 20:56:54', '2023-07-16 20:56:54');