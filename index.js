const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});
process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
console.log("PROJECT:", process.env.FIREBASE_PROJECT_ID);
console.log("EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("KEY EXISTS:", !!process.env.FIREBASE_PRIVATE_KEY);

console.log("KEY PREVIEW:", process.env.FIREBASE_PRIVATE_KEY?.slice(0, 40));
const db = admin.firestore();

async function test() {
  await db.collection("players").doc("test").set({
    level: 1,
    coins: 100,
    nickname: "test"
  });

  console.log("Firestore connected");
}

test();