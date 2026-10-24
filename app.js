const icon = (name) => `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
const today = new Date();
const dateLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(today);
const storageKey = "household-os-demo-v1";

function demoDate(daysFromToday) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date).toUpperCase();
  return {
    day,
    month,
    label: new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(date),
    iso: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${day}`,
  };
}

const taskDates = [3, 8, 15].map(demoDate);
const billDueDates = [2, 4, 9, 16, 6].map((offset) => demoDate(offset).iso);

const initialState = {
  page: "today",
  quickStartDismissed: false,
  betaFeedback: [],
  estimateApproved: false,
  taskFilter: "upcoming",
  requestFilter: "all",
  billRemindersEnabled: true,
  linkedCarriers: [],
  bills: [
    { id: "bill-power", provider: "Tampa Electric (TECO)", category: "Electric", amount: 238.42, dueDate: billDueDates[0], status: "Due soon", cadence: "Monthly" },
    { id: "bill-internet", provider: "Spectrum", category: "Internet", amount: 89.99, dueDate: billDueDates[1], status: "Due soon", cadence: "Monthly" },
    { id: "bill-water", provider: "City of Tampa Water", category: "Water", amount: 76.18, dueDate: billDueDates[2], status: "Upcoming", cadence: "Monthly" },
    { id: "bill-insurance", provider: "Gulf Coast Home Insurance", category: "Insurance", amount: 312.50, dueDate: billDueDates[3], status: "Upcoming", cadence: "Monthly" },
    { id: "bill-pest", provider: "Palma Ceia Pest Care", category: "Home services", amount: 54.00, dueDate: billDueDates[4], status: "Paid in demo", cadence: "Monthly" },
  ],
  cameras: [
    { id: "front", name: "Front entry", location: "Porch · sample status" },
    { id: "driveway", name: "Driveway", location: "Exterior · sample status" },
    { id: "backyard", name: "Backyard", location: "Pool area · sample status" },
  ],
  pausedCameras: [],
  devices: [
    { id: "porch-light", name: "Porch lights", room: "Exterior", kind: "light", on: false, detail: "2 fixtures" },
    { id: "living-lamp", name: "Living room lamp", room: "Living room", kind: "light", on: true, detail: "Floor lamp" },
    { id: "thermostat", name: "Upstairs thermostat", room: "Upstairs", kind: "appliance", on: true, detail: "Set to 74°" },
    { id: "kitchen-outlet", name: "Kitchen appliance outlet", room: "Kitchen", kind: "appliance", on: false, detail: "Demo smart plug" },
  ],
  assistantQuery: "HVAC tune-up",
  assistantCategory: "hvac",
  assistantSearched: false,
  assistantSelectedId: "",
  tasks: [
    { id: "hvac", title: "HVAC seasonal tune-up", detail: "Trane XV20i · Upstairs system", day: taskDates[0].day, month: taskDates[0].month, date: taskDates[0].label, status: "Coordinating", note: "Jordan is checking two appointment windows.", category: "HVAC", assigned: "Jordan · Home Manager", priority: "attention" },
    { id: "pest", title: "Quarterly pest prevention", detail: "Interior & perimeter · No prep needed", day: taskDates[1].day, month: taskDates[1].month, date: taskDates[1].label, status: "On the calendar", note: "A visit window is being held for you.", category: "Pest", assigned: "Home care", priority: "planned" },
    { id: "pool", title: "Pool equipment check", detail: "Variable-speed pump · Filter inspection", day: taskDates[2].day, month: taskDates[2].month, date: taskDates[2].label, status: "Coming up", note: "A quick check before the next cool front.", category: "Pool", assigned: "Home care", priority: "planned" },
  ],
  requests: [
    { id: "req-1", title: "Upstairs cooling feels uneven", category: "HVAC", status: "Coordinating", note: "Jordan is checking the service history and confirming the right visit.", date: "Today · 9:14 AM", manager: "Jordan Lee" },
    { id: "req-2", title: "Guest bath faucet has a slow drip", category: "Plumbing", status: "New request", note: "Added to your household queue.", date: "Yesterday · 4:32 PM", manager: "Jordan Lee" },
  ],
  assets: [
    { id: "hvac", icon: "snow", name: "Upstairs HVAC", make: "Trane · XV20i heat pump", installed: "Installed 2021", service: "Last serviced Apr 2026", warranty: "Parts coverage through 2031", status: "Tune-up due", next: "Oct 22, 2026", location: "Second floor" },
    { id: "roof", icon: "home", name: "Roof", make: "Architectural shingle · 30-year", installed: "Replaced 2018", service: "Last inspected Nov 2025", warranty: "Installer coverage on file", status: "In good shape", next: "Annual check · Nov 2026", location: "Main house" },
    { id: "pool", icon: "drop", name: "Pool & equipment", make: "Saltwater · Pentair variable-speed", installed: "Pump installed 2022", service: "Last checked Aug 2026", warranty: "Pump warranty through 2027", status: "Filter check coming up", next: "Nov 3, 2026", location: "Backyard" },
    { id: "water", icon: "drop", name: "Water heater", make: "Rheem · 50-gallon electric", installed: "Installed 2020", service: "Last serviced Jan 2026", warranty: "Tank coverage through 2026", status: "Review warranty date", next: "Warranty review · Dec 2026", location: "Garage" },
  ],
  records: [
    { id: "record-1", name: "HVAC installation & warranty", type: "Warranty", detail: "Trane XV20i · Added May 2021", related: "Upstairs HVAC", info: "Model XV20i · Installation date May 18, 2021 · Parts coverage through May 2031. Illustrative sample record; no actual document is stored in this prototype." },
    { id: "record-2", name: "Roof replacement invoice", type: "Home improvement", detail: "Roofing · Added Nov 2018", related: "Roof", info: "Architectural shingle roof replacement · 2018. Illustrative sample record; no actual document is stored in this prototype." },
    { id: "record-3", name: "Pool pump product details", type: "Equipment", detail: "Pentair · Added Aug 2022", related: "Pool & equipment", info: "Variable-speed pool pump · Installed 2022 · Warranty through 2027. Illustrative sample record; no actual document is stored in this prototype." },
    { id: "record-4", name: "Homeowners insurance summary", type: "Insurance", detail: "Policy review · Added Feb 2026", related: "Household", info: "Illustrative summary record. Keep policy numbers and sensitive documents in a secure, verified document vault; this prototype does not store files." },
    { id: "record-5", name: "Water heater purchase receipt", type: "Receipt", detail: "Rheem · Added Jun 2020", related: "Water heater", info: "Rheem 50-gallon electric water heater · Installed 2020. Illustrative sample record; no actual document is stored in this prototype." },
  ],
  customRecords: [],
};

function loadState() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return structuredClone(initialState);
    const saved = JSON.parse(stored);
    const merged = { ...structuredClone(initialState), ...saved };
    merged.betaFeedback = Array.isArray(saved.betaFeedback) ? saved.betaFeedback : [];
    merged.tasks = merged.tasks.map((task) => {
      const seededTask = initialState.tasks.find((item) => item.id === task.id);
      return seededTask ? { ...task, day: seededTask.day, month: seededTask.month, date: seededTask.date } : task;
    });
    merged.bills = merged.bills.map((bill) => {
      const seededBill = initialState.bills.find((item) => item.id === bill.id);
      return seededBill ? { ...bill, dueDate: seededBill.dueDate } : bill;
    });
    return merged;
  } catch (error) {
    console.error("Could not read saved SOLOhome AI demo data.", error);
    storageWarning = true;
    return structuredClone(initialState);
  }
}

let storageWarning = false;
const state = loadState();
const pageView = document.querySelector("#page-view");
const dialog = document.querySelector("#app-dialog");
const dialogContent = document.querySelector("#dialog-content");
const toast = document.querySelector("#toast");
let toastTimer;

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.error("Could not save SOLOhome AI demo data.", error);
    notify("This change is active for this visit but could not be saved in this browser.");
  }
}

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function currentCounts() {
  return {
    tasks: state.tasks.filter((task) => task.status !== "Complete").length,
    requests: state.requests.filter((request) => request.status !== "Resolved").length,
  };
}

function updateBadges() {
  const counts = currentCounts();
  document.querySelector("#care-count").textContent = String(counts.tasks);
  document.querySelector("#request-count").textContent = String(counts.requests);
  document.querySelector("#mobile-request-dot").hidden = counts.requests === 0;
}

function updateNav() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.page === state.page);
  });
  const mobilePages = ["today", "care", "assistant", "bills"];
  document.querySelector(".mobile-nav [data-action='more-pages']").classList.toggle("is-active", !mobilePages.includes(state.page));
}

function intro({ eyebrow, title, subtitle, actions = "" }) {
  return `<div class="page-intro"><div><p class="eyebrow"><span class="eyebrow-dot"></span>${eyebrow}</p><h1 class="page-heading">${title}</h1><p class="page-subtitle">${subtitle}</p></div>${actions ? `<div class="intro-actions">${actions}</div>` : ""}</div>`;
}

function taskDate(task) {
  if (task.id === "hvac" && state.estimateApproved) return "APPROVED";
  return task.status === "Complete" ? "DONE" : task.month;
}

function taskRow(task) {
  const completed = task.status === "Complete";
  const displayedStatus = task.id === "hvac" && state.estimateApproved ? "Approved in demo" : task.status;
  const action = task.id === "hvac" && !state.estimateApproved
    ? `<span class="task-status status-attention">Needs your okay</span>`
    : `<span class="task-status">${esc(displayedStatus)}</span>`;
  return `<div class="upcoming-row${completed ? " completed-row" : ""}">
    <span class="date-badge"><small>${taskDate(task)}</small><strong>${completed ? icon("check") : esc(task.day)}</strong></span>
    <span class="task-main"><strong>${esc(task.title)}</strong><span>${esc(task.detail)}</span></span>
    <span class="task-trailing">${action}<small>${esc(task.note)}</small></span>
  </div>`;
}

