var express = require('express');
var router = express.Router();
const pool = require('../pools/pool');

/* GET users listing. */
router.get('/', (req, res) => {
    if (req.session.success) {
        pool.query(`SELECT * FROM logs`,
            function (err, data) {
                if (err) {
                    res.status(500).send({message: 'Ошибка получения логов', status: 'error'})
                } else {
                    const logs = data.map(item => ({
                        // idItem: item.id,
                        record_id: item.record_id,
                        email: item.email,
                        time: item.time,
                        date: item.date,
                        log_type: item.log_type,
                        log_type_id: item.log_type
                    }))
                    logs.forEach(item => {
                        if (item.log_type === 0) {
                            item.log_type = 'Удаление'
                        } else if (item.log_type === 1) {
                            item.log_type = 'Изменение'
                        } else {
                            item.log_type = 'Создание'
                        }
                    })
                    res.status(200).render("admin.hbs", {
                        title: "Панель администратора",
                        logs: logs.reverse()
                    })
                }
            });
    } else {
        req.session.success = false;
        res.status(403).redirect("/login")
    }
})

module.exports = router;
