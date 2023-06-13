import configs from "../config/config.ts";
import { MongoClient } from "../deps.ts";
import log from "../middlewares/logger.middleware.ts";
import Seed from "../seed.ts";

const { dbName, mongoUrl, dataApiKey, appId } = configs;

/**
 * Reusable database connection
 */
class Database {
  public client: MongoClient;
  // private seeder: Seed = new Seed();

  /**
   * Constructor function for Database
   * @param dbName
   * @param url
   */
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }

  /**
   * Function to connect to mongo db
   */
  async insertOne() {
    const document = {
      firstName: "Tim",
      LastName: "Tiny",
      amount: 30000,
      year: 2021
    }
    const DATA_SOURCE = "Cluster0";
const DATABASE = "CLC-dev";
const COLLECTION = "pledges";
    const BASE_URI = `https://us-east-1.aws.data.mongodb-api.com/app/${appId}/endpoint/data/v1/action`;
    const headers = new Headers({ 
      "content-type": "application/json", 
      "Access-Control-Request-Headers": "*",
      "api-key": dataApiKey,
      'Accept': 'application/ejson'
    });
    try{
const res = await fetch(`${BASE_URI}/insertOne`, {
  method: "POST",
  headers,
  body: JSON.stringify({collection: COLLECTION,
    database: DATABASE,
    dataSource: DATA_SOURCE,
    document}),
});
console.log(res);
    }catch(err){
      console.log(err);
    }
// await res.json();
//{ title: "A post title", body: "A post body", userId: "a-user-id", id: 201 }
    // console.log(Deno.env.get("MONGO_URI"));
    // log.info("Database connecting...");
    // const client: MongoClient = new MongoClient();
    // // await client.connect(this.url);
    // const db = await client.connect({
    //   db: this.dbName,
    //   tls: true,
    //   servers: [
    //     {
    //       host: 'https://cluster0.iqmgjhb.mongodb.net',
    //       port: 27017,
    //     },
    //   ],
    //   credential: {
    //     username: 'clcUser',
    //     password: 'R0FpWs2FCznfbo73',
    //     mechanism: 'SCRAM-SHA-1',
    //   },
    // });
    // console.log(db);
    // this.client = client;
    // log.info("Database connected!");
    // if (seed) {
    //   const ev = setTimeout(async () => {
    //     await this.seeder.seedCollection();
    //     log.info("All Seed done");
    //     clearTimeout(ev);
    //   }, 10);
    // }
  }

  /**
   * returns database
   */
  get getDatabase() {
    // return this.client.database(this.dbName);
    return this.dbName;
  }
}

const db = new Database(dbName, mongoUrl);
// await db.connect();

export default db;
