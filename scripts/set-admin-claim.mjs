import admin from "firebase-admin";
import fs from "node:fs";

function mustGetEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Faltou a variável de ambiente ${name}`);
  return v;
}

const uid = process.argv[2];
if (!uid) {
  console.error("Uso: node scripts/set-admin-claim.mjs <UID_DA_PESSOA_ADMIN>");
  process.exit(1);
}

// Você pode fornecer via caminho de arquivo (recomendado):
// FIREBASE_SERVICE_ACCOUNT_PATH=/caminho/para/serviceAccountKey.json
// ou via JSON string:
// FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"...","project_id":"..."}'
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

let credential;
if (serviceAccountPath) {
  const raw = fs.readFileSync(serviceAccountPath, "utf8");
  credential = admin.credential.cert(JSON.parse(raw));
} else {
  credential = admin.credential.cert(JSON.parse(mustGetEnv("FIREBASE_SERVICE_ACCOUNT_JSON")));
}

admin.initializeApp({ credential });

console.log(`Marcando usuário como admin: uid=${uid}`);

await admin.auth().setCustomUserClaims(uid, { admin: true });

console.log("Feito. O usuário precisará renovar o token (logout/login) para o role entrar em vigor.");

