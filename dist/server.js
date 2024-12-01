"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});
let server;
//database connection
async function Database() {
    try {
        await mongoose_1.default.connect(index_1.default.database_url);
        console.log(` Database connection successful`);
        app_1.default.listen(index_1.default.port, () => {
            console.log(`Server is  listening on port ${index_1.default.port}`);
        });
    }
    catch (err) {
        console.log(`Failed to connect database`, err);
    }
    process.on("unhandledRejection", (error) => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
}
Database();
process.on("SIGTERM", () => {
    console.log("SIGTERM is received");
    if (server) {
        server.close();
    }
});