function houseIllustration() {
  return `<div class="house-art" aria-hidden="true"><svg viewBox="0 0 270 220" xmlns="http://www.w3.org/2000/svg">
    <circle class="sky" cx="192" cy="45" r="37"/>
    <path class="line-faint" d="M137 25c-1 19-5 31-10 44m5-23-13-6m14-1 12-11m-18 27 17 5m-23-1-9 11"/>
    <path class="plant" d="M29 195c5-25 8-49 6-72 16 17 19 42 13 72m10-1c1-31 8-52 24-67-1 26-9 50-20 69m-42 0c-1-18-8-31-21-40 2 17 9 32 21 44"/>
    <path class="house-shade" d="m84 119 56-48 65 49v71H84z"/>
    <path class="line" d="m76 119 64-55 72 56m-115-9v80h97v-76"/>
    <path class="house-light" d="M112 137h29v52h-29z"/>
    <path class="line" d="M116 141v46m10-46v46m10-46v46m-24-31h29"/>
    <path class="window-glow" d="M158 126h27v27h-27z"/>
    <path class="line" d="M157 126h29v29h-29zm14 0v29m-14-14h29"/>
    <path class="line-faint" d="M68 192h148m-131 8h117"/>
    <path class="line" d="M84 185h-5v7h12m107-1h13"/>
    <path class="plant" d="M202 190c2-17 7-25 17-32 0 14-6 25-17 32m7 0c7-14 14-20 25-21-5 12-13 19-25 23"/>
    <path class="line-faint" d="M51 206h179"/>
    <path class="line" d="M80 119h132"/>
  </svg></div>`;
}

function estimateCard() {
  const approved = state.estimateApproved;
  return `<article class="approval-card">
    <div class="card-heading-row"><span class="section-kicker">${icon("check-circle")} ${approved ? "YOUR DECISION" : "A DECISION FOR YOU"}</span><span class="approval-tag${approved ? " is-approved" : ""}">${approved ? `${icon("check")} Approved in demo` : `${icon("clock")} Your approval`}</span></div>
    <div class="approval-amount">$486<span>one-time estimate</span></div>
    <p class="approval-service">Seasonal HVAC tune-up</p>
    <p class="approval-vendor">Bayline Air & Comfort <span>· fictional demo vendor</span></p>
    <div class="approval-rule"></div>
    <div class="approval-context">${icon("spark")}<span>Jordan reviewed the scope against your Trane system’s service history. The visit is <strong>not scheduled</strong> until you say so.</span></div>
    <div class="approval-buttons">${approved
      ? `<button class="button button-outline button-small" type="button" data-action="review-estimate">View decision</button><button class="button button-soft button-small" type="button" data-action="contact-manager">Message Jordan</button>`
      : `<button class="button button-primary button-small" type="button" data-action="review-estimate">Review estimate ${icon("arrow")}</button><button class="button button-outline button-small" type="button" data-action="contact-manager">Ask Jordan</button>`}</div>
  </article>`;
}

function summaryStrip() {
  const upcoming = state.tasks.filter((task) => task.status !== "Complete").length;
  const requests = state.requests.filter((request) => request.status !== "Resolved").length;
  const approvals = state.estimateApproved ? 0 : 1;
  return `<div class="summary-strip" aria-label="Household overview">
    <div class="summary-item"><span class="summary-icon">${icon("home")}</span><span><strong class="summary-value">${state.assets.length}</strong><span class="summary-label">systems tracked</span></span></div>
    <div class="summary-item"><span class="summary-icon gold">${icon("calendar")}</span><span><strong class="summary-value">${upcoming}</strong><span class="summary-label">care items ahead</span></span></div>
    <div class="summary-item"><span class="summary-icon rose">${icon("clipboard")}</span><span><strong class="summary-value">${requests + approvals}</strong><span class="summary-label">items in motion</span></span></div>
  </div>`;
}

function householdHub() {
  const openBills = state.bills.filter((bill) => bill.status !== "Paid in demo");
  const monthlyBills = state.bills.reduce((sum, bill) => sum + bill.amount, 0);
  const openRequests = state.requests.filter((request) => request.status !== "Resolved").length;
  const devicesOn = state.devices.filter((device) => device.on).length;
  return `<section class="household-hub" aria-label="Household operations at a glance"><div class="page-section-header"><div><h2>Your household, in one view</h2><p>Home care, bills, security, devices and the people who help coordinate it all.</p></div><span class="status-chip status-attention">Illustrative demo</span></div><div class="household-hub-grid">
    <button class="hub-card" type="button" data-page="care"><span class="hub-icon">${icon("calendar")}</span><span class="hub-label">Home care</span><strong>${state.tasks.filter((task) => task.status !== "Complete").length} upcoming items</strong><small>Maintenance and approvals</small><span class="hub-link">Open care calendar ${icon("arrow")}</span></button>
    <button class="hub-card" type="button" data-page="bills"><span class="hub-icon gold">${icon("receipt")}</span><span class="hub-label">Bills & bookkeeping</span><strong>${money(monthlyBills)} / month</strong><small>${openBills.length} sample bills to track</small><span class="hub-link">View bills ${icon("arrow")}</span></button>
    <button class="hub-card" type="button" data-page="smart"><span class="hub-icon blue">${icon("camera")}</span><span class="hub-label">Security & smart home</span><strong>${state.cameras.length} cameras · ${devicesOn}/${state.devices.length} devices on</strong><small>Sample controls only · not connected</small><span class="hub-link">Open device center ${icon("arrow")}</span></button>
    <button class="hub-card" type="button" data-page="assistant"><span class="hub-icon dark">${icon("spark")}</span><span class="hub-label">Service coordination</span><strong>${openRequests} open household requests</strong><small>Find options; a person follows through</small><span class="hub-link">Find help ${icon("arrow")}</span></button>
  </div></section>`;
}

function renderToday() {
  const openTasks = state.tasks.filter((task) => task.status !== "Complete").slice(0, 3);
  const taskContent = openTasks.length ? openTasks.map((task) => taskRow(task)).join("") : `<div class="overview-empty">Nothing on the near-term calendar. We’ll keep an eye on things.</div>`;
  const quickStart = state.quickStartDismissed ? "" : `<section class="demo-guide" aria-label="Three-step demo walkthrough"><div class="demo-guide-heading"><div><p class="eyebrow"><span class="eyebrow-dot"></span> YOUR 2-MINUTE WALKTHROUGH</p><h2>See how the service works</h2><p>Try these sample actions. Nothing contacts a vendor or changes a real home.</p></div><button class="text-button" type="button" data-action="hide-demo-guide">Hide guide</button></div><div class="demo-guide-steps"><button class="demo-guide-step" type="button" data-action="review-estimate"><span>01</span><strong>Review a decision</strong><small>See an estimate and approval flow</small>${icon("arrow")}</button><button class="demo-guide-step" type="button" data-page="assistant"><span>02</span><strong>Explore service options</strong><small>Preview fictional provider examples</small>${icon("arrow")}</button><button class="demo-guide-step" type="button" data-action="add-request"><span>03</span><strong>Tell us what’s up</strong><small>Add a request to the demo queue</small>${icon("arrow")}</button></div></section>`;
  const introActions = `${state.quickStartDismissed ? `<button class="button button-outline" type="button" data-action="show-demo-guide">${icon("spark")} Quick tour</button>` : ""}<button class="button button-outline" type="button" data-action="add-request">${icon("plus")} Tell us what’s up</button>`;
  return `${intro({ eyebrow: dateLabel.toUpperCase(), title: `Good morning, Sarah<span class="period-dot">.</span>`, subtitle: "A unified view of home care, bills, records, devices and the people who help keep it all moving.", actions: introActions })}
    ${quickStart}
    <section class="overview-grid" aria-label="Home dashboard">
      <article class="welcome-card"><div class="welcome-copy"><p class="eyebrow"><span class="eyebrow-dot"></span> YOUR HOME, IN GOOD HANDS</p><h2>A little less to manage.<br><span>A little more room to live.</span></h2><p>Your home manager and SOLOhome AI keep the details moving, so they don’t have to stay on your mind.</p><div class="welcome-actions"><button class="button button-primary button-small" type="button" data-action="view-care">See what’s coming up ${icon("arrow")}</button><button class="welcome-note-link" type="button" data-action="contact-manager">A real person is here to help ${icon("arrow")}</button></div></div>${houseIllustration()}</article>
      ${estimateCard()}
    </section>
    ${summaryStrip()}
    ${householdHub()}
    <section class="dashboard-columns">
      <article class="panel"><div class="panel-header"><div><h2 class="panel-title">The next few things</h2><p class="panel-subtitle">A little care now saves a lot of trouble later.</p></div><button class="panel-link" type="button" data-action="view-care">View home care ${icon("chevron")}</button></div><div class="upcoming-list">${taskContent}</div></article>
      <article class="insight-card"><div class="insight-top"><span>HOME NOTE</span>${icon("spark")}</div><h3>It’s still hurricane season in Tampa Bay.</h3><p>Your roof inspection is on file, but we don’t have a storm-shutter check yet. Jordan can confirm what’s in place before the next watch.</p><div class="insight-footer"><span>Suggested by SOLOhome AI · For review</span><button class="panel-link" type="button" data-action="storm-check">Take a look ${icon("chevron")}</button></div></article>
    </section>
    <div class="service-footer">${icon("shield")}<span><strong>AI notices. People follow through.</strong> Suggestions are reviewed by your home manager. You decide what gets scheduled and what gets spent.</span></div>`;
}

