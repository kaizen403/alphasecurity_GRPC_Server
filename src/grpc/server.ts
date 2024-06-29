import * as grpc from "@grpc/grpc-js";
import { loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import * as path from "path";

import {
  addVulnerability,
  getVulnerability,
  listVulnerabilities,
  updateVulnerability,
  deleteVulnerability,
  listPentesters,
} from "./handlers/vulnerabilityHandlers";

// Load the protobuf
const PROTO_PATH = path.join(__dirname, "../proto/vulnerability.proto");
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = loadPackageDefinition(packageDefinition) as any; // Use 'any' to avoid type issues

const server = new grpc.Server();

server.addService(proto.VulnerabilityService.service, {
  // Use the correct service
  addVulnerability,
  getVulnerability,
  listVulnerabilities,
  updateVulnerability,
  deleteVulnerability,
  listPentesters,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Server running at http://0.0.0.0:50051");
    server.start();
  },
);
