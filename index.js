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

// 테스트 API (Firestore 확인용)
app.get("/test", async (req, res) => {
  await db.collection("players").doc("test").set({
    level: 1,
    coins: 100,
    nickname: "test"
  });

  res.send("Firestore OK");
});

// 서버 실행 (이게 핵심)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});