function renderCare() {
  const tasks = state.tasks.filter((task) => {
    if (state.taskFilter === "upcoming") return task.status !== "Complete";
    return task.status === "Complete";
  });
  const cards = tasks.length ? tasks.map((task) => {
    const complete = task.status === "Complete";
    const pendingApproval = task.id === "hvac" && !state.estimateApproved;
    return `<article class="care-card">
      <span class="date-badge"><small>${esc(taskDate(task))}</small><strong>${complete ? icon("check") : esc(task.day)}</strong></span>
      <div class="care-card-content"><h3 class="care-card-title">${esc(task.title)}<span class="status-chip${pendingApproval ? " status-attention" : complete ? " status-done" : ""}">${pendingApproval ? "Your approval" : esc(task.status)}</span></h3><p class="care-card-description">${esc(task.detail)} · ${esc(task.note)}</p><div class="care-card-meta"><span>${icon("calendar")}${esc(task.date)}</span><span>${icon("home")}${esc(task.category)}</span><span>${icon("message")}${esc(task.assigned)}</span></div></div>
      <div class="care-card-actions">${pendingApproval ? `<button class="button button-outline button-small" type="button" data-action="review-estimate">Review estimate</button>` : complete ? `<button class="button button-outline button-small" type="button" data-action="view-task" data-id="${esc(task.id)}">View details</button>` : `<button class="button button-outline button-small" type="button" data-action="mark-complete" data-id="${esc(task.id)}">Mark complete</button>`}</div>
    </article>`;
  }).join("") : `<div class="overview-empty">No completed home care items yet. Once a visit is finished, its history will live here.</div>`;

  return `${intro({ eyebrow: "A HOME THAT RUNS A LITTLE SMOOTHER", title: "Home care, <em>ahead of schedule.</em>", subtitle: "The everyday details, planned with Tampa’s seasons and your home’s systems in mind.", actions: `<button class="button button-primary" type="button" data-action="add-request">${icon("plus")} Request home care</button>` })}
    <div class="service-footer">${icon("spark")}<span><strong>Thoughtful, not automatic.</strong> We suggest what may need attention; your home manager helps coordinate, and nothing is booked without your say-so.</span></div>
    <section class="page-section"><div class="page-section-header"><div><h2>Care calendar</h2><p>Sample schedule for The Bennett Home · Tampa, Florida</p></div></div><div class="filter-row" role="group" aria-label="Filter home care"><button class="filter-button${state.taskFilter === "upcoming" ? " is-active" : ""}" type="button" data-action="filter-care" data-filter="upcoming">Coming up</button><button class="filter-button${state.taskFilter === "complete" ? " is-active" : ""}" type="button" data-action="filter-care" data-filter="complete">Completed</button></div><div class="care-list">${cards}</div></section>
    <section class="page-section"><div class="page-section-header"><div><h2>Seasonal watch</h2><p>Suggestions to review with your home manager.</p></div></div><div class="insight-card"><div class="insight-top"><span>FLORIDA HOME NOTE</span>${icon("sun")}</div><h3>Humidity, storms and salt air are hard on a home.</h3><p>Keep an eye on HVAC filters, pool equipment and exterior seals during the long warm season. Your schedule can change as you learn what works for this home.</p><div class="insight-footer"><span>AI-generated suggestion · Human review recommended</span><button class="panel-link" type="button" data-action="contact-manager">Ask Jordan ${icon("chevron")}</button></div></div></section>`;
}

function assetCard(asset) {
  const tone = asset.id === "water" ? "gold" : "";
  return `<button class="asset-card" type="button" data-action="asset-detail" data-id="${esc(asset.id)}"><span class="asset-card-top"><span class="asset-icon ${tone}">${icon(asset.icon)}</span>${icon("chevron")}</span><h3>${esc(asset.name)}</h3><p>${esc(asset.make)}</p><span class="asset-card-bottom"><span>${esc(asset.installed)}</span><span>${esc(asset.status)}</span></span></button>`;
}

function renderHome() {
  return `${intro({ eyebrow: "A LITTLE KNOWLEDGE GOES A LONG WAY", title: "Meet your <em>home.</em>", subtitle: "The systems, stories and important dates that make this house yours.", actions: `<button class="button button-outline" type="button" data-action="contact-manager">${icon("message")} Ask Jordan to update</button>` })}
    <section class="profile-hero"><div class="profile-overview"><p class="eyebrow"><span class="eyebrow-dot"></span> HOUSEHOLD PROFILE</p><h2 class="page-heading home-title">The Bennett Home</h2><p class="page-subtitle">A Florida bungalow, cared for one detail at a time.</p><div class="profile-address">${icon("location")} Palma Ceia · Tampa, Florida</div><div class="profile-facts"><div class="profile-fact"><strong>1928</strong><span>Year built</span></div><div class="profile-fact"><strong>3 bed · 2 bath</strong><span>Home layout</span></div><div class="profile-fact"><strong>1,940 sq ft</strong><span>Living space</span></div><div class="profile-fact"><strong>Sarah & Mark</strong><span>Household</span></div></div></div><div class="profile-art" aria-label="Illustration of a home"><svg viewBox="0 0 220 150"><path d="m31 78 79-61 79 61M48 74v62h124V74M91 136V94h37v42m-69-47h23v25H70zm70-1h23v25h-23z"/><path d="M26 136h168M86 57h13v11H86zm35-17h13v11h-13zm34 16h13v11h-13z"/><circle cx="110" cy="17" r="3"/></svg></div></section>
    <section class="page-section"><div class="page-section-header"><div><h2>Home systems</h2><p>Four essentials, with the details kept in one place.</p></div><span class="status-chip">4 systems on file</span></div><div class="asset-grid">${state.assets.map(assetCard).join("")}</div></section>
    <section class="detail-columns"><article class="panel"><div class="panel-header"><div><h2 class="panel-title">Household details</h2><p class="panel-subtitle">A little context makes coordination easier.</p></div></div><div class="detail-list"><div class="detail-row"><strong>Property</strong><span>Single-family home</span></div><div class="detail-row"><strong>Neighborhood</strong><span>Palma Ceia · South Tampa</span></div><div class="detail-row"><strong>Preferred contact</strong><span>Text for routine updates</span></div><div class="detail-row"><strong>Home manager</strong><span>Jordan Lee · Demo profile</span></div></div></article><article class="panel"><div class="panel-header"><div><h2 class="panel-title">Your home manager</h2><p class="panel-subtitle">The human on the other side of the service.</p></div></div><div class="detail-list"><div class="contact-row"><span class="concierge-avatar">J</span><span><strong style="display:block;color:#465448;font-size:10px;">Jordan Lee</strong><span style="display:block;color:#92998f;font-size:9px;margin-top:3px;">Sample home manager · Not a real contact</span></span></div><button class="button button-soft button-small" style="margin-top:13px;" type="button" data-action="contact-manager">${icon("message")} Send a note</button></div></article></section>`;
}

function requestCard(request) {
  const statusClass = request.status === "Resolved" ? "status-done" : request.status === "New request" ? "status-open" : "status-attention";
  return `<article class="request-card"><span class="request-icon">${icon(request.category === "Plumbing" ? "drop" : request.category === "Pool" ? "drop" : "home")}</span><div><h3>${esc(request.title)}</h3><p>${esc(request.category)} · ${esc(request.note)}</p><span class="request-date">${esc(request.date)} · Demo activity</span></div><div class="request-status"><span class="status-chip ${statusClass}">${esc(request.status)}</span><button class="button button-outline button-small" type="button" data-action="request-detail" data-id="${esc(request.id)}">Details</button></div></article>`;
}

function renderRequests() {
  const requests = state.requests.filter((request) => state.requestFilter === "all" || (state.requestFilter === "open" ? request.status !== "Resolved" : request.status === "Resolved"));
  return `${intro({ eyebrow: "FROM “SOMETHING FEELS OFF” TO “IT’S HANDLED”", title: "Requests, <em>with follow-through.</em>", subtitle: "Tell us what’s going on. A home manager helps figure out what comes next.", actions: `<button class="button button-primary" type="button" data-action="add-request">${icon("plus")} Start a request</button>` })}
    <div class="service-footer">${icon("message")}<span><strong>Human-led, every step.</strong> Sending a request doesn’t book a vendor, share access, or authorize spending. Your home manager will follow up before any consequential action.</span></div>
    <section class="page-section"><div class="page-section-header"><div><h2>Your household queue</h2><p>${state.requests.length} sample ${state.requests.length === 1 ? "request" : "requests"} · Fictional demo activity only</p></div><div class="request-filter" role="group" aria-label="Filter requests"><button class="filter-button${state.requestFilter === "all" ? " is-active" : ""}" type="button" data-action="filter-requests" data-filter="all">All</button><button class="filter-button${state.requestFilter === "open" ? " is-active" : ""}" type="button" data-action="filter-requests" data-filter="open">Open</button><button class="filter-button${state.requestFilter === "resolved" ? " is-active" : ""}" type="button" data-action="filter-requests" data-filter="resolved">Resolved</button></div></div><div class="request-list">${requests.length ? requests.map(requestCard).join("") : `<div class="overview-empty">Nothing in this view yet. Requests and updates will show here.</div>`}</div></section>
    <section class="page-section"><div class="page-section-header"><div><h2>What happens after you ask?</h2><p>Clear steps, with your approval at the right moments.</p></div></div><article class="panel"><div class="detail-list"><div class="detail-row"><strong>1. We listen</strong><span>Jordan checks in and clarifies what you need.</span></div><div class="detail-row"><strong>2. We coordinate</strong><span>We research options and bring the details back to you.</span></div><div class="detail-row"><strong>3. You decide</strong><span>You approve the vendor, price and appointment before anything is booked.</span></div></div></article></section>`;
}

function recordCard(record) {
  return `<button class="record-card" type="button" data-action="record-detail" data-id="${esc(record.id)}"><span class="record-file-icon">${icon("folder")}</span><span><strong>${esc(record.name)}</strong><small>${esc(record.detail)}</small><span class="record-type">${esc(record.type)}</span></span></button>`;
}

function renderRecords() {
  const records = [...state.records, ...state.customRecords];
  return `${intro({ eyebrow: "ONE CALM PLACE FOR HOME DETAILS", title: "The important stuff, <em>in one place.</em>", subtitle: "A home record is useful when it’s clear, findable and connected to the right system.", actions: `<button class="button button-outline" type="button" data-action="add-record">${icon("plus")} Add a record</button>` })}
    <div class="record-vault">${icon("shield")}<span><strong>Private by design.</strong> This prototype stores only demo record titles in your browser. It does not upload, keep, or protect actual documents.</span></div>
    <section class="page-section"><div class="page-section-header"><div><h2>Home records</h2><p>${records.length} illustrative records · Documents shown are sample entries, not files.</p></div><select class="pill-select" id="record-filter" aria-label="Filter records"><option value="all">All records</option><option value="Warranty">Warranties</option><option value="Insurance">Insurance</option><option value="Equipment">Equipment</option><option value="Receipt">Receipts</option><option value="Home improvement">Home improvements</option></select></div><div class="record-grid" id="record-grid">${records.map(recordCard).join("")}</div></section>
    <section class="page-section"><div class="page-section-header"><div><h2>Why keep it here?</h2><p>Context helps your home manager make the next call a better one.</p></div></div><div class="insight-card"><div class="insight-top"><span>CONNECTED DETAILS</span>${icon("spark")}</div><h3>A warranty date can change the recommendation.</h3><p>Asset details, maintenance history and records can be connected to surface timely next steps—rather than leaving you to piece together the story from old emails.</p></div></section>`;
}

