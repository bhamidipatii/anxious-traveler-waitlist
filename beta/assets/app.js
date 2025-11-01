
(() => {
  const DEMO_CITIES = [{"name":"New York","country":"United States","iata":"NYC","lat":40.7128,"lng":-74.006},{"name":"Los Angeles","country":"United States","iata":"LAX","lat":34.0522,"lng":-118.2437},{"name":"London","country":"United Kingdom","iata":"LON","lat":51.5072,"lng":-0.1276},{"name":"Paris","country":"France","iata":"PAR","lat":48.8566,"lng":2.3522},{"name":"Tokyo","country":"Japan","iata":"TYO","lat":35.6762,"lng":139.6503},{"name":"Hyderabad","country":"India","iata":"HYD","lat":17.385,"lng":78.4867},{"name":"Singapore","country":"Singapore","iata":"SIN","lat":1.3521,"lng":103.8198},{"name":"San Francisco","country":"United States","iata":"SFO","lat":37.7749,"lng":-122.4194},{"name":"Seattle","country":"United States","iata":"SEA","lat":47.6062,"lng":-122.3321},{"name":"Sydney","country":"Australia","iata":"SYD","lat":-33.8688,"lng":151.2093}];

  const qs = (sel, el=document) => el.querySelector(sel);
  const state = { cities: DEMO_CITIES, from: null, to: null, start: "", end: "" };

  // Load full cities.min.json if available
  fetch('./cities.min.json', { cache: 'force-cache' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(json => { if (Array.isArray(json) && json.length) state.cities = json; })
    .catch(()=>{});

  function prefixSuggest(all, q, limit=5) {
    if (!q || !q.trim()) return [];
    const s = q.trim().toLowerCase();
    return all
      .filter(c => c.name && c.name.toLowerCase().startsWith(s)) // STRICT prefix on city name
      .sort((a,b) => (b.iata?1:0)-(a.iata?1:0) || a.name.localeCompare(b.name))
      .slice(0, limit);
  }

  function fmtDateRange(s,e){
    if(!s||!e) return "";
    try {
      const sd = new Date(s).toLocaleDateString(undefined,{month:'short',day:'numeric'});
      const ed = new Date(e).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
      return sd+' → '+ed;
    } catch { return s+' → '+e; }
  }

  // Insights (stubbed deterministic)
  function computeInsights(from, to){
    const picks = ["Emirates","Qatar Airways","Singapore Airlines","Lufthansa","United","Delta","American","Air India","Qantas"];
    const hash = (from.name.length + to.name.length + (from.country||'').length + (to.country||'').length) % picks.length;
    const airlines = [picks[hash], picks[(hash+2)%picks.length], picks[(hash+4)%picks.length]];
    const south = (to.lat||0) < 0;
    const season = south ? "Best: May–Sep (dry/mild); Avoid: Jan–Mar (humid)"
                         : "Best: Sep–Nov & Mar–May; Avoid: Jul–Aug (heat/peak)";
    const interestScore = 60 + ((to.name.charCodeAt(0)+(to.name.charCodeAt(1)||0)) % 35);
    const personasAll = ["Adventure","Wellness","Leisure","Culinary","Culture"];
    const personas = [personasAll[(to.country||'x').length % 5], personasAll[((to.country||'x').length+2)%5]];
    return { airlines, season, interestScore, personas };
  }

  // DOM refs
  const fromInput = qs('#from');
  const toInput   = qs('#to');
  const startInput= qs('#start');
  const endInput  = qs('#end');
  const fromSug   = qs('#from-sug');
  const toSug     = qs('#to-sug');
  const button    = qs('#go');
  const resultCard= qs('#results');
  const statusEl  = qs('#status');

  function showSuggestions(container, list){
    container.innerHTML = '';
    if(!list.length){ container.style.display='none'; return; }
    list.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const left = document.createElement('span');
      left.textContent = c.name;
      const right = document.createElement('span');
      right.textContent = (c.country||'') + (c.iata? ' · '+c.iata : '');
      right.style.color = 'var(--muted)';
      btn.append(left,right);
      btn.addEventListener('mousedown', (e)=>{ e.preventDefault();
        if(container===fromSug){ fromInput.value = c.name; state.from = c; }
        else { toInput.value = c.name; state.to = c; }
        container.style.display='none';
      });
      container.appendChild(btn);
    });
    container.style.display = 'block';
  }

  function hideOutsideOnClick(el){
    document.addEventListener('mousedown', (e)=>{
      if(!el.contains(e.target)) el.style.display='none';
    });
  }
  hideOutsideOnClick(fromSug);
  hideOutsideOnClick(toSug);

  fromInput.addEventListener('input', () => {
    state.from = null;
    const list = prefixSuggest(state.cities, fromInput.value, 5);
    showSuggestions(fromSug, list);
  });
  fromInput.addEventListener('focus', () => {
    const list = prefixSuggest(state.cities, fromInput.value, 5);
    showSuggestions(fromSug, list);
  });

  toInput.addEventListener('input', () => {
    state.to = null;
    const list = prefixSuggest(state.cities, toInput.value, 5);
    showSuggestions(toSug, list);
  });
  toInput.addEventListener('focus', () => {
    const list = prefixSuggest(state.cities, toInput.value, 5);
    showSuggestions(toSug, list);
  });

  startInput.addEventListener('change', () => state.start = startInput.value);
  endInput.addEventListener('change', () => state.end = endInput.value);

  button.addEventListener('click', () => {
    if(!state.from || !state.to || !state.start || !state.end){
      alert('Please fill From, To, and both dates.');
      return;
    }
    const ins = computeInsights(state.from, state.to);
    renderResults(ins);
  });

  function renderResults(ins){
    qs('#sel-route').textContent = (state.from?.name||'–') + ' → ' + (state.to?.name||'–');
    qs('#sel-dates').textContent = fmtDateRange(state.start, state.end) || 'Pick dates';
    const listEl = qs('#airlines');
    listEl.innerHTML = '';
    ins.airlines.forEach(a => {
      const li = document.createElement('div');
      li.className = 'kv';
      li.innerHTML = `<div>${a}</div><div>★ 5.0</div>`;
      listEl.appendChild(li);
    });
    qs('#season').textContent = ins.season;
    qs('#interest').textContent = ins.interestScore + '/100';
    const chips = qs('#personas'); chips.innerHTML='';
    ins.personas.forEach(p => {
      const s = document.createElement('span');
      s.className = 'badge';
      s.textContent = p;
      chips.appendChild(s);
    });
    resultCard.style.display='block';
    window.scrollTo({ top: resultCard.offsetTop - 20, behavior: 'smooth' });
  }

  // --- Runtime tests --------------------------------------------------------
  const tests = [];
  function T(name, ok){ tests.push([name, !!ok]); console[ok?'log':'warn']((ok?'✔':'✘')+' '+name); }
  T('prefixSuggest returns ≤ 5', prefixSuggest(DEMO_CITIES, 's', 5).length <= 5);
  T('prefixSuggest strict city prefix', prefixSuggest(DEMO_CITIES, 'lo').every(c => c.name.toLowerCase().startsWith('lo')));
  T('Empty query -> empty', prefixSuggest(DEMO_CITIES, '').length === 0);
  T('Compute insights shape', (()=>{ const x = computeInsights(DEMO_CITIES[0], DEMO_CITIES[1]); return x && x.airlines && x.season && x.personas; })());
  const failed = tests.filter(t => !t[1]);
  const msg = failed.length ? `Tests: ${tests.length - failed.length}/${tests.length} passed` : `All tests passed (${tests.length}/${tests.length})`;
  statusEl.hidden = false; statusEl.textContent = msg; statusEl.classList.toggle('error', !!failed.length);
  setTimeout(()=> statusEl.remove(), failed.length? 6000 : 2500);
})();
