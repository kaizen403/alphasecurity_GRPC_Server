"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
const path = __importStar(require("path"));
const vulnerabilityHandlers_1 = require("./handlers/vulnerabilityHandlers");
// Load the protobuf
const PROTO_PATH = path.join(__dirname, "../proto/vulnerability.proto");
const packageDefinition = (0, proto_loader_1.loadSync)(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const proto = (0, grpc_js_1.loadPackageDefinition)(packageDefinition); // Use 'any' to avoid type issues
const server = new grpc.Server();
server.addService(proto.VulnerabilityService.service, {
    // Use the correct service
    addVulnerability: vulnerabilityHandlers_1.addVulnerability,
    getVulnerability: vulnerabilityHandlers_1.getVulnerability,
    listVulnerabilities: vulnerabilityHandlers_1.listVulnerabilities,
    updateVulnerability: vulnerabilityHandlers_1.updateVulnerability,
    deleteVulnerability: vulnerabilityHandlers_1.deleteVulnerability,
    listPentesters: vulnerabilityHandlers_1.listPentesters,
});
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    console.log("Server running at http://0.0.0.0:50051");
    server.start();
});