function money(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function billDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`));
}

function renderBills() {
  const monthly = state.bills.reduce((sum, bill) => sum + bill.amount, 0);
  const dueSoon = state.bills.filter((bill) => bill.status !== "Paid in demo" && new Date(`${bill.dueDate}T12:00:00`) <= new Date(`${new Date().toISOString().slice(0, 10)}T12:00:00`));
  const ordered = [...state.bills].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const carriers = ["Tampa Electric (TECO)", "City of Tampa Water", "Spectrum"];
  return `${intro({ eyebrow: "BILLS, WITHOUT THE SPREADSHEETS", title: "A clearer view of <em>what’s due.</em>", subtitle: "Track recurring household bills and upcoming dates alongside the rest of home operations.", actions: `<button class="button button-primary" type="button" data-action="add-bill">${icon("plus")} Add a bill</button>` })}
    <div class="integration-notice">${icon("shield")}<span><strong>Illustrative local demo data.</strong> Bills, amounts, due dates, reminders and provider-link states are examples saved only in this browser. No financial account is connected and no payment can be made.</span></div>
    <section class="bill-metrics" aria-label="Bill summary">
      <article class="bill-metric"><span class="bill-metric-icon">${icon("receipt")}</span><span class="bill-metric-label">Tracked monthly bills</span><strong>${money(monthly)}</strong><small>Illustrative recurring total</small></article>
      <article class="bill-metric"><span class="bill-metric-icon gold">${icon("calendar")}</span><span class="bill-metric-label">Upcoming this cycle</span><strong>${state.bills.filter((bill) => bill.status !== "Paid in demo").length}</strong><small>${dueSoon.length ? `${dueSoon.length} due today or earlier` : "Dates are sample entries"}</small></article>
      <article class="bill-metric"><span class="bill-metric-icon blue">${icon("clock")}</span><span class="bill-metric-label">Annualized estimate</span><strong>${money(monthly * 12)}</strong><small>Illustrative only · not actual spend</small></article>
    </section>
    <section class="page-section bill-layout">
      <article class="panel"><div class="panel-header"><div><h2 class="panel-title">Recurring bills</h2><p class="panel-subtitle">${state.bills.length} sample entries · no account numbers stored</p></div><button class="text-button" type="button" data-action="toggle-bill-reminders">${state.billRemindersEnabled ? "Reminders on" : "Reminders off"}</button></div>
        <div class="bill-list">${ordered.map((bill) => `<article class="bill-row"><span class="bill-category-icon">${icon(bill.category === "Electric" ? "power" : bill.category === "Water" ? "drop" : bill.category === "Internet" ? "link" : "receipt")}</span><span class="bill-description"><strong>${esc(bill.provider)}</strong><small>${esc(bill.category)} · ${esc(bill.cadence)}</small></span><span class="bill-due"><strong>${billDate(bill.dueDate)}</strong><small>Due date · sample</small></span><span class="bill-amount"><strong>${money(bill.amount)}</strong><small class="bill-status${bill.status === "Paid in demo" ? " bill-paid" : ""}">${esc(bill.status)}</small></span>${bill.status === "Paid in demo" ? `<span class="bill-action"><span class="paid-mark">${icon("check")} Demo paid</span></span>` : `<span class="bill-action"><button class="button button-outline button-small" type="button" data-action="mark-bill-paid" data-id="${esc(bill.id)}">Mark paid · demo</button></span>`}</article>`).join("") || `<div class="overview-empty">Add a bill to start your local demo ledger.</div>`}</div>
        <div class="bill-list-footer">${icon("lock")} Payments are never initiated here. “Mark paid” only changes a local demo status.</div>
      </article>
      <aside class="bill-side">
        <article class="insight-card bill-reminder-card"><div class="insight-top"><span>IN-APP REMINDERS</span>${icon("clock")}</div><h3>${state.billRemindersEnabled ? "Your next due dates" : "Reminders are paused"}</h3><p>${state.billRemindersEnabled ? "A visual reminder in this demo—no email, text or push notification is sent." : "Turn reminders on to show the upcoming bill dates here."}</p>
          ${state.billRemindersEnabled ? `<div class="reminder-list">${ordered.filter((bill) => bill.status !== "Paid in demo").slice(0, 3).map((bill) => `<div><span><strong>${esc(bill.provider)}</strong><small>${billDate(bill.dueDate)}</small></span><b>${money(bill.amount)}</b></div>`).join("") || `<span class="field-help">No upcoming bills.</span>`}</div>` : ""}
        </article>
        <article class="panel carrier-panel"><div class="panel-header"><div><h2 class="panel-title">Biller connections</h2><p class="panel-subtitle">Optional provider-link concept</p></div>${icon("link")}</div><p class="carrier-copy">A future secure connection could help import due dates. These buttons only demonstrate consent; no carrier account, data or credentials are accessed.</p><div class="carrier-list">${carriers.map((provider) => {
    const linked = state.linkedCarriers.includes(provider);
    return `<div class="carrier-row"><span>${esc(provider)}</span>${linked ? `<button class="carrier-state is-linked" type="button" data-action="unlink-carrier" data-provider="${esc(provider)}">${icon("check")} Demo linked</button>` : `<button class="carrier-state" type="button" data-action="link-carrier" data-provider="${esc(provider)}">Explore link ${icon("arrow")}</button>`}</div>`;
  }).join("")}</div></article>
      </aside>
    </section>
    <section class="page-section"><div class="page-section-header"><div><h2>Bookkeeping at a glance</h2><p>Example monthly outflow grouped by household category.</p></div><span class="status-chip status-attention">Sample figures</span></div><div class="bill-category-grid">${[...new Set(state.bills.map((bill) => bill.category))].map((category) => `<article class="bill-category-card"><span>${icon("receipt")}${esc(category)}</span><strong>${money(state.bills.filter((bill) => bill.category === category).reduce((sum, bill) => sum + bill.amount, 0))}</strong><small>per sample month</small></article>`).join("")}</div></section>`;
}

const sampleProviders = {
  hvac: [
    { id: "hvac-one", name: "Bayline Air & Comfort", scope: "Seasonal HVAC tune-up", estimate: "$145–$300", note: "Illustrative example · Tampa" },
    { id: "hvac-two", name: "Palma Climate Works", scope: "Heat-pump inspection", estimate: "$125–$275", note: "Illustrative example · South Tampa" },
    { id: "hvac-three", name: "Cypress Cooling Co.", scope: "Air-conditioning maintenance", estimate: "$135–$320", note: "Illustrative example · Tampa Bay" },
  ],
  plumbing: [
    { id: "plumbing-one", name: "Harborlight Plumbing", scope: "Leak diagnosis and repair", estimate: "$95–$250", note: "Illustrative example · Tampa" },
    { id: "plumbing-two", name: "Palma Home Plumbing", scope: "Fixture and faucet service", estimate: "$85–$220", note: "Illustrative example · South Tampa" },
    { id: "plumbing-three", name: "Bay Oak Pipe & Drain", scope: "Residential plumbing visit", estimate: "$110–$280", note: "Illustrative example · Tampa Bay" },
  ],
  roofing: [
    { id: "roof-one", name: "Gulfline Roof Care", scope: "Roof and flashing inspection", estimate: "$125–$350", note: "Illustrative example · Tampa" },
    { id: "roof-two", name: "Palma Shingle & Tile", scope: "Roof condition assessment", estimate: "$150–$400", note: "Illustrative example · South Tampa" },
    { id: "roof-three", name: "Cypress Ridge Roofing", scope: "Storm-readiness roof check", estimate: "$135–$375", note: "Illustrative example · Tampa Bay" },
  ],
  pest: [
    { id: "pest-one", name: "Bay Garden Pest Care", scope: "Home pest-prevention visit", estimate: "$75–$160", note: "Illustrative example · Tampa" },
    { id: "pest-two", name: "Palma Shield Home Care", scope: "Interior and perimeter service", estimate: "$80–$175", note: "Illustrative example · South Tampa" },
    { id: "pest-three", name: "Oak & Gulf Pest Team", scope: "Pest inspection and treatment", estimate: "$90–$190", note: "Illustrative example · Tampa Bay" },
  ],
  pool: [
    { id: "pool-one", name: "Blue Heron Pool Service", scope: "Pump and filter inspection", estimate: "$95–$240", note: "Illustrative example · Tampa" },
    { id: "pool-two", name: "Palma Pool & Patio", scope: "Equipment maintenance visit", estimate: "$110–$260", note: "Illustrative example · South Tampa" },
    { id: "pool-three", name: "Cypress Water Works", scope: "Pool system check", estimate: "$90–$225", note: "Illustrative example · Tampa Bay" },
  ],
  landscaping: [
    { id: "landscape-one", name: "Suncoast Yard & Garden", scope: "Landscape maintenance visit", estimate: "$85–$220", note: "Illustrative example · Tampa" },
    { id: "landscape-two", name: "Palma Green Outdoor Care", scope: "Yard and irrigation review", estimate: "$95–$250", note: "Illustrative example · South Tampa" },
    { id: "landscape-three", name: "Bay Fern Landscape Co.", scope: "Seasonal yard-care service", estimate: "$100–$275", note: "Illustrative example · Tampa Bay" },
  ],
};

function renderAssistant() {
  const providers = sampleProviders[state.assistantCategory] || sampleProviders.hvac;
  const categoryLabels = { hvac: "Heating & cooling", plumbing: "Plumbing", roofing: "Roofing", pest: "Pest prevention", pool: "Pool care", landscaping: "Landscaping" };
  const results = state.assistantSearched ? `<section class="page-section"><div class="page-section-header"><div><h2>Three options to consider</h2><p>Search brief: ${esc(categoryLabels[state.assistantCategory] || "Home service")} · “${esc(state.assistantQuery)}” · Illustrative options, not live search results.</p></div><span class="status-chip status-attention">Mock results</span></div><div class="provider-grid">${providers.map((provider, index) => `<article class="provider-card${state.assistantSelectedId === provider.id ? " is-selected" : ""}"><div class="provider-card-top"><span class="provider-rank">0${index + 1}</span><span class="provider-demo-tag">FICTIONAL EXAMPLE</span></div><h3>${esc(provider.name)}</h3><p>${esc(provider.scope)}</p><div class="provider-detail"><span>Illustrative range</span><strong>${esc(provider.estimate)}</strong></div><div class="provider-detail"><span>Service area</span><span>${esc(provider.note.split("·")[1].trim())}</span></div><button class="button ${state.assistantSelectedId === provider.id ? "button-primary" : "button-outline"} button-small button-full" type="button" data-action="select-provider" data-id="${esc(provider.id)}">${state.assistantSelectedId === provider.id ? `${icon("check")} Selected` : "Choose this option"}</button></article>`).join("")}</div>${state.assistantSelectedId ? `<div class="provider-request-bar"><span><strong>Next: ask for a call arrangement.</strong> A human would confirm availability, scope and your approval before any real call or booking.</span><button class="button button-primary" type="button" data-action="request-provider-call">${icon("message")} Request a call arrangement</button></div>` : ""}</section>` : `<section class="assistant-empty"><span class="assistant-empty-icon">${icon("search")}</span><h2>Start with the job, not a vendor list.</h2><p>Choose a service and we’ll show three fictional examples so you can preview the human-led coordination flow.</p></section>`;
  return `${intro({ eyebrow: "AI-ASSISTED SERVICE FINDER", title: "Tell us what needs <em>taking care of.</em>", subtitle: "SOLOhome AI can help narrow the search—then a person checks the details with you.", actions: `<span class="status-chip status-attention">Illustrative search demo</span>` })}
    <section class="assistant-search-panel"><div class="assistant-search-heading"><span class="assistant-search-icon">${icon("spark")}</span><div><h2>What kind of help are you looking for?</h2><p>We’ll show three example options and an approval-first call request.</p></div></div><form id="assistant-form" class="assistant-form"><div class="form-field"><label for="assistant-category">Service type</label><select id="assistant-category" name="category"><option value="hvac"${state.assistantCategory === "hvac" ? " selected" : ""}>Heating & cooling</option><option value="plumbing"${state.assistantCategory === "plumbing" ? " selected" : ""}>Plumbing</option><option value="roofing"${state.assistantCategory === "roofing" ? " selected" : ""}>Roofing</option><option value="pest"${state.assistantCategory === "pest" ? " selected" : ""}>Pest prevention</option><option value="pool"${state.assistantCategory === "pool" ? " selected" : ""}>Pool care</option><option value="landscaping"${state.assistantCategory === "landscaping" ? " selected" : ""}>Landscaping</option></select></div><div class="form-field assistant-query"><label for="assistant-query">Describe the job</label><input id="assistant-query" name="query" maxlength="90" value="${esc(state.assistantQuery)}" placeholder="e.g. A seasonal HVAC tune-up"></div><button class="button button-primary" type="submit">${icon("search")} Show 3 options</button></form><p class="assistant-privacy">${icon("shield")} No live web search, calls, vendor messages, or appointment bookings happen here. Names, ranges and examples are fictional demo content.</p></section>
    ${results}`;
}

function renderSmartHome() {
  return `${intro({ eyebrow: "A CONNECTED HOME, AT A GLANCE", title: "Smart home, <em>under your control.</em>", subtitle: "A concept for keeping cameras, lighting and everyday devices alongside home care.", actions: `<span class="status-chip status-attention">Simulation only</span>` })}
    <div class="integration-notice">${icon("lock")}<span><strong>No devices or camera feeds are connected.</strong> Every preview and switch below is a local simulation. This demo cannot view, record, stream, or control a real device.</span></div>
    <section class="smart-summary"><div><span class="smart-summary-icon">${icon("camera")}</span><span><strong>${state.cameras.length}</strong><small>sample cameras</small></span></div><div><span class="smart-summary-icon blue">${icon("power")}</span><span><strong>${state.devices.filter((device) => device.on).length} / ${state.devices.length}</strong><small>demo devices on</small></span></div><div><span class="privacy-state">${icon("lock")} LOCAL PREVIEW</span><span class="privacy-state-caption">No live connection</span></div></section>
    <section class="page-section"><div class="page-section-header"><div><h2>CCTV camera viewing area</h2><p>Stylized sample previews demonstrate a future layout; there is no footage or surveillance.</p></div><span class="status-chip status-attention">No live video</span></div><div class="camera-grid">${state.cameras.map((camera, index) => {
    const paused = state.pausedCameras.includes(camera.id);
    return `<article class="camera-card"><div class="camera-preview camera-scene-${index + 1}"><span class="camera-preview-stamp">${paused ? "PAUSED IN DEMO" : "SAMPLE PREVIEW"}</span><span class="camera-horizon"></span><span class="camera-house-shape"></span><span class="camera-caption">ILLUSTRATIVE · NOT LIVE</span></div><div class="camera-card-info"><span><strong>${esc(camera.name)}</strong><small>${esc(camera.location)}</small></span><span class="camera-offline">${paused ? "Demo paused" : "Not connected"}</span></div><div class="camera-actions"><button class="button button-outline button-small" type="button" data-action="view-camera" data-id="${esc(camera.id)}">View sample</button><button class="text-button" type="button" data-action="toggle-camera" data-id="${esc(camera.id)}">${paused ? "Resume demo" : "Pause demo"}</button></div></article>`;
  }).join("")}</div></section>
    <section class="page-section"><div class="page-section-header"><div><h2>Lights & appliances</h2><p>Try a control to see the simulated state change. No command leaves this page.</p></div></div><div class="device-grid">${state.devices.map((device) => `<article class="device-card"><span class="device-icon">${icon(device.kind === "light" ? "light" : "power")}</span><div class="device-copy"><strong>${esc(device.name)}</strong><small>${esc(device.room)} · ${esc(device.detail)}</small></div><button class="device-switch${device.on ? " is-on" : ""}" type="button" role="switch" aria-checked="${device.on}" aria-label="${device.on ? "Turn off" : "Turn on"} ${esc(device.name)} in demo" data-action="toggle-device" data-id="${esc(device.id)}"><span></span></button><span class="device-state">${device.on ? "On" : "Off"} · demo</span></article>`).join("")}</div></section>
    <div class="service-footer">${icon("shield")}<span><strong>Your home stays private.</strong> A real integration would require your explicit permission, a supported provider and secure authorization. This prototype collects no device credentials.</span></div>`;
}

function renderMembership() {
  const plans = [
    { name: "Essential", price: "$99", label: "For the thoughtful homeowner", features: ["A clear home profile & asset inventory", "Seasonal maintenance calendar", "Home records organized in one place", "Human support for everyday questions"] },
    { name: "Complete", price: "$249", label: "For more time back, month to month", featured: true, features: ["Everything in Essential", "Proactive vendor research & coordination", "Quote review and appointment follow-through", "A dedicated home manager for the details"] },
    { name: "White Glove", price: "$499+", label: "For the home that needs more hands-on care", features: ["Everything in Complete", "More hands-on project coordination", "Priority response and custom home planning", "A service plan shaped around your household"] },
  ];
  return `${intro({ eyebrow: "A SERVICE, NOT JUST ANOTHER APP", title: "Support that fits <em>your home.</em>", subtitle: "Membership is designed to pair a simple home-operations platform with real human follow-through." })}
    <div class="pricing-banner"><p><strong>Proposed membership pricing.</strong> Illustrative tiers for discussion—not validated, not current customer pricing, and not evidence of traction.</p><span class="status-chip status-attention">Working assumptions</span></div>
    <section class="page-section"><div class="pricing-grid">${plans.map((plan) => `<article class="price-card${plan.featured ? " is-featured" : ""}">${plan.featured ? `<span class="featured-badge">CORE TIER</span>` : ""}<p class="price-tier">${plan.name}</p><p class="price-amount">${plan.price}<span>/ month · proposed</span></p><p class="price-desc">${plan.label}</p>${plan.features.map((feature) => `<div class="price-feature">${icon("check")}<span>${feature}</span></div>`).join("")}<button class="button ${plan.featured ? "button-primary" : "button-outline"} button-small" type="button" data-action="plan-interest" data-plan="${plan.name}">Explore ${plan.name} ${icon("arrow")}</button></article>`).join("")}</div></section>
    <section class="page-section"><div class="insight-card"><div class="insight-top"><span>THE SOLOHOME AI MODEL</span>${icon("spark")}</div><h3>AI helps notice. A person helps get it done.</h3><p>Starting with a focused Tampa-area home-care pilot, the service is designed to learn directly from members before automating what is repeatable. AI can summarize records, suggest maintenance and draft next steps; people check context, coordinate vendors and keep homeowners in control.</p><div class="insight-footer"><span>Illustrative business-model description</span><button class="panel-link" type="button" data-action="how-it-works">How it works ${icon("chevron")}</button></div></div></section>`;
}

const pageRenderers = { today: renderToday, home: renderHome, care: renderCare, requests: renderRequests, records: renderRecords, bills: renderBills, smart: renderSmartHome, assistant: renderAssistant, membership: renderMembership };

function render() {
  updateBadges();
  updateNav();
  pageView.innerHTML = pageRenderers[state.page]();
  if (state.page === "records") {
    document.querySelector("#record-filter").addEventListener("change", (event) => {
      const value = event.target.value;
      const records = [...state.records, ...state.customRecords].filter((record) => value === "all" || record.type === value);
      document.querySelector("#record-grid").innerHTML = records.length ? records.map(recordCard).join("") : `<div class="overview-empty">No records in this category yet.</div>`;
    });
  }
}

function showDialog(content) {
  dialogContent.innerHTML = content;
  if (!dialog.open) dialog.showModal();
}

function closeDialog() {
  if (dialog.open) dialog.close();
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function showEstimateDialog() {
  const approved = state.estimateApproved;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">${approved ? "YOUR DECISION · DEMO ONLY" : "ESTIMATE FOR YOUR REVIEW · DEMO ONLY"}</p><h2 class="dialog-title" id="dialog-title">A seasonal tune-up for the upstairs system</h2><p class="dialog-copy">Bayline Air & Comfort is a fictional example vendor. The estimate and details below are for this prototype—not a real quote, booking, or endorsement.</p>
    <div class="dialog-highlight">${icon("spark")}<span><strong>Why this came up:</strong> The Trane XV20i was installed in 2021, and the last service record is from April. A seasonal check is a reasonable next step in Tampa’s long cooling season. Jordan reviewed the suggestion.</span></div>
    <div class="quote-breakdown"><div class="quote-row"><span>Seasonal system inspection</span><strong>$145</strong></div><div class="quote-row"><span>Coil & condensate line cleaning</span><strong>$185</strong></div><div class="quote-row"><span>Filter replacement & materials</span><strong>$46</strong></div><div class="quote-row"><span>Service call</span><strong>$110</strong></div><div class="quote-row quote-total"><span>Illustrative estimate · before any changes</span><strong>$486</strong></div></div>
    <div class="approval-guard">${icon("shield")}<span><strong>No work is scheduled.</strong> Approval is a decision in this demo only. In a real service, you would confirm the scope, price and time before a vendor is contacted.</span></div>
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="ask-quote">Ask for another quote</button><button class="button button-primary" type="button" data-action="approve-estimate">${approved ? "Approved in this demo" : "Approve in this demo · $486"}</button></div></div>`);
}

