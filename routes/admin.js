var express = require('express');
var router = express.Router();
const pool = require('../pools/pool');
// const http = require('http')
const exportFromJSON = require('export-from-json')

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

router.get('/download/txt', function (req, res, next) {
    pool.query(`SELECT * FROM crossWords`, function (err, resultData) {
        if (err) {
            res.send(err);
        } else {
            const data = resultData;
            const fileName = 'crossWords'
            const exportType = 'txt'

            const result = exportFromJSON({
                data,
                fileName,
                exportType,
                processor (content, type, fileName) {
                    switch (type) {
                        case 'txt':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'json':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'csv':
                            res.setHeader('Content-Type', 'text/csv')
                            break
                        case 'xls':
                            res.setHeader('Content-Type', 'application/vnd.ms-excel')
                            break
                    }
                    res.setHeader('Content-disposition', 'attachment;filename=' + fileName)
                    return content
                }
            })

            res.write(result)
            res.end()
        }
    });
})

router.get('/download/json', function (req, res, next) {
    pool.query(`SELECT * FROM crossWords`, function (err, resultData) {
        if (err) {
            res.send(err);
        } else {
            const data = resultData;
            const fileName = 'crossWords'
            const exportType = 'json'

            const result = exportFromJSON({
                data,
                fileName,
                exportType,
                processor (content, type, fileName) {
                    switch (type) {
                        case 'txt':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'json':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'csv':
                            res.setHeader('Content-Type', 'text/csv')
                            break
                        case 'xls':
                            res.setHeader('Content-Type', 'application/vnd.ms-excel')
                            break
                    }
                    res.setHeader('Content-disposition', 'attachment;filename=' + fileName)
                    return content
                }
            })

            res.write(result)
            res.end()
        }
    });
})

router.get('/download/csv', function (req, res, next) {
    pool.query(`SELECT * FROM crossWords`, function (err, resultData) {
        if (err) {
            res.send(err);
        } else {
            const data = resultData;
            const fileName = 'crossWords'
            const exportType = 'csv'

            const result = exportFromJSON({
                data,
                fileName,
                exportType,
                processor (content, type, fileName) {
                    switch (type) {
                        case 'txt':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'json':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'csv':
                            res.setHeader('Content-Type', 'text/csv')
                            break
                        case 'xls':
                            res.setHeader('Content-Type', 'application/vnd.ms-excel')
                            break
                    }
                    res.setHeader('Content-disposition', 'attachment;filename=' + fileName)
                    return content
                }
            })

            res.write(result)
            res.end()
        }
    });
})

router.get('/download/xls', function (req, res, next) {
    pool.query(`SELECT * FROM crossWords`, function (err, resultData) {
        if (err) {
            res.send(err);
        } else {
            const data = resultData;
            const fileName = 'crossWords'
            const exportType = 'xls'

            const result = exportFromJSON({
                data,
                fileName,
                exportType,
                processor (content, type, fileName) {
                    switch (type) {
                        case 'txt':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'json':
                            res.setHeader('Content-Type', 'text/plain')
                            break
                        case 'csv':
                            res.setHeader('Content-Type', 'text/csv')
                            break
                        case 'xls':
                            res.setHeader('Content-Type', 'application/vnd.ms-excel')
                            break
                    }
                    res.setHeader('Content-disposition', 'attachment;filename=' + fileName)
                    return content
                }
            })

            res.write(result)
            res.end()
        }
    });
})

module.exports = router;
