import { connect } from "net";
import * as mongoose from "mongoose";
import traceSchema from "./trace";


export default class Manager {
    constructor(){
        if(!Manager.connected){
            Manager.connect()

        }
    }
    static connected = false
    static url = null
    static Trace = mongoose.model('trace', traceSchema)
    static connect(){
        if(Manager.url){
            mongoose.createConnection(Manager.url)
            Manager.connected = true;
        }
    }

    insert(data){
        var trace = new Manager.Trace(data)
    }
}