function showRequestForm(prefill = "") {
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">A REAL PERSON WILL FOLLOW UP</p><h2 class="dialog-title" id="dialog-title">What’s going on at home?</h2><p class="dialog-copy">Share the first thing that comes to mind. Your home manager will help figure out what to do next.</p>
    <form id="request-form" class="form-grid"><div class="form-field"><label for="request-title">What needs attention?</label><input id="request-title" name="title" required maxlength="90" placeholder="e.g. The guest bath faucet is dripping" value="${esc(prefill)}"></div><div class="form-field"><label for="request-category">What is it about?</label><select id="request-category" name="category"><option>Home repair</option><option>HVAC</option><option>Plumbing</option><option>Roofing</option><option>Pool</option><option>Pest</option><option>Landscaping</option><option>Something else</option></select></div><div class="form-field"><label for="request-note">A little more context <span style="font-weight:400;color:#9ba398;">(optional)</span></label><textarea id="request-note" name="note" maxlength="420" placeholder="When did you notice it? Anything that would help us understand?"></textarea><p class="field-help">Please don’t include passwords, door codes or sensitive personal information.</p></div><p class="form-error" id="request-error" hidden></p><div class="form-actions"><span>Sending a request does not authorize work or spending.</span><button class="button button-primary" type="submit">Send to Jordan ${icon("arrow")}</button></div></form></div>`);
  document.querySelector("#request-title").focus();
}

function showRecordForm() {
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">DEMO HOUSEHOLD RECORD</p><h2 class="dialog-title" id="dialog-title">Add a record detail</h2><p class="dialog-copy">This prototype saves a record label and a short description in your browser. It doesn’t upload or store the document itself.</p><form id="record-form" class="form-grid"><div class="form-field"><label for="record-title">Record name</label><input id="record-title" name="title" required maxlength="80" placeholder="e.g. Water heater service receipt"></div><div class="form-field"><label for="record-type">Type</label><select id="record-type" name="type"><option>Warranty</option><option>Receipt</option><option>Insurance</option><option>Equipment</option><option>Home improvement</option><option>Other</option></select></div><div class="form-field"><label for="record-note">Related detail <span style="font-weight:400;color:#9ba398;">(optional)</span></label><input id="record-note" name="detail" maxlength="100" placeholder="e.g. Rheem water heater · added today"></div><div class="form-actions"><span>Sample metadata only—no file is uploaded.</span><button class="button button-primary" type="submit">Add record ${icon("arrow")}</button></div></form></div>`);
  document.querySelector("#record-title").focus();
}

