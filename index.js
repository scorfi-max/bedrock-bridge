const express = require("express");
const admin = require("firebase-admin");

const app = express();

// Firebase 초기화
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const db = admin.firestore();

// 기본 라우트 (Render 생존용)
app.get("/", (req, res) => {
  res.send("Bedrock Bridge Server is running");
});

// 테스트용
app.get("/", (req, res) => {
  res.send("OK SERVER RUNNING");
});

// 맵에서 호출 테스트용
app.post("/ping", (req, res) => {
  console.log("PING RECEIVED:", req.body);
  res.json({ result: "pong" });
});

app.listen(3000, () => {
  console.log("Server running");
});