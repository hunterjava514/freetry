// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "xxxxxx",
  appId: "xxxxxx"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const cashBalance = document.getElementById("cash-balance");

let balance = 0;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const date = document.getElementById("date").value;
  const desc = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  // Save to Firestore
  await db.collection("expenses").add({ date, desc, amount, type });

  form.reset();
});

// Real-time updates
db.collection("expenses").onSnapshot(snapshot => {
  expenseList.innerHTML = "";
  balance = 0;
  
  snapshot.forEach(doc => {
    const data = doc.data();
    const row = `<tr>
      <td>${data.date}</td>
      <td>${data.desc}</td>
      <td>${data.amount}</td>
      <td>${data.type}</td>
    </tr>`;
    expenseList.innerHTML += row;
    
    if (data.type === "cash") balance -= data.amount;
  });

  cashBalance.textContent = balance;
});
