/* ===========================================================================
   main.js — injects the shared header + footer, wires navigation, language,
   forms, FAQ accordion, login, and the Online Cafe. Loaded on every page.
   Requires data.js and i18n.js to be loaded first.
   =========================================================================== */

/* ---------- shared HEADER (edit nav here, applies to all pages) ---------- */
function headerHTML(){
  return `
  <div class="wrap nav">
    <a href="index.html" class="logo">Realty Peoples</a>
    <button class="hamburger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    <nav class="nav-links" id="navlinks">
      <a class="navlink" href="residential.html" data-page="residential" data-i18n="nav_res">Residential</a>
      <a class="navlink" href="commercial.html" data-page="commercial" data-i18n="nav_com">Commercial</a>
      <a class="navlink" href="business.html" data-page="business" data-i18n="nav_biz">Business</a>
      <a class="navlink" href="cafe.html" data-page="cafe" data-i18n="nav_cafe">Online Cafe</a>
      <a class="navlink" href="about.html" data-page="about" data-i18n="nav_about">About</a>
      <a class="navlink" href="contact.html" data-page="contact" data-i18n="nav_contact">Contact</a>
      <div class="lang">
        <button class="lang-btn" id="langBtn">🌐 <span id="langCur">EN</span> ▾</button>
        <div class="lang-menu" id="langMenu">
          <button data-lang="en">EN — English</button>
          <button data-lang="ko">KR — 한국어</button>
          <button data-lang="zh">CH — 中文</button>
          <button data-lang="ja">JPN — 日本語</button>
          <button data-lang="es">SPN — Español</button>
        </div>
      </div>
    </nav>
  </div>`;
}

/* ---------- shared FOOTER ---------- */
function footerHTML(){
  return `
  <div class="wrap">
    <div class="f-grid">
      <div>
        <div class="logo-slot">LOGO SLOT</div>
        <div class="f-logo">Realty Peoples</div>
        <p>DRE# 02181947 | NMLS# 2342350</p>
        <p style="margin-top:12px">100 W. Valencia Mesa Dr. Suite #205<br>Fullerton, CA 92835</p>
        <p style="margin-top:12px"><a href="tel:7147700777">714.770.0777</a><br><a href="mailto:info@realtypeoples.com">info@realtypeoples.com</a></p>
      </div>
      <div>
        <h4 data-i18n="f_explore">Explore</h4>
        <p style="line-height:2.2">
          <a href="residential.html" data-i18n="nav_res">Residential</a><br>
          <a href="commercial.html" data-i18n="nav_com">Commercial</a><br>
          <a href="cafe.html" data-i18n="nav_cafe">Online Cafe</a><br>
          <a href="about.html" data-i18n="nav_about">About</a><br>
          <a href="contact.html" data-i18n="f_contactform">Contact Form</a>
        </p>
      </div>
      <div>
        <h4 data-i18n="f_network">Our Network</h4>
        <div class="f-net">
          <div class="slot">Storehouse Lending</div>
          <div class="slot">LienBridge</div>
          <div class="slot" data-i18n="f_more">+ more (logo slots)</div>
        </div>
      </div>
    </div>
    <div class="f-bottom">
      <span>© <span id="yr"></span> Realty Peoples. All rights reserved.</span>
      <span>Equal Housing Opportunity</span>
    </div>
  </div>`;
}

/* ---------- language ---------- */
function applyLang(lang){
  const dict=I18N[lang]||I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n'); if(dict[k]) el.innerHTML=dict[k];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const k=el.getAttribute('data-i18n-ph'); if(dict[k]) el.placeholder=dict[k];
  });
  const codes={en:'EN',ko:'KR',zh:'CH',ja:'JPN',es:'SPN'};
  const cur=document.getElementById('langCur'); if(cur) cur.textContent=codes[lang]||'EN';
  document.documentElement.lang=lang;
  try{localStorage.setItem('rp_lang',lang);}catch(e){}
}

/* ---------- shared section renderers (only run if the holder exists) ---------- */
function renderTestimonials(){
  const el=document.getElementById('testiGrid'); if(!el) return;
  el.innerHTML=TESTIMONIALS.map(t=>`<div class="tcard"><div class="q">"${t.q}"</div><div class="who">${t.who}</div></div>`).join('');
}
function renderResListings(){
  const el=document.getElementById('resCarousel'); if(!el) return;
  el.innerHTML=RESIDENTIAL_LISTINGS.map(l=>`
    <div class="lcard"><div class="ph" style="background-image:url('${l.img}')"><span class="tag">${l.tag}</span></div>
    <div class="info"><div class="city">${l.city}</div><div class="desc">${l.desc}</div></div></div>`).join('');
}
function renderCommercial(){
  const el=document.getElementById('comGrid'); if(!el) return;
  let com='';
  for(let i=1;i<=10;i++){
    com+=`<div class="lcard" style="flex:none"><div class="ph" style="display:flex;align-items:center;justify-content:center;color:#b9b2a6;font-size:13px;letter-spacing:.1em">IMAGE SLOT ${i}</div>
    <div class="info"><div class="city">City, CA</div><div class="desc">Commercial space — add details &amp; image later.</div>
    <div class="meta"><span>— sqft</span><span>— /mo</span></div></div></div>`;
  }
  el.innerHTML=com;
}
function renderTeam(){
  const el=document.getElementById('teamGrid'); if(!el) return;
  el.innerHTML=TEAM.map(m=>`<div class="member"><div class="ph" ${m.img?`style="background-image:url('${m.img}')"`:'style="display:flex;align-items:center;justify-content:center;color:#b9b2a6;font-size:12px;letter-spacing:.12em"'}>${m.img?'':'PHOTO'}</div>
    <div class="m-body"><h3>${m.name}</h3><div class="lic">${m.lic}</div><p>${m.bio}</p></div></div>`).join('');
}
function renderFaqs(){
  const el=document.getElementById('faqList'); if(!el) return;
  el.innerHTML=FAQS.map(f=>`<div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">${f.q}<span class="pm">+</span></button><div class="faq-a"><p>${f.a}</p></div></div>`).join('');
}
function renderChannels(){
  const el=document.getElementById('chanList'); if(!el) return;
  el.innerHTML=CAFE_CHANNELS.map((c,i)=>`<button class="chan ${i===0?'active':''}" onclick="pickChan(${i},this)">${c.t}</button>`).join('');
}

