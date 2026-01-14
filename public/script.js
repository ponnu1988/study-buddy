const chatBox = document.getElementById("chatBox");
const askBtn = document.getElementById("askBtn");
const resetBtn = document.getElementById("resetBtn");
const questionInput = document.getElementById("question");

askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();
  if (!question) return;

  chatBox.innerHTML += `<div class="user"> ${question}</div>`;
  questionInput.value = "";

  const res = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await res.json();
  chatBox.innerHTML += `<div class="bot"> ${data.answer}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});

resetBtn.addEventListener("click", async () => {
  await fetch("/reset", { method: "POST" });
  chatBox.innerHTML = "<i>Clear</i>";
});
