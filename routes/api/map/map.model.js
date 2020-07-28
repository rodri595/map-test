const db = require('../../db/db');
const ObjectId = require('mongodb').ObjectId;
let mapColl;

module.exports = class {
    static async initModel() {
        if (! mapColl) {
            let _db = await db.getDB();
            console.log("Database Succesfully Connected :", _db);
            mapColl = await _db.collection('markers');
            if (process.env.ENSUREINDEX == "1") {
                await mapColl.createIndex({
                    "geometry": "2dsphere"
                }, {"unique": true});
            }
            return;
        } else {
            return;
        }
    }
    // initModel
    /**************************        GETALL            **************************************/
    static async getAll() {
        try {
            if (mapColl) {
                let markers = await mapColl.find();
                return markers.toArray();
            }
            return [];
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    /**************************        NEW MARKER            **************************************/
    static async findEmail(ownerId, ownerEmail) {
        try {
            let filter = {
                "infocreated": {
                    "userId": ownerId,
                    "userEmail": ownerEmail
                }
            };
            let check = await mapColl.find(filter).count();
            return check;
        } catch (err) {
            return false;
        }
    }

    static async addOne(ownerId, ownerEmail, lat, long, msg) {
        try {
            const marker = {
                "geometry": {
                    "type": "Point",
                    "coordinates": [lat, long]
                },
                "Message": msg,
                "infocreated": {
                    "userId": ownerId,
                    "userEmail": ownerEmail,
                    "datecreated": new Date().getTime()
                },
                "status": 'ACT'
            }

            const result = await mapColl.insertOne(marker);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
} // class
