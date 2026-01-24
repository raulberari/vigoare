import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAdD_mEexiDvUC9GM_eYZhGBGN8eqywn4",
  authDomain: "vigoare-17105.firebaseapp.com",
  projectId: "vigoare-17105",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const visitRef = doc(db, "stats", "visits");

function todayString() {
  return new Date().toISOString().split("T")[0];
}

async function countVisit() {
  const today = todayString();
  const snap = await getDoc(visitRef);

  if (!snap.exists()) {
    await setDoc(visitRef, {
      allTime: 1,
      today: 1,
      lastDate: today,
    });
    return;
  }

  const data = snap.data();
  const isNewDay = data.lastDate !== today;

  await updateDoc(visitRef, {
    allTime: increment(1),
    today: isNewDay ? 1 : increment(1),
    lastDate: today,
  });
}

const VISIT_KEY = "vigoare_visit_counted";

async function countVisitOncePerSession() {
  if (sessionStorage.getItem(VISIT_KEY)) {
    return; // already counted this visit
  }

  await countVisit();
  sessionStorage.setItem(VISIT_KEY, "true");
}

countVisitOncePerSession();
