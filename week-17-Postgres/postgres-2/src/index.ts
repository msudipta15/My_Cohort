import { Client } from "pg";
import express from "express";

const app = express();
const client = new Client();

async function main() {
  await client.connect(
    "postgresql://neondb_owner:npg_cjUFCitemh42@ep-yellow-river-a55naqz5-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
  );
}
