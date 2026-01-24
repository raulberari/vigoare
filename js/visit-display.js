import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAdD_mEexiDvUC9GM_eYZhGBGN8eqywn4",
  authDomain: "vigoare-17105.firebaseapp.com",
  projectId: "vigoare-17105",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const visitRef = doc(db, "stats", "visits");

async function loadVisits() {
  const snap = await getDoc(visitRef);
  if (!snap.exists()) return;

  const { today, allTime } = snap.data();
  document.getElementById("visit-count").innerText =
    `${today} today • ${allTime} all time`;
}

loadVisits();
