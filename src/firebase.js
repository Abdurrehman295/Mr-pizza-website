import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg5IdGJ_q1_aat-PfbTCh1BF7Zh7cSq9M",
  authDomain: "mr-pizza-312c9.firebaseapp.com",
  projectId: "mr-pizza-312c9",
  storageBucket: "mr-pizza-312c9.firebasestorage.app",
  messagingSenderId: "987469060411",
  appId: "1:987469060411:web:a1ad5021e07fe7b8d97f1e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const ORDERS_COLLECTION = "orders";

export async function placeOrder(orderData) {
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export function subscribeToOrders(callback) {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(orders);
  });
}

export async function updateOrderStatus(orderId, status) {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(orderRef, { status });
}
