/*
 * The Mongo DB is connected to twice, using Mongoose and the vanilla MongoDB node client
 * /


export var Mongoose = require("mongoose");
import {ENV} from "../env";


// Load database using Mongoose
Mongoose.connect(ENV.MONGO_DB.url);
export var db = Mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback() {
    console.log("Connection with database succeeded.");
});


// Load database using vanilla MongoDB node client
import * as mongodb from "mongodb";
import * as q from "q";

// Could implement as `export type Promise<T> = q.Promise<T>;` but let's see
// if this works for the moment, would be nice to force people not to
// `import * as q from "q";` anyway and leave the async part of the db
export interface Promise<T> extends q.Promise<T> {}
// export interface PromiseDbConnection extends Promise<mongodb.Db> {}


function _getDbConnection(url: string): Promise<mongodb.Db> {
    return mongodb.MongoClient.connect(url, {
        keepAlive: 1,
    });
}

var promisedDbConnection: Promise<mongodb.Db> = _getDbConnection(ENV.MONGO_DB.url);


export interface collectionAndDb {
    name: string;
    db: mongodb.Db;
    collection: mongodb.Collection;
}

export type promisedCollectionAndDb = Promise<collectionAndDb>;


function getCollection(name: string): promisedCollectionAndDb {
    var promisedCollectionAnDb = promisedDbConnection.then((db: mongodb.Db) => {
        var collection = db.collection(name);
        var collAndDb: collectionAndDb = {
            name,
            db,
            collection
        }
        return collAndDb;
    });
    return promisedCollectionAnDb;
}


export interface IndexSetting {
    fieldOrSpec: mongodb.FieldOrSpec;
    indexOptions: mongodb.IndexOptions;
}


export function setUpCollection(name: string, settings: IndexSetting[]): promisedCollectionAndDb {
    var promisedCollectionAndDbConnection = getCollection(name)
    .then((collAndDb: collectionAndDb) => {
        return q.all(settings.map((indexSetting: IndexSetting) => {
            return collAndDb.collection
            .createIndex(indexSetting.fieldOrSpec, indexSetting.indexOptions);
        }))
        .then(() => collAndDb);
    })
    return promisedCollectionAndDbConnection;
}
*/ 
//# sourceMappingURL=db.js.map