/* ===========================================================================
   lounge.js — members-only request board (cafe.html)
   Homeowners post requests + edit/delete them + see quotes.
   Pros browse all requests, send quotes, and edit/delete their own quotes.
   Privacy + permissions are enforced by Supabase Row-Level Security.
   =========================================================================== */
const RP_CATS = ["Remodel / Renovation","Kitchen","Bathroom","ADU","Interior Design",
  "General Contractor","Plumbing","Electrical","Roofing","Landscaping",
  "Lending / Mortgage","Home Inspection","Other"];

const BTN = "background:none;border:1px solid var(--line);padding:6px 14px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;color:var(--ink)";
const BTN_DEL = "background:none;border:1px solid #d8b4b4;padding:6px 14px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;color:#b00020";

function catOptions(sel){
  return RP_CATS.map(c=>`<option ${c===sel?'selected':''}>${c}</option>`).join('');
}
function esc(s){ return (s==null?'':String(s)).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }

async function loungeLogout(){ try{ await sb.auth.signOut(); }catch(e){} window.location.href='login.html'; }

document.addEventListener('DOMContentLoaded', initLounge);

async function initLounge(){
  const root=document.getElementById('loungeRoot'); if(!root) return;
  const { data:{ session } } = await sb.auth.getSession();
  if(!session){
    root.innerHTML = `<div class="cafe-gate"><div class="label">Members Only</div>
      <h2 style="font-size:40px;margin:18px 0">Realty Peoples Lounge</h2>
      <p style="max-width:560px;margin:0 auto 28px;color:var(--muted)">Please log in or create an account to enter the Lounge.</p>
      <a class="btn btn-accent" href="login.html">Log In or Join</a></div>`;
    return;
  }
  window.RP_UID = session.user.id;
  let { data:prof } = await sb.from('profiles').select('*').eq('id',window.RP_UID).single();
  if(!prof){ await sb.from('profiles').upsert({id:window.RP_UID, role:'homeowner'}); prof={role:'homeowner'}; }
  window.RP_ROLE = prof.role;
  if(prof.role==='pro') renderPro(root); else renderHomeowner(root);
}

/* ======================= HOMEOWNER ======================= */
function renderHomeowner(root){
  root.innerHTML = `
  <div class="wrap" style="max-width:760px">
    <div class="center-head" style="margin-bottom:24px"><div class="label">Homeowner / Buyer</div><h2 style="font-size:clamp(30px,4vw,44px)">Post a Request</h2></div>
    <div class="form-card" style="margin-bottom:44px">
      <div class="field"><label>Category</label><select id="rqCat">${catOptions()}</select></div>
      <div class="field"><label>City</label><input id="rqCity" placeholder="e.g. Irvine, CA"></div>
      <div style="display:flex;gap:12px">
        <div class="field" style="flex:1"><label>Beds</label><input id="rqBeds" type="number" min="0"></div>
        <div class="field" style="flex:1"><label>Baths</label><input id="rqBaths" type="number" min="0" step="0.5"></div>
      </div>
      <div class="field"><label>What do you need?</label><textarea id="rqDesc" placeholder="Describe the project, timeline, budget range…"></textarea></div>
      <button class="btn btn-accent" onclick="postRequest()">Post Request</button>
      <p id="rqMsg" style="margin-top:10px;font-size:14px"></p>
    </div>
    <h3 style="font-family:var(--serif);font-size:26px;margin-bottom:16px">Your Requests &amp; Quotes</h3>
    <div id="myRequests" style="color:var(--muted)">Loading…</div>
    <p class="note" style="margin-top:28px;text-align:left">Logged in · <a href="#" onclick="loungeLogout();return false;" style="color:var(--accent)">Log out</a></p>
  </div>`;
  loadMyRequests();
}

async function postRequest(){
  const msg=document.getElementById('rqMsg'); msg.style.color='#b00020'; msg.textContent='';
  const rec={
    homeowner_id: window.RP_UID,
    category: document.getElementById('rqCat').value,
    city: document.getElementById('rqCity').value.trim(),
    beds: parseInt(document.getElementById('rqBeds').value)||null,
    baths: parseFloat(document.getElementById('rqBaths').value)||null,
    description: document.getElementById('rqDesc').value.trim()
  };
  if(!rec.description){ msg.textContent='Please describe what you need.'; return; }
  const { error } = await sb.from('requests').insert(rec);
  if(error){ msg.textContent=error.message; return; }
  msg.style.color='#2e7d32'; msg.textContent='Posted!';
  document.getElementById('rqDesc').value='';
  loadMyRequests();
}

