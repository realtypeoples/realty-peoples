/* Real signup & login via Supabase (used on login.html). Uses globals curTab/curRole from main.js. */
async function authSubmit(e){
  e.preventDefault();
  const email = document.getElementById('liUser').value.trim();
  const pass  = document.getElementById('liPass').value;
  const msg   = document.getElementById('authMsg');
  msg.style.color = '#b00020';
  msg.textContent = '';

  if(!email || !pass){ msg.textContent='Please enter your email and password.'; return; }

  if(typeof curTab!=='undefined' && curTab==='signup'){
    const { data, error } = await sb.auth.signUp({ email:email, password:pass });
    if(error){ msg.textContent=error.message; return; }
    const uid = data.user && data.user.id;
    const role = (typeof curRole!=='undefined') ? curRole : 'homeowner';
    let categories = null;
    if(role==='pro'){
      const sel=document.getElementById('proCatSel');
      categories = sel ? [sel.value] : null;
    }
    if(uid){
      const { error: pErr } = await sb.from('profiles').upsert({ id:uid, role:role, categories:categories });
      if(pErr){ msg.textContent='Account made, but profile save failed: '+pErr.message; return; }
    }
    if(data.session){ window.location.href='cafe.html'; }
    else { msg.style.color='#2e7d32'; msg.textContent='Account created! You can now sign in.'; }
    return;
  }

  const { error } = await sb.auth.signInWithPassword({ email:email, password:pass });
  if(error){ msg.textContent=error.message; return; }
  window.location.href='cafe.html';
}