function showBillForm() {
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">LOCAL DEMO LEDGER</p><h2 class="dialog-title" id="dialog-title">Add a recurring bill</h2><p class="dialog-copy">Enter sample details only. This form does not connect to a provider or store account numbers or payment information.</p><form id="bill-form" class="form-grid"><div class="form-field"><label for="bill-provider">Biller or service</label><input id="bill-provider" name="provider" maxlength="65" required placeholder="e.g. Tampa Electric"></div><div class="form-field"><label for="bill-category">Category</label><select id="bill-category" name="category"><option>Electric</option><option>Water</option><option>Internet</option><option>Insurance</option><option>Home services</option><option>Other</option></select></div><div class="form-field"><label for="bill-amount">Amount (USD)</label><input id="bill-amount" name="amount" type="number" min="0.01" max="100000" step="0.01" required placeholder="e.g. 89.99"></div><div class="form-field"><label for="bill-date">Next due date</label><input id="bill-date" name="dueDate" type="date" required><p class="field-help">The due date is a local reminder in this demo.</p></div><div class="form-actions"><span>Manual sample entry · no payment or account link</span><button class="button button-primary" type="submit">Save demo bill ${icon("arrow")}</button></div></form></div>`);
  document.querySelector("#bill-provider").focus();
}

function showMorePages() {
  const links = [
    ["home", "Home profile", "home"],
    ["requests", "Requests", "clipboard"],
    ["records", "Home records", "folder"],
    ["smart", "Smart home", "camera"],
    ["membership", "Proposed membership", "spark"],
  ];
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">SOLOHOME AI</p><h2 class="dialog-title" id="dialog-title">More household tools</h2><p class="dialog-copy">Choose a section to explore.</p><div class="more-pages-list">${links.map(([page, label, symbol]) => `<button class="more-page-link" type="button" data-page="${page}">${icon(symbol)}<span>${label}</span>${icon("chevron")}</button>`).join("")}<button class="more-page-link" type="button" data-action="show-beta-feedback">${icon("message")}<span>Share beta feedback</span>${icon("chevron")}</button></div></div>`);
}

function showBetaFeedback() {
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">SOLOHOME AI · BETA MODEL</p><h2 class="dialog-title" id="dialog-title">Help shape what comes next.</h2><p class="dialog-copy">Tell us how this preview worked for you. Your feedback is saved only in this browser; it is not sent to the SOLOhome team.</p><form id="beta-feedback-form" class="form-grid"><div class="form-field"><label for="feedback-rating">How was your experience?</label><select id="feedback-rating" name="rating" required><option value="">Choose a rating</option><option value="5">5 · Excellent</option><option value="4">4 · Good</option><option value="3">3 · Okay</option><option value="2">2 · Difficult</option><option value="1">1 · Could not use it</option></select></div><div class="form-field"><label for="feedback-topic">What would you like to comment on?</label><select id="feedback-topic" name="topic" required><option value="Overall experience">Overall experience</option><option value="Home care">Home care</option><option value="Service finder">Service finder</option><option value="Bills and records">Bills and records</option><option value="Privacy and trust">Privacy and trust</option><option value="Mobile experience">Mobile experience</option><option value="Something else">Something else</option></select></div><div class="form-field"><label for="feedback-message">What worked, or what should we improve?</label><textarea id="feedback-message" name="message" required minlength="5" maxlength="1000" placeholder="Please share a specific moment or suggestion. Do not include sensitive personal information."></textarea><p class="field-help">No name, email, address or account details are requested. To share your response, download the report after saving and send it yourself.</p></div><div class="form-actions"><span>${state.betaFeedback.length} response${state.betaFeedback.length === 1 ? "" : "s"} saved in this browser</span><button class="button button-primary" type="submit">Save feedback ${icon("arrow")}</button></div></form></div>`);
  document.querySelector("#feedback-rating").focus();
}

function showFeedbackSaved() {
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">SAVED ON THIS DEVICE</p><h2 class="dialog-title" id="dialog-title">Thank you for testing.</h2><p class="dialog-copy">Your response is stored in this browser only. Download the feedback report if you want to share it with the SOLOhome team.</p><div class="dialog-highlight">${icon("lock")}<span>Nothing was uploaded or sent. The report contains only your rating, topic, message and submission time.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button><button class="button button-primary" type="button" data-action="download-feedback">Download feedback report</button></div></div>`);
}

function downloadFeedback() {
  if (!state.betaFeedback.length) {
    notify("There is no beta feedback to download yet.");
    return;
  }
  const report = {
    product: "SOLOhome AI beta model",
    exportedAt: new Date().toISOString(),
    sharing: "This file was downloaded by the tester. It was not sent automatically.",
    responses: state.betaFeedback,
  };
  const file = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `solohome-beta-feedback-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  notify("Feedback report downloaded. It was not sent automatically.");
}

function showCarrierConfirm(provider, disconnect = false) {
  if (!["Tampa Electric (TECO)", "City of Tampa Water", "Spectrum"].includes(provider)) return;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">OPTIONAL BILLER LINK · DEMO ONLY</p><h2 class="dialog-title" id="dialog-title">${disconnect ? "Remove the demo link?" : "Explore a sample link?"}</h2><p class="dialog-copy">${esc(provider)}</p><div class="dialog-highlight">${icon("lock")}<span><strong>No sign-in or credentials are requested.</strong> ${disconnect ? "This only removes the sample connected label from your local browser." : "Confirming adds a sample linked status to this browser only. It does not open an authorization window, access an account, import bills or share data."}</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Cancel</button><button class="button button-primary" type="button" data-action="${disconnect ? "confirm-unlink-carrier" : "confirm-link-carrier"}" data-provider="${esc(provider)}">${disconnect ? "Remove demo link" : "Confirm sample link"}</button></div></div>`);
}

function showCameraConfirm(camera) {
  if (!camera) return;
  const paused = state.pausedCameras.includes(camera.id);
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">CAMERA CONTROL · SIMULATED</p><h2 class="dialog-title" id="dialog-title">${paused ? "Resume this demo camera?" : "Pause this demo camera?"}</h2><p class="dialog-copy">${esc(camera.name)} · ${esc(camera.location)}</p><div class="dialog-highlight">${icon("lock")}<span>This action changes only the sample status in this browser. No real camera is connected, viewed, paused or resumed.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Cancel</button><button class="button button-primary" type="button" data-action="confirm-camera-toggle" data-id="${esc(camera.id)}">${paused ? "Resume demo camera" : "Confirm demo pause"}</button></div></div>`);
}

function showDeviceConfirm(device) {
  if (!device) return;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">DEVICE CONTROL · SIMULATED</p><h2 class="dialog-title" id="dialog-title">${device.on ? "Turn this demo device off?" : "Turn this demo device on?"}</h2><p class="dialog-copy">${esc(device.name)} · ${esc(device.room)}</p><div class="dialog-highlight">${icon("power")}<span>This confirmation only changes the illustrative state shown in the prototype. No device is connected and no physical action will occur.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Cancel</button><button class="button button-primary" type="button" data-action="confirm-device-toggle" data-id="${esc(device.id)}">Confirm demo change</button></div></div>`);
}

function showProviderCallConfirm(provider) {
  if (!provider) return;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">CALL ARRANGEMENT REQUEST · DEMO ONLY</p><h2 class="dialog-title" id="dialog-title">Ask a person to arrange the call?</h2><p class="dialog-copy">${esc(provider.name)} · ${esc(provider.scope)}</p><div class="dialog-highlight">${icon("message")}<span><strong>No call will be placed and no vendor will be contacted.</strong> Confirming adds a local request for a SOLOhome AI home manager to review. In a real service, you would approve details and timing before anyone called or booked work.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Cancel</button><button class="button button-primary" type="button" data-action="confirm-provider-call" data-id="${esc(provider.id)}">Add demo request ${icon("arrow")}</button></div></div>`);
}

function showCameraPreview(camera) {
  if (!camera) return;
  const paused = state.pausedCameras.includes(camera.id);
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">SAMPLE CAMERA PREVIEW · NOT LIVE</p><h2 class="dialog-title" id="dialog-title">${esc(camera.name)}</h2><p class="dialog-copy">${esc(camera.location)}</p><div class="camera-preview camera-modal-scene"><span class="camera-preview-stamp">${paused ? "PAUSED IN DEMO" : "SAMPLE PREVIEW"}</span><span class="camera-horizon"></span><span class="camera-house-shape"></span><span class="camera-caption">ILLUSTRATIVE · NO VIDEO OR RECORDING</span></div><div class="dialog-highlight">${icon("lock")}<span>Stylized artwork only. There is no live feed, recording, camera connection or image of a real home.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button><button class="button button-primary" type="button" data-action="toggle-camera" data-id="${esc(camera.id)}">${paused ? "Resume demo" : "Pause demo"}</button></div></div>`);
}

function showManagerDialog() {
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">YOUR HUMAN POINT OF CONTACT</p><h2 class="dialog-title" id="dialog-title">A note for Jordan</h2><p class="dialog-copy">Jordan Lee is a fictional home-manager profile for this prototype. In a live service, a real person would follow up with you.</p><div class="dialog-highlight">${icon("message")}<span>For this demo, use <strong>Tell us what’s up</strong> to add an item to the sample request queue. No message will be sent to a real person.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button><button class="button button-primary" type="button" data-action="add-request">Create a demo request ${icon("arrow")}</button></div></div>`);
}

function showStormDialog() {
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">TAMPA BAY · HOME NOTE</p><h2 class="dialog-title" id="dialog-title">A quick storm-readiness check</h2><p class="dialog-copy">A simple prompt to help make sure this fictional household’s records and plans are easy to find before a storm watch.</p><div class="quote-breakdown"><div class="quote-row"><span>Roof inspection on file</span><strong>Nov 2025</strong></div><div class="quote-row"><span>Storm shutter plan</span><strong>Not recorded</strong></div><div class="quote-row"><span>Generator or backup power</span><strong>Not recorded</strong></div><div class="quote-row"><span>Suggested next step</span><strong>Ask Jordan to review</strong></div></div><div class="dialog-highlight">${icon("shield")}<span>This is an illustrative checklist, not emergency guidance or a claim that the home has been inspected. For urgent conditions, contact local emergency services and qualified professionals.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button><button class="button button-primary" type="button" data-action="storm-request">Ask Jordan about this ${icon("arrow")}</button></div></div>`);
}

function showTaskDetail(task) {
  if (!task) return;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">HOME CARE · ${esc(task.category.toUpperCase())}</p><h2 class="dialog-title" id="dialog-title">${esc(task.title)}</h2><p class="dialog-copy">${esc(task.date)} · ${esc(task.detail)}</p><div class="dialog-highlight">${icon("calendar")}<span><strong>Status:</strong> ${esc(task.status)}. ${esc(task.note)} This item is an illustrative sample for the demo household.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button>${task.id === "hvac" && !state.estimateApproved ? `<button class="button button-primary" type="button" data-action="review-estimate">Review estimate ${icon("arrow")}</button>` : ""}</div></div>`);
}

function showAssetDetail(asset) {
  if (!asset) return;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">HOUSEHOLD PROFILE · ${esc(asset.location.toUpperCase())}</p><h2 class="dialog-title" id="dialog-title">${esc(asset.name)}</h2><p class="dialog-copy">${esc(asset.make)} · ${esc(asset.location)}</p><div class="quote-breakdown"><div class="quote-row"><span>Installation</span><strong>${esc(asset.installed)}</strong></div><div class="quote-row"><span>Last service</span><strong>${esc(asset.service.replace("Last serviced ", "").replace("Last inspected ", "").replace("Last checked ", ""))}</strong></div><div class="quote-row"><span>Warranty</span><strong>${esc(asset.warranty)}</strong></div><div class="quote-row"><span>Next consideration</span><strong>${esc(asset.next)}</strong></div></div><div class="dialog-highlight">${icon("spark")}<span>AI can use a system’s age and service history to suggest next steps. A human reviews the context; you decide whether to take action.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button><button class="button button-primary" type="button" data-action="request-asset-help" data-id="${esc(asset.id)}">Ask about this system ${icon("arrow")}</button></div></div>`);
}

function showRequestDetail(request) {
  if (!request) return;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">HOUSEHOLD REQUEST · ${esc(request.category.toUpperCase())}</p><h2 class="dialog-title" id="dialog-title">${esc(request.title)}</h2><p class="dialog-copy">${esc(request.date)} · ${esc(request.status)} · Illustrative sample activity</p><div class="detail-value">${esc(request.note)}</div><div class="dialog-highlight">${icon("message")}<span>Home manager <strong>${esc(request.manager || "Jordan Lee")}</strong> is the human point of contact in this example. No real follow-up is happening in the prototype.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button>${request.status !== "Resolved" ? `<button class="button button-primary" type="button" data-action="resolve-request" data-id="${esc(request.id)}">Mark resolved in demo ${icon("check")}</button>` : ""}</div></div>`);
}

function showRecordDetail(record) {
  if (!record) return;
  showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">HOME RECORD · ${esc(record.type.toUpperCase())}</p><h2 class="dialog-title" id="dialog-title">${esc(record.name)}</h2><p class="dialog-copy">${esc(record.detail)}</p><div class="detail-value">${esc(record.info || `${record.related || "Household"} · Illustrative record detail. No actual document is stored in this prototype.`)}</div><div class="dialog-highlight">${icon("shield")}<span><strong>Sample metadata only.</strong> No actual document is stored in this prototype.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button><button class="button button-primary" type="button" data-action="ask-record">Ask Jordan about this record ${icon("arrow")}</button></div></div>`);
}

