import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Pengjie Zhou',
        email: 'pengjie@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Man Zhang',
        email: 'man@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Xiaowei Dong',
        email: 'xiaowei@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;