let MY_REQUESTS=[];
async function loadMyRequests(){
  const box=document.getElementById('myRequests');
  const { data:reqs, error } = await sb.from('requests').select('*').eq('homeowner_id',window.RP_UID).order('created_at',{ascending:false});
  if(error){ box.textContent=error.message; return; }
  MY_REQUESTS=reqs||[];
  if(!MY_REQUESTS.length){ box.textContent='No requests yet — post one above.'; return; }
  let html='';
  for(const r of MY_REQUESTS){
    const { data:quotes } = await sb.from('quotes').select('*').eq('request_id',r.id).order('created_at',{ascending:false});
    const qHtml = (quotes&&quotes.length)
      ? quotes.map(q=>`<div style="border-top:1px solid var(--line);padding:12px 0">
          <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">Quote${q.price?` · $${esc(q.price)}`:''}</div>
          <div style="margin:4px 0">${esc(q.message)}</div>
          ${q.contact?`<div style="font-size:13px;color:var(--muted)">Contact: ${esc(q.contact)}</div>`:''}
        </div>`).join('')
      : `<div style="color:var(--muted);font-size:14px;border-top:1px solid var(--line);padding-top:12px">No quotes yet.</div>`;
    html+=`<div class="form-card" id="req_${r.id}" style="margin-bottom:18px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div>
          <div style="font-family:var(--serif);font-size:20px">${esc(r.category)} — ${esc(r.city||'')}</div>
          <div style="font-size:13px;color:var(--muted);margin:4px 0 10px">${r.beds?esc(r.beds)+' bed · ':''}${r.baths?esc(r.baths)+' bath':''}</div>
          <div>${esc(r.description)}</div>
        </div>
        <div style="flex:none;display:flex;gap:8px">
          <button onclick="editRequest('${r.id}')" style="${BTN}">Edit</button>
          <button onclick="deleteRequest('${r.id}')" style="${BTN_DEL}">Delete</button>
        </div>
      </div>
      <div style="margin-top:14px">${qHtml}</div>
    </div>`;
  }
  box.innerHTML=html;
}

async function deleteRequest(id){
  if(!confirm('Delete this request? Any quotes on it will be removed too.')) return;
  const { error } = await sb.from('requests').delete().eq('id',id);
  if(error){ alert(error.message); return; }
  loadMyRequests();
}

function editRequest(id){
  const r=MY_REQUESTS.find(x=>String(x.id)===String(id)); if(!r) return;
  const card=document.getElementById('req_'+id); if(!card) return;
  card.innerHTML=`
    <div class="field"><label>Category</label><select id="er_cat_${id}">${catOptions(r.category)}</select></div>
    <div class="field"><label>City</label><input id="er_city_${id}" value="${esc(r.city||'')}"></div>
    <div style="display:flex;gap:12px">
      <div class="field" style="flex:1"><label>Beds</label><input id="er_beds_${id}" type="number" value="${r.beds!=null?esc(r.beds):''}"></div>
      <div class="field" style="flex:1"><label>Baths</label><input id="er_baths_${id}" type="number" step="0.5" value="${r.baths!=null?esc(r.baths):''}"></div>
    </div>
    <div class="field"><label>What do you need?</label><textarea id="er_desc_${id}">${esc(r.description||'')}</textarea></div>
    <button class="btn btn-accent" onclick="saveRequest('${id}')">Save</button>
    <button class="btn btn-ghost" onclick="loadMyRequests()" style="margin-left:8px">Cancel</button>`;
}

async function saveRequest(id){
  const upd={
    category:document.getElementById('er_cat_'+id).value,
    city:document.getElementById('er_city_'+id).value.trim(),
    beds:parseInt(document.getElementById('er_beds_'+id).value)||null,
    baths:parseFloat(document.getElementById('er_baths_'+id).value)||null,
    description:document.getElementById('er_desc_'+id).value.trim()
  };
  if(!upd.description){ alert('Please describe what you need.'); return; }
  const { error } = await sb.from('requests').update(upd).eq('id',id);
  if(error){ alert(error.message); return; }
  loadMyRequests();
}

/* ======================= SERVICE PRO ======================= */
function renderPro(root){
  root.innerHTML = `
  <div class="wrap" style="max-width:900px">
    <div class="center-head" style="margin-bottom:24px"><div class="label">Service Pro</div><h2 style="font-size:clamp(30px,4vw,44px)">Open Requests</h2></div>
    <div class="form-card" style="margin-bottom:30px;display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end">
      <div class="field" style="flex:1;min-width:180px;margin:0"><label>Filter by category</label><select id="fltCat"><option value="">All categories</option>${catOptions()}</select></div>
      <div class="field" style="flex:1;min-width:180px;margin:0"><label>Filter by city</label><input id="fltCity" placeholder="Any city"></div>
      <button class="btn btn-accent" onclick="loadAllRequests()" style="height:48px">Apply</button>
    </div>
    <div id="allRequests" style="color:var(--muted)">Loading…</div>
    <p class="note" style="margin-top:28px;text-align:left">Logged in as Service Pro · <a href="#" onclick="loungeLogout();return false;" style="color:var(--accent)">Log out</a></p>
  </div>`;
  loadAllRequests();
}

