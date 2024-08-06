const express = require('express');
const sql = require('mssql');
const cors = require('cors');

// กำหนดการตั้งค่าการเชื่อมต่อ SQL Server
const dbConfig = {
    user: 'Host_somee_31469_SQLLogin_1',
    password: 'ghyzwz6oms',
    server: 'Ecom_shop.mssql.somee.com', // หรือใช้ชื่อเซิร์ฟเวอร์ที่ถูกต้อง
    database: 'Ecom_shop',
    options: {
        encrypt: true, // ถ้าคุณใช้ Azure SQL Database ให้เปิดใช้งาน
        trustServerCertificate: true // ใช้ true ถ้าคุณใช้ self-signed certificate
    }
    // ,
    // authentication: {
    //     type: 'ntlm', // ใช้ Windows Authentication
    //     options: {
    //         domain: '' // ใส่ชื่อโดเมนถ้ามี ถ้าไม่มีก็ปล่อยว่าง
    //     }
    // }
};

// เริ่มต้น Express app
const app = express();
app.use(express.json());
app.use(cors()); // ใช้ cors middleware

// เชื่อมต่อกับ SQL Server
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Connected to SQL Server');
    }

    // ตัวอย่าง API สำหรับการดึงข้อมูล
    app.get('/api/products', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM products');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // ตัวอย่าง API สำหรับการเพิ่มข้อมูล
    // app.post('/api/users', async (req, res) => {
    //     const { name, email } = req.body;
    //     try {
    //         await pool.request()
    //             .input('name', sql.NVarChar, name)
    //             .input('email', sql.NVarChar, email)
    //             .query('INSERT INTO Users (name, email) VALUES (@name, @email)');
    //         res.status(201).send('User added');
    //     } catch (err) {
    //         res.status(500).send(err.message);
    //     }
    // });

    // เริ่มต้น server
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    

}).catch(err => {
    console.error('Database connection failed:', err.message);
});
