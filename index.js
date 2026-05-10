const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

// Firebase 키
const serviceAccount = require("./firebase-key.json");

// Firebase 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


// ========================
// 🔵 루트 테스트
// ========================
app.get("/", (req, res) => {
  res.send("Bedrock Bridge Server is running!");
});


// ========================
// 🔵 테스트: 플레이어 저장
// ========================
app.post("/test", async (req, res) => {
  await db.collection("players").doc("test").set({
    coins: 100,
    level: 5,
    nickname: "Steve"
  });

  res.send("Firestore write success");
});


// ========================
// 🔵 서버 실행
// ========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});