let MY_QUOTES={};
async function loadAllRequests(){
  const box=document.getElementById('allRequests');
  let query = sb.from('requests').select('*').order('created_at',{ascending:false});
  const cat=document.getElementById('fltCat').value;
  const city=document.getElementById('fltCity').value.trim();
  if(cat) query=query.eq('category',cat);
  if(city) query=query.ilike('city','%'+city+'%');
  const { data:reqs, error } = await query;
  if(error){ box.textContent=error.message; return; }
  const { data:myq } = await sb.from('quotes').select('*').eq('pro_id',window.RP_UID);
  MY_QUOTES={}; (myq||[]).forEach(x=>{ MY_QUOTES[x.request_id]=x; });
  if(!reqs || !reqs.length){ box.textContent='No matching requests right now.'; return; }
  box.innerHTML = reqs.map(r=>{
    const mine=MY_QUOTES[r.id];
    const bottom = mine ? myQuoteBlock(r,mine) : quoteForm(r);
    return `<div class="form-card" style="margin-bottom:18px">
      <div style="font-family:var(--serif);font-size:20px">${esc(r.category)} — ${esc(r.city||'')}</div>
      <div style="font-size:13px;color:var(--muted);margin:4px 0 10px">${r.beds?esc(r.beds)+' bed · ':''}${r.baths?esc(r.baths)+' bath':''}</div>
      <div>${esc(r.description)}</div>
      <div style="margin-top:14px;border-top:1px solid var(--line);padding-top:14px">${bottom}</div>
    </div>`;
  }).join('');
}

function quoteForm(r){
  return `<div style="display:flex;gap:10px;flex-wrap:wrap">
      <input id="qp_${r.id}" type="number" placeholder="Price $" style="width:120px;padding:10px;border:1px solid var(--line)">
      <input id="qc_${r.id}" placeholder="Your contact (email/phone)" style="flex:1;min-width:160px;padding:10px;border:1px solid var(--line)">
    </div>
    <textarea id="qm_${r.id}" placeholder="Your quote / message" style="width:100%;margin-top:10px;min-height:80px;padding:10px;border:1px solid var(--line)"></textarea>
    <button class="btn btn-accent" style="margin-top:8px" onclick="sendQuote('${r.id}')">Send Quote</button>
    <span id="qmsg_${r.id}" style="margin-left:10px;font-size:14px"></span>`;
}

function myQuoteBlock(r,q){
  return `<div id="myq_${r.id}">
    <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">Your Quote${q.price?` · $${esc(q.price)}`:''}</div>
    <div style="margin:4px 0">${esc(q.message)}</div>
    ${q.contact?`<div style="font-size:13px;color:var(--muted)">Contact: ${esc(q.contact)}</div>`:''}
    <div style="margin-top:10px;display:flex;gap:8px">
      <button onclick="editQuote('${r.id}')" style="${BTN}">Edit</button>
      <button onclick="deleteQuote('${q.id}','${r.id}')" style="${BTN_DEL}">Delete</button>
    </div>
  </div>`;
}

async function sendQuote(reqId){
  const msg=document.getElementById('qmsg_'+reqId); msg.style.color='#b00020'; msg.textContent='';
  const rec={
    request_id: reqId,
    pro_id: window.RP_UID,
    message: document.getElementById('qm_'+reqId).value.trim(),
    price: parseFloat(document.getElementById('qp_'+reqId).value)||null,
    contact: document.getElementById('qc_'+reqId).value.trim()
  };
  if(!rec.message){ msg.textContent='Add a message.'; return; }
  const { error } = await sb.from('quotes').insert(rec);
  if(error){ msg.textContent=error.message; return; }
  loadAllRequests();
}

function editQuote(reqId){
  const q=MY_QUOTES[reqId]; if(!q) return;
  const box=document.getElementById('myq_'+reqId); if(!box) return;
  box.innerHTML=`<div style="display:flex;gap:10px;flex-wrap:wrap">
      <input id="eqp_${reqId}" type="number" value="${q.price!=null?esc(q.price):''}" placeholder="Price $" style="width:120px;padding:10px;border:1px solid var(--line)">
      <input id="eqc_${reqId}" value="${esc(q.contact||'')}" placeholder="Your contact" style="flex:1;min-width:160px;padding:10px;border:1px solid var(--line)">
    </div>
    <textarea id="eqm_${reqId}" style="width:100%;margin-top:10px;min-height:80px;padding:10px;border:1px solid var(--line)">${esc(q.message||'')}</textarea>
    <button class="btn btn-accent" style="margin-top:8px" onclick="saveQuote('${q.id}','${reqId}')">Save</button>
    <button class="btn btn-ghost" style="margin-top:8px;margin-left:8px" onclick="loadAllRequests()">Cancel</button>`;
}

async function saveQuote(id,reqId){
  const upd={
    price:parseFloat(document.getElementById('eqp_'+reqId).value)||null,
    contact:document.getElementById('eqc_'+reqId).value.trim(),
    message:document.getElementById('eqm_'+reqId).value.trim()
  };
  if(!upd.message){ alert('Add a message.'); return; }
  const { error } = await sb.from('quotes').update(upd).eq('id',id);
  if(error){ alert(error.message); return; }
  loadAllRequests();
}

async function deleteQuote(id,reqId){
  if(!confirm('Delete this quote?')) return;
  const { error } = await sb.from('quotes').delete().eq('id',id);
  if(error){ alert(error.message); return; }
  loadAllRequests();
}
