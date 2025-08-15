(function(){
  "use strict";

  const LS_KEY = "weight-tracker:entries";
  const $widget = document.getElementById("scaleWidget");
  const $toggle = document.getElementById("scaleToggle");
  const $form = document.getElementById("entryForm");
  const $weight = document.getElementById("weightInput");
  const $date = document.getElementById("dateInput");
  const $diag = document.getElementById("diagnostic");
  const $tbody = document.getElementById("tableBody");
  const $count = document.getElementById("entryCount");
  const $download = document.getElementById("downloadBtn");
  const $clear = document.getElementById("clearBtn");

  let entries = load();

  setToday($date);
  render();

  $toggle.addEventListener("click", () => {
    const expanded = $widget.classList.toggle("expandido");
    $widget.setAttribute("aria-expanded", String(expanded));
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const w = parseFloat(($weight.value || "").replace(",", "."));
    const d = $date.value;

    if (!Number.isFinite(w) || w <= 0){
      alert("Informe um peso válido em quilogramas (ex.: 72.45).");
      $weight.focus(); return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)){
      alert("Informe uma data válida.");
      $date.focus(); return;
    }

    const idx = entries.findIndex(e => e.date === d);
    const item = { date: d, weightKg: round2(w) };
    if (idx >= 0) entries[idx] = item; else entries.push(item);

    persist(entries);
    render();
    $form.reset();
    setToday($date);
    $weight.focus();
  });

  $download.addEventListener("click", () => {
    if (entries.length === 0){ alert("Não há dados para baixar."); return; }
    const rows = [["data","peso_kg"]];
    const sorted = [...entries].sort((a,b)=> a.date.localeCompare(b.date));
    for (const e of sorted) rows.push([e.date, String(e.weightKg).replace(".", ",")]);
    const csv = rows.map(r=> r.map(escapeCSV).join(";")).join("\n");
    downloadText(csv, "peso_historico.csv", "text/csv");
  });

  $clear.addEventListener("click", () => {
    if (!entries.length){ alert("Não há dados para limpar."); return; }
    if (confirm("Tem certeza de que deseja apagar todas as medições deste dispositivo? Esta ação não pode ser desfeita.")){
      entries = [];
      persist(entries);
      render();
    }
  });

  function render(){
    const shown = [...entries].sort((a,b)=> a.date.localeCompare(b.date));

    $tbody.innerHTML = "";
    for (let i=0;i<shown.length;i++){
      const cur = shown[i];
      const prev = shown[i+1];
      const delta = prev ? (cur.weightKg - prev.weightKg) : null;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${formatDate(cur.date)}</td>
        <td class="direita">${formatKg(cur.weightKg)}</td>
        <td class="direita silenciado">${delta === null ? "—" : formatSigned(delta)}</td>
      `;
      $tbody.appendChild(tr);
    }

    $count.textContent = entries.length === 1
      ? "1 medição"
      : `${entries.length} medições`;

    if (entries.length < 2){
      setDiag("estavel", "");
      return;
    }

    const asc = [...entries].sort((a,b)=> a.date.localeCompare(b.date));
    const first = asc[0];
    const last  = asc[asc.length-1];

    const deltaKg = last.weightKg - first.weightKg;
    const days = daysBetween(first.date, last.date);

    if (Math.abs(deltaKg) < 0.999){
      setDiag("estavel", `Você <span class="destaque">manteve o peso</span> nos últimos <span class="destaque">${days} ${plural(days,"dia","dias")}</span>.`);
    } else if (deltaKg > 0){
      setDiag("ganho", `Você <span class="destaque">ganhou ${formatKgAbs(deltaKg)}</span> nos últimos <span class="destaque">${days} ${plural(days,"dia","dias")}</span>.`);
    } else {
      setDiag("perda", `Você <span class="destaque">perdeu ${formatKgAbs(deltaKg)}</span> nos últimos <span class="destaque">${days} ${plural(days,"dia","dias")}</span>.`);
    }
  }

  function setDiag(type, html){
    $diag.className = "diagnostico " + (type || "");
    $diag.innerHTML = html;
  }

  function load(){
    try{
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr)
        ? arr.filter(e=> e && typeof e.date==="string" && Number.isFinite(+e.weightKg))
              .map(e=> ({date: e.date, weightKg: round2(+e.weightKg)}))
        : [];
    }catch{ return []; }
  }

  function persist(arr){
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  }

  function setToday($input){
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth()+1).padStart(2,"0");
    const dd = String(now.getDate()).padStart(2,"0");
    $input.value = `${yyyy}-${mm}-${dd}`;
  }

  function formatDate(iso){
    const [y,m,d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }
  function formatKg(n){ return `${n.toFixed(2)} kg`; }
  function formatKgAbs(n){ return `${Math.abs(n).toFixed(2)} kg`; }
  function formatSigned(n){ return (n>0?"+":"")+n.toFixed(2)+" kg"; }
  function daysBetween(aISO, bISO){
    const a = new Date(aISO+"T00:00:00");
    const b = new Date(bISO+"T00:00:00");
    return Math.max(0, Math.round(Math.abs(b - a)/86400000));
  }
  function plural(n,sing,plur){ return n===1?sing:plur; }
  function round2(n){ return Math.round(n*100)/100; }

  function escapeCSV(v){
    v = String(v ?? "");
    if (/[;"\n]/.test(v)) return `"${v.replace(/"/g,'""')}"`;
    return v;
  }
  function downloadText(text, filename, mime="text/plain"){
    const blob = new Blob([text], {type: mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 0);
  }

  document.addEventListener("keydown",(e)=>{
    if (e.key === "Escape" && $widget.classList.contains("expandido")){
      $toggle.click();
    }
  });

})();