/* ---------- behaviors ---------- */
function toggleFaq(btn){
  const a=btn.nextElementSibling, open=a.style.maxHeight&&a.style.maxHeight!=='0px';
  document.querySelectorAll('.faq-a').forEach(x=>{x.style.maxHeight='0px';});
  document.querySelectorAll('.faq-q .pm').forEach(x=>x.textContent='+');
  if(!open){a.style.maxHeight=a.scrollHeight+'px';btn.querySelector('.pm').textContent='–';}
}
/* Submits to Netlify Forms via AJAX, then shows the thank-you message.
   Works automatically once deployed to Netlify (no extra setup). */
function encodeForm(data){
  return Object.keys(data).map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k])).join('&');
}
function thanks(e,form){
  e.preventDefault();
  const data={};
  new FormData(form).forEach((v,k)=>{ data[k]=v; });
  if(form.getAttribute('name')) data['form-name']=form.getAttribute('name');
  const done=()=>{
    const ok=form.querySelector('.form-ok');
    if(ok){ok.style.display='block';} else {alert('Thank you — submitted!');}
    form.reset();
  };
  fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:encodeForm(data)})
    .then(done).catch(done);
}
function pickChan(i,btn){
  document.querySelectorAll('.chan').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('chanTitle').textContent=CAFE_CHANNELS[i].t;
  document.getElementById('chanDesc').textContent=CAFE_CHANNELS[i].d;
}

/* ---------- login + cafe (demo using localStorage) ---------- */
let curTab='signin', curRole='homeowner';
function setTab(t){
  curTab=t;
  document.getElementById('tabSignin').classList.toggle('active',t==='signin');
  document.getElementById('tabSignup').classList.toggle('active',t==='signup');
  document.getElementById('roleWrap').style.display=t==='signup'?'block':'none';
  const dict=I18N[currentLang()]||I18N.en;
  document.getElementById('loginBtn').textContent=dict[t==='signup'?'login_signup':'login_signin'];
}
function setRole(el){
  curRole=el.dataset.role;
  document.querySelectorAll('.role').forEach(r=>r.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('proCat').classList.toggle('show',curRole==='pro');
}
function doLogin(e){
  e.preventDefault();
  const user=(document.getElementById('liUser').value||'member').trim();
  try{localStorage.setItem('rp_user',user);localStorage.setItem('rp_role',curRole);}catch(e){}
  window.location.href='cafe.html';
}
function logout(){
  try{localStorage.removeItem('rp_user');}catch(e){}
  window.location.href='login.html';
}
function currentLang(){ try{return localStorage.getItem('rp_lang')||'en';}catch(e){return 'en';} }

/* ---------- init (runs on every page) ---------- */
document.addEventListener('DOMContentLoaded',function(){
  // inject header/footer
  const h=document.getElementById('site-header'); if(h) h.innerHTML=headerHTML();
  const f=document.getElementById('site-footer'); if(f) f.innerHTML=footerHTML();

  // active nav state by current file
  const file=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.navlink').forEach(a=>{
    if(a.getAttribute('href')===file) a.classList.add('active');
  });

  // year
  const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

  // mobile menu
  const burger=document.getElementById('burger'), navlinks=document.getElementById('navlinks');
  if(burger) burger.onclick=()=>navlinks.classList.toggle('open');

  // language menu
  const langBtn=document.getElementById('langBtn'), langMenu=document.getElementById('langMenu');
  if(langBtn) langBtn.onclick=(e)=>{e.stopPropagation();langMenu.classList.toggle('open');};
  document.querySelectorAll('#langMenu button').forEach(b=>{
    b.onclick=()=>{applyLang(b.dataset.lang);langMenu.classList.remove('open');};
  });
  document.addEventListener('click',e=>{ if(!e.target.closest('.lang')&&langMenu) langMenu.classList.remove('open'); });

  // header shadow on scroll
  const hdr=document.querySelector('header');
  window.addEventListener('scroll',()=>{ if(hdr) hdr.classList.toggle('scrolled',window.scrollY>10); });

  // render any sections present on this page
  renderTestimonials(); renderResListings(); renderCommercial(); renderTeam(); renderFaqs(); renderChannels();

  // cafe gate / app
  const gate=document.getElementById('cafeGate'), app=document.getElementById('cafeApp');
  if(gate&&app){
    let user=null; try{user=localStorage.getItem('rp_user');}catch(e){}
    if(user){ gate.style.display='none'; app.style.display='block'; const cu=document.getElementById('cafeUser'); if(cu) cu.textContent=user; }
    else { gate.style.display='block'; app.style.display='none'; }
  }

  // apply saved language last (so injected header/footer get translated too)
  applyLang(currentLang());
});
