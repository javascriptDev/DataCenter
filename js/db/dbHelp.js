/**
 * Created by a2014 on 14-10-9.
 */


var client = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/newcms';

var dataBase, tables = {};

//缓存db tables
function connect(table, cb) {
    if (!dataBase) {
        client.connect(url, function (err, db) {
            if (err) {
                throw err;
                return;
            }
            dataBase = db;
            if (!tables.hasOwnProperty(table))
                tables[table] = dataBase.collection(table);

            cb && cb();
        });
    } else {
        if (!tables.hasOwnProperty(table))
            tables[table] = dataBase.collection(table)

        cb && cb();
    }
}

function insertDocuments(tn, data, callback) {
    connect(tn, function () {
        tables[tn].insert(data,
            {
                w: 1,
                serializeFunctions: true
            }, function (err, result) {//w:1 如果插入出现错误，会抛异常
                if (err) {
                    throw err
                    return
                } else {
                    callback && callback(result)
                }
            });
    })
}

function updateDocument(tn, where, newData, callback) {
    connect(tn, function () {
        tables[tn].update(where
            , { $set: newData }, function (err, result) {
                if (err) {
                    throw err
                    return
                } else {
                    callback && callback(result)
                }
            });
    })
}

function removeDocument(tn, where, callback) {
    connect(tn, function () {
        tables[tn].remove(where, function (err, result) {
            if (err) {
                throw err
                return
            } else {
                callback && callback(result)
            }
        });
    })
}

function find(tn, where, callback) {
    connect(tn, function () {
        tables[tn].find(where || {}).toArray(function (err, docs) {
            if (err) {
                throw err
                return
            } else {
                callback && callback(docs)
            }
        });
    })
}


module.exports.db = {
    insert: insertDocuments,
    update: updateDocument,
    del: removeDocument,
    query: find
}