function switchPage(page) {
  if (!pageRenderers[page]) return;
  closeDialog();
  state.page = page;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getFormValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    event.preventDefault();
    switchPage(pageButton.dataset.page);
    return;
  }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "review-estimate") showEstimateDialog();
  if (action === "add-request") showRequestForm();
  if (action === "add-record") showRecordForm();
  if (action === "add-bill") showBillForm();
  if (action === "more-pages") showMorePages();
  if (action === "contact-manager") showManagerDialog();
  if (action === "show-beta-feedback") showBetaFeedback();
  if (action === "download-feedback") downloadFeedback();
  if (action === "close-dialog") closeDialog();
  if (action === "hide-demo-guide" || action === "show-demo-guide") {
    state.quickStartDismissed = action === "hide-demo-guide";
    saveState();
    render();
  }
  if (action === "view-care") switchPage("care");
  if (action === "view-task") showTaskDetail(state.tasks.find((task) => task.id === button.dataset.id));
  if (action === "asset-detail") showAssetDetail(state.assets.find((asset) => asset.id === button.dataset.id));
  if (action === "request-detail") showRequestDetail(state.requests.find((request) => request.id === button.dataset.id));
  if (action === "record-detail") showRecordDetail([...state.records, ...state.customRecords].find((record) => record.id === button.dataset.id));
  if (action === "toggle-bill-reminders") { state.billRemindersEnabled = !state.billRemindersEnabled; saveState(); render(); notify(state.billRemindersEnabled ? "In-app demo reminders are on. No notification was sent." : "In-app demo reminders are off."); }
  if (action === "mark-bill-paid") {
    const bill = state.bills.find((item) => item.id === button.dataset.id);
    if (bill && bill.status !== "Paid in demo") { bill.status = "Paid in demo"; saveState(); render(); notify("Marked paid in this browser only. No payment was made."); }
  }
  if (action === "link-carrier") showCarrierConfirm(button.dataset.provider);
  if (action === "unlink-carrier") showCarrierConfirm(button.dataset.provider, true);
  if (action === "confirm-link-carrier" || action === "confirm-unlink-carrier") {
    const provider = button.dataset.provider;
    if (!["Tampa Electric (TECO)", "City of Tampa Water", "Spectrum"].includes(provider)) return;
    if (action === "confirm-link-carrier" && !state.linkedCarriers.includes(provider)) state.linkedCarriers.push(provider);
    if (action === "confirm-unlink-carrier") state.linkedCarriers = state.linkedCarriers.filter((item) => item !== provider);
    saveState(); closeDialog(); render();
    notify(action === "confirm-link-carrier" ? "Sample link enabled in this browser only. No account was accessed." : "Sample link removed. No provider account was changed.");
  }
  if (action === "view-camera") showCameraPreview(state.cameras.find((camera) => camera.id === button.dataset.id));
  if (action === "toggle-camera") showCameraConfirm(state.cameras.find((camera) => camera.id === button.dataset.id));
  if (action === "confirm-camera-toggle") {
    const camera = state.cameras.find((item) => item.id === button.dataset.id);
    if (camera) {
      const paused = state.pausedCameras.includes(camera.id);
      state.pausedCameras = paused ? state.pausedCameras.filter((id) => id !== camera.id) : [...state.pausedCameras, camera.id];
      saveState(); closeDialog(); render();
      notify(`Camera ${paused ? "resumed" : "paused"} in the demo only. No real device was changed.`);
    }
  }
  if (action === "toggle-device") {
    const device = state.devices.find((item) => item.id === button.dataset.id);
    if (device?.kind === "light") {
      device.on = !device.on; saveState(); render();
      notify(`${device.name} turned ${device.on ? "on" : "off"} in the demo only.`);
    } else showDeviceConfirm(device);
  }
  if (action === "confirm-device-toggle") {
    const device = state.devices.find((item) => item.id === button.dataset.id);
    if (device) { device.on = !device.on; saveState(); closeDialog(); render(); notify(`${device.name} changed in the demo only. No appliance was controlled.`); }
  }
  if (action === "select-provider") { state.assistantSelectedId = button.dataset.id; saveState(); render(); }
  if (action === "request-provider-call") {
    const provider = (sampleProviders[state.assistantCategory] || []).find((item) => item.id === state.assistantSelectedId);
    showProviderCallConfirm(provider);
  }
  if (action === "confirm-provider-call") {
    const provider = (sampleProviders[state.assistantCategory] || []).find((item) => item.id === button.dataset.id);
    if (!provider || provider.id !== state.assistantSelectedId) return;
    const category = { hvac: "HVAC", plumbing: "Plumbing", roofing: "Roofing", pest: "Pest", pool: "Pool", landscaping: "Landscaping" }[state.assistantCategory];
    state.requests.unshift({
      id: `req-${Date.now()}`,
      title: `Arrange a call about ${state.assistantQuery || provider.scope.toLowerCase()}`,
      category,
      status: "Awaiting human review",
      note: `Requested a call arrangement with ${provider.name} about ${provider.scope}. This local demo entry does not contact the business, place a call or schedule work.`,
      date: "Just now · Demo",
      manager: "Jordan Lee",
    });
    state.requestFilter = "all";
    saveState(); closeDialog(); switchPage("requests");
    notify("Request added for human review. No vendor was contacted and no call was placed.");
  }
  if (action === "filter-care") { state.taskFilter = button.dataset.filter; saveState(); render(); }
  if (action === "filter-requests") { state.requestFilter = button.dataset.filter; saveState(); render(); }
  if (action === "approve-estimate") {
    if (state.estimateApproved) { notify("This estimate is already approved in the demo. No vendor was contacted."); return; }
    state.estimateApproved = true;
    saveState();
    closeDialog();
    render();
    if (storageWarning) notify("Saved demo data could not be read. A fresh sample household is open for this visit.");

    if ("serviceWorker" in navigator && ["http:", "https:"].includes(window.location.protocol)) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js").catch((error) => {
          console.error("Could not enable offline support for the SOLOhome AI beta model.", error);
        });
      }, { once: true });
    }
    notify("Approval saved in the demo. No vendor was contacted or scheduled.");
  }
  if (action === "ask-quote") {
    closeDialog();
    state.requests.unshift({ id: `req-${Date.now()}`, title: "Get another HVAC estimate", category: "HVAC", status: "New request", note: "You asked for another quote before deciding. No vendor was contacted in this demo.", date: "Just now · Demo", manager: "Jordan Lee" });
    saveState();
    if (state.page !== "requests") switchPage("requests"); else render();
    notify("Added a second-quote request to the demo queue. Nothing was sent.");
  }
  if (action === "mark-complete") {
    const task = state.tasks.find((item) => item.id === button.dataset.id);
    if (task) { task.status = "Complete"; task.note = "Marked complete in this demo. No service visit took place."; saveState(); render(); notify("Marked complete in the demo. No work was performed."); }
  }
  if (action === "resolve-request") {
    const request = state.requests.find((item) => item.id === button.dataset.id);
    if (request) { request.status = "Resolved"; request.note = "Marked resolved in this demo. No work was performed."; saveState(); closeDialog(); render(); notify("Request marked resolved in the demo."); }
  }
  if (action === "storm-check") showStormDialog();
  if (action === "storm-request") { closeDialog(); showRequestForm("Check the storm-readiness details for our home"); }
  if (action === "request-asset-help") {
    const asset = state.assets.find((item) => item.id === button.dataset.id);
    closeDialog();
    showRequestForm(asset ? `Question about ${asset.name}` : "");
  }
  if (action === "ask-record") { closeDialog(); showRequestForm("Question about a home record"); }
  if (action === "plan-interest") {
    showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">PROPOSED PLAN · ${esc(button.dataset.plan.toUpperCase())}</p><h2 class="dialog-title" id="dialog-title">Start with a conversation.</h2><p class="dialog-copy">The ${esc(button.dataset.plan)} tier and pricing are working assumptions for this prototype—not an active offer or a validated price.</p><div class="dialog-highlight">${icon("message")}<span>Explore how a human home manager, a home profile and proactive coordination could fit together. This demo cannot enroll members or take payments.</span></div><div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Close</button><button class="button button-primary" type="button" data-action="membership-question">Ask about the service ${icon("arrow")}</button></div></div>`);
  }
  if (action === "membership-question") { closeDialog(); showRequestForm("I'd like to learn more about SOLOhome AI"); }
  if (action === "how-it-works") {
    showDialog(`<div class="dialog-body"><p class="dialog-eyebrow">THE SERVICE MODEL</p><h2 class="dialog-title" id="dialog-title">Software that helps a person help you.</h2><p class="dialog-copy">SOLOhome AI is a proposed Tampa Bay household-operations service, delivered with software and people—not an autonomous vendor marketplace.</p><div class="quote-breakdown"><div class="quote-row"><span>AI notices</span><strong>Records · timing · context</strong></div><div class="quote-row"><span>A home manager reviews</span><strong>Scope · vendor · next step</strong></div><div class="quote-row"><span>You stay in control</span><strong>Approvals · access · spending</strong></div></div><div class="dialog-highlight">${icon("shield")}<span>Manual-first pilot, human delivery and customer approval are part of the proposed operating model. This prototype illustrates a concept, not a live service.</span></div><div class="dialog-actions"><button class="button button-primary" type="button" data-action="close-dialog">Got it</button></div></div>`);
  }
  if (action === "household-switch") notify("This prototype includes one illustrative household.");
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (form.id === "beta-feedback-form") {
    event.preventDefault();
    const values = new FormData(form);
    const rating = Number(getFormValue(values, "rating"));
    const topic = getFormValue(values, "topic");
    const message = getFormValue(values, "message");
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !topic || message.length < 5) {
      notify("Choose a rating and topic, then enter at least five characters of feedback.");
      return;
    }
    state.betaFeedback.unshift({
      id: `feedback-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      rating,
      topic,
      message: message.slice(0, 1000),
    });
    saveState();
    showFeedbackSaved();
  }
  if (form.id === "assistant-form") {
    event.preventDefault();
    const values = new FormData(form);
    const category = getFormValue(values, "category");
    const query = getFormValue(values, "query");
    if (!sampleProviders[category] || !query) { notify("Choose a service and describe the job to see sample options."); return; }
    state.assistantCategory = category;
    state.assistantQuery = query.slice(0, 90);
    state.assistantSearched = true;
    state.assistantSelectedId = "";
    saveState();
    render();
  }
  if (form.id === "bill-form") {
    event.preventDefault();
    const values = new FormData(form);
    const provider = getFormValue(values, "provider");
    const amount = Number(getFormValue(values, "amount"));
    const dueDate = getFormValue(values, "dueDate");
    const parsedDate = new Date(`${dueDate}T12:00:00`);
    if (!provider || !Number.isFinite(amount) || amount <= 0 || !dueDate || Number.isNaN(parsedDate.getTime())) {
      notify("Enter a biller, a positive amount and a valid due date.");
      return;
    }
    state.bills.unshift({
      id: `bill-${Date.now()}`,
      provider: provider.slice(0, 65),
      category: getFormValue(values, "category") || "Other",
      amount,
      dueDate,
      status: "Upcoming",
      cadence: "Monthly",
    });
    saveState();
    closeDialog();
    render();
    notify("Sample bill saved in this browser. No account or payment was connected.");
  }
  if (form.id === "request-form") {
    event.preventDefault();
    const values = new FormData(form);
    const title = getFormValue(values, "title");
    if (!title) return;
    state.requests.unshift({
      id: `req-${Date.now()}`,
      title,
      category: getFormValue(values, "category") || "Home repair",
      status: "New request",
      note: getFormValue(values, "note") || "Added by the household in this demo.",
      date: "Just now · Demo",
      manager: "Jordan Lee",
    });
    state.requestFilter = "all";
    saveState();
    closeDialog();
    switchPage("requests");
    notify("Request added to the demo queue. No message was sent to a real person.");
  }
  if (form.id === "record-form") {
    event.preventDefault();
    const values = new FormData(form);
    const title = getFormValue(values, "title");
    if (!title) return;
    state.customRecords.unshift({
      id: `custom-record-${Date.now()}`,
      name: title,
      type: getFormValue(values, "type") || "Other",
      detail: getFormValue(values, "detail") || "Added just now · Demo entry",
      related: "Household",
      info: "User-created illustrative record detail. This prototype stores the label and text metadata only; it does not upload or store documents.",
    });
    saveState();
    closeDialog();
    render();
    notify("Record details added in the demo. No file was uploaded.");
  }
});

render();
