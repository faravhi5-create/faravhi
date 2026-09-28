const tournamentData = [
  {name:"Faravhi Battle Royale", mode:"Squad", date:"TBA", time:"TBA", prize:"00", entry:"00", slots:"00", status:"OPEN", art:"BATTLE"},
  {name:"Faravhi Clash Night", mode:"Squad", date:"TBA", time:"TBA", prize:"00", entry:"00", slots:"00", status:"OPEN", art:"CLASH"},
  {name:"Faravhi Championship", mode:"Squad", date:"TBA", time:"TBA", prize:"00", entry:"00", slots:"00", status:"SOON", art:"FINAL"}
];

const leaderboard = [
  ["01","OG BANKAI","12","38","78","116"],
  ["02","LIL STAR'S","10","34","73","107"],
  ["03","IRON PARADISE","9","31","70","101"],
  ["04","DEATH WALKERS","8","29","66","95"],
  ["05","SAVAGE LION","7","24","61","85"]
];

const teams = [
  ["OG","OG BANKAI","Bangladesh"],
  ["LS","LIL STAR'S","Bangladesh"],
  ["IP","IRON PARADISE","Bangladesh"],
  ["DW","DEATH WALKERS","Bangladesh"],
  ["SL","SAVAGE LION","Bangladesh"],
  ["FK","FIRE KINGS","Bangladesh"],
  ["VX","VORTEX","Bangladesh"],
  ["NX","NIGHT X","Bangladesh"]
];

const tournamentGrid = document.getElementById("tournamentGrid");
tournamentGrid.innerHTML = tournamentData.map(t => `
  <article class="tournament-card">
    <div class="t-card-art">
      <span class="tag ${t.status==="SOON" ? "closed":""}">${t.status}</span>
      <strong>${t.art}</strong>
    </div>
    <div class="t-card-body">
      <h3>${t.name}</h3>
      <div class="meta">
        <div><span>DATE</span><b>${t.date}</b></div>
        <div><span>TIME</span><b>${t.time}</b></div>
        <div><span>PRIZE POOL</span><b>${t.prize}</b></div>
        <div><span>ENTRY FEE</span><b>${t.entry}</b></div>
        <div><span>MODE</span><b>${t.mode}</b></div>
        <div><span>SLOTS</span><b>${t.slots}</b></div>
      </div>
      <a href="#register" class="btn ${t.status==="SOON" ? "btn-ghost":"btn-primary"} full">${t.status==="SOON" ? "Coming Soon":"Register Now"} <span>→</span></a>
    </div>
  </article>
`).join("");

document.getElementById("leaderboardBody").innerHTML = leaderboard.map((r,i) => `
<tr>
  <td class="${i===0?"rank-top":""}">${r[0]}</td>
  <td class="team-name">${r[1]}</td>
  <td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td class="score">${r[5]}</td>
</tr>`).join("");

document.getElementById("teamGrid").innerHTML = teams.map(t => `
  <article class="team-card">
    <div class="team-logo">${t[0]}</div>
    <div><h3>${t[1]}</h3><small>${t[2]} · Registered Team</small></div>
  </article>`).join("");

document.getElementById("heroPlayers").textContent = "00+";
document.getElementById("heroTeams").textContent = "00+";
document.getElementById("heroPrize").textContent = "00";
document.getElementById("heroEntry").textContent = "00";

const toast = document.getElementById("toast");
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),3000);
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const modal = document.getElementById("loginModal");
document.querySelectorAll("[data-modal]").forEach(btn=>btn.addEventListener("click",()=>{
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  navLinks.classList.remove("open");
}));
document.querySelectorAll("[data-close]").forEach(btn=>btn.addEventListener("click",closeModal));
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}

document.getElementById("registrationForm").addEventListener("submit",e=>{
  e.preventDefault();
  const form = new FormData(e.target);
  const data = Object.fromEntries(form.entries());
  const saved = JSON.parse(localStorage.getItem("faravhiRegistrations") || "[]");
  saved.push({...data, submittedAt:new Date().toISOString()});
  localStorage.setItem("faravhiRegistrations",JSON.stringify(saved));
  e.target.reset();
  showToast("Registration submitted successfully in demo mode!");
});

document.getElementById("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  closeModal();
  showToast("Demo login submitted. Connect a backend for real authentication.");
});

document.getElementById("subscribeForm").addEventListener("submit",e=>{
  e.preventDefault();
  const email=e.target.querySelector("input").value;
  const list=JSON.parse(localStorage.getItem("faravhiSubscribers")||"[]");
  list.push(email);
  localStorage.setItem("faravhiSubscribers",JSON.stringify(list));
  e.target.reset();
  showToast("You're subscribed for tournament updates!");
});

document.querySelectorAll('a[href="#register"]').forEach(a=>a.addEventListener("click",()=>{
  setTimeout(()=>document.querySelector('[name="teamName"]')?.focus(),500);
}));

// Small reveal animation using IntersectionObserver
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity="1";
      entry.target.style.transform="translateY(0)";
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});

document.querySelectorAll(".section,.tournament-card,.team-card,.rules-grid article,.winner-card").forEach(el=>{
  el.style.opacity="0";
  el.style.transform="translateY(18px)";
  el.style.transition="opacity .6s ease, transform .6s ease";
  observer.observe(el);
});
