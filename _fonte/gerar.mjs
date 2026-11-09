// Gera a página de vendas por raça (/lulu, /shih-tzu, /salsicha, /yorkshire), a raiz, privacidade e termos.
// Texto em _fonte/conteudo.mjs (literal do pagina.md); mídia em img/<raça> e video/<raça> (midia.mjs + otimizar.py).
//   node _fonte/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { racas, texto as T, raiz as RZ } from './conteudo.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.dirname(AQUI);
const MED = JSON.parse(fs.readFileSync(path.join(AQUI, 'medidas.json'), 'utf8'));

// Checkout Cakto de cada raça (produto "No Tapetinho - <raça>", com os 5 bumps). Vazio: o botão aponta para #checkout-pendente.
const CHECKOUT = { lulu: 'https://pay.cakto.com.br/4335byt', 'shih-tzu': 'https://pay.cakto.com.br/38uhrzs', salsicha: 'https://pay.cakto.com.br/evzg3t6', yorkshire: 'https://pay.cakto.com.br/bci7s4g' };
// Rastreio. pixel: o da oferta, compartilhado com a Conta 01 (só PageView no navegador; a compra vai pela CAPI). painel: chave do script de visitas do painel
// (instalacao.script do diagnostico-rastreio). Vazio = nada carrega.
const RASTREIO = { pixel: '4621816201469916', painel: '7c65ca17fb0c624457cb6c87d1063a69' };

// ícones da barra de status do celular do trilho (sinal e bateria)
const STATUS_IC = '<svg viewBox="0 0 18 12" fill="currentColor" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg viewBox="0 0 26 12" aria-hidden="true"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/></svg>';
const ok = (c, m) => { if (!c) { console.error('ERRO:', m); process.exit(1); } };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const rastreio = (RASTREIO.pixel ? `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${RASTREIO.pixel}');fbq('track','PageView');</script>
<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${RASTREIO.pixel}&ev=PageView&noscript=1"></noscript>` : '<!-- RASTREIO PENDENTE: pixel da oferta (Meta, compartilhado com a Conta 01). Preencher RASTREIO.pixel em _fonte/gerar.mjs. -->')
    + '\n' + (RASTREIO.painel ? `<script async src="https://painel.labofertas.com/api/lp/script?k=${RASTREIO.painel}"></script>` : '<!-- RASTREIO PENDENTE: script de visitas do painel labofertas. Preencher RASTREIO.painel em _fonte/gerar.mjs. -->');

function pagina(id) {
  const r = racas[id];
  const tk = s => s.replaceAll('{R}', r.R).replaceAll('{C}', r.C).replaceAll('{oC}', (r.f ? 'a ' : 'o ') + r.C).replaceAll('{OC}', (r.f ? 'A ' : 'O ') + r.C);
  const t = s => md(tk(s));
  const m = MED[id];
  const img = (n, alt, extra = '') => `<img src="../img/${id}/${n}.webp" width="${m[n][0]}" height="${m[n][1]}" alt="${esc(tk(alt))}" loading="lazy" decoding="async"${extra}>`;
  const shot = (n, alt, cls = '') => `<figure class="shot ${cls}">${img(n, alt)}</figure>`;
  const fig = (n, alt, legenda, cls = '') => `<figure class="legendada ${cls}"><div class="shot">${img(n, alt)}</div><figcaption>${t(legenda)}</figcaption></figure>`;
  const video = (n, alt, legenda) => `<figure class="legendada"><div class="tela-video"><video muted loop playsinline preload="none" width="540" height="1168" poster="../img/${id}/video-${n}-capa.webp" data-src="../video/${id}/${n}.mp4" aria-label="${esc(tk(alt))}"></video></div>${legenda ? `<figcaption>${t(legenda)}</figcaption>` : ''}</figure>`;
  // o story do hero: barras de progresso, cada parte um vídeo mudo do app ou uma tela inteira com o realce; toque avança, segurar pausa
  const story = () => {
    const R = m.realces || {};
    const partes = T.story.map(([tipo, n, rot, desc], k) => {
      const midia = tipo === 'video'
        ? `<video class="st-midia" data-src="../video/${id}/${n}.mp4" poster="../img/${id}/video-${n}-capa.webp" width="540" height="1168" muted playsinline preload="none" disablepictureinpicture aria-label="${esc(tk(desc))}"></video>`
        : `<img class="st-midia" data-src="../img/${id}/tela-${n}.webp" width="${m['tela-' + n][0]}" height="${m['tela-' + n][1]}" decoding="async" alt="${esc(tk(desc))}">`
          + (R[n] ? `<span class="st-realce" aria-hidden="true" style="left:${R[n].left}%;top:${R[n].top}%;width:${R[n].width}%;height:${R[n].height}%"></span>` : '');
      return `<div class="st-parte${k ? '' : ' on'}"${tipo === 'img' ? ' data-dur="3200"' : ''}><div class="st-zoom">${midia}</div><span class="st-rot">${t(rot)}</span></div>`;
    }).join('\n   ');
    return `<div class="story" data-story role="region" aria-roledescription="carrossel" aria-label="${esc(tk('O app do {R} por dentro, em ' + T.story.length + ' partes'))}"><div class="cel"><div class="vetro"><span class="isola"></span><div class="stato"><span>9:41</span><i>${STATUS_IC}</i></div>
  <div class="st-tela" tabindex="0" role="button" aria-label="Toque para avançar, segure para pausar">
   <div class="st-barras" aria-hidden="true">${T.story.map(() => '<i><b></b></i>').join('')}</div>
   ${partes}
  </div></div></div></div>`;
  };
  const ck = CHECKOUT[id] || '#checkout-pendente';
  const botao = micro => `<div class="cta"><a class="btn" href="${esc(ck)}" data-checkout="${id}">${t(T.botao)}</a><p class="micro">${t(micro)}</p></div>`;
  // seção em três partes: texto, mídia, fecho do texto. No celular nessa ordem; no computador, texto e fecho de um lado e mídia do outro
  const sec3 = (cls, a, midia, b, inverte) => `<section class="${cls}"><div class="wrap tri${inverte ? ' inv' : ''}"><div class="ta">${a}</div><div class="tm">${midia}</div><div class="tb">${b}</div></div></section>`;
  const sec = (cls, corpo, midia, inverte) => `<section class="${cls}"><div class="wrap grade${inverte ? ' inv' : ''}"><div class="texto">${corpo}</div><div class="midia">${midia}</div></div></section>`;


  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(T.marca + " · {R}")}</title>
<meta name="description" content="${esc(tk(T.hero.sub))}">
<link rel="icon" type="image/svg+xml" href="../img/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="../img/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="../img/apple-touch-180.png">
<link rel="preload" as="image" href="../img/${id}/video-dia-capa.webp" fetchpriority="high">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
${rastreio}
<link rel="stylesheet" href="../estilo.css">
</head>
<body>
<header class="barra"><div class="wrap"><img src="../img/icone-64.png" width="28" height="28" alt=""><span>${t(T.marca)}</span></div></header>
<main>
<section class="hero"><div class="wrap hero-grade">
 <div class="texto">
  <p class="chapeu">${t(r.chapeu)}</p>
  <h1>${t(T.hero.h1)}</h1>
  <p class="sub">${t(T.hero.sub)}</p>
 </div>
 <div class="midia">${story()}</div>
 ${botao(T.hero.micro)}
</div></section>

${sec('s-dor', `<h2>${t(r.dor)}</h2><p>${t(T.dor.p)}</p>`,
  fig('casos', 'Tela Agora, xixi: os casos rasga o tapetinho, faz do lado, erra de dia e acerta à noite', T.dor.legenda))}

<section class="s-telas claro"><div class="wrap">
 <h2 class="centro">${t(T.telas.h2)}</h2><p class="centro telas-p">${t(T.telas.p)}</p>
 <div class="trilho" data-trilho tabindex="0" role="region" aria-label="${esc(tk('Telas do app do {R}'))}">
 ${T.telas.itens.map(([n, tit, linha]) => `<figure class="slide"><div class="cel"><div class="vetro"><span class="isola"></span><div class="stato"><span>9:41</span><i>${STATUS_IC}</i></div><img class="schermo" src="../img/${id}/tela-${n}.webp" width="${m['tela-' + n][0]}" height="${m['tela-' + n][1]}" loading="lazy" decoding="async" alt="${esc(tk('Tela do app: ' + tit))}"></div></div><figcaption><b>${t(tit)}</b>${t(linha)}</figcaption></figure>`).join('\n ')}
 </div>
 <div class="pontos" data-pontos></div>
</div></section>

${sec3('s-dia', `<h2>${t(T.dia.h2)}</h2>${T.dia.itens.map(i => `<p>${t(i)}</p>`).join('')}`,
  video('dia', 'Gravação do app: o dia 5 começa, o relógio conta 3 minutos, Feito, e o dia 6 aparece para amanhã', T.dia.legenda),
  `<p class="plano-linha">${t(T.dia.plano)}</p>`, true)}

${sec3('s-xixi claro', `<h2>${t(T.xixi.h2)}</h2>${T.xixi.itens.map(i => `<p>${t(i)}</p>`).join('')}`,
  `<div class="pilha">${shot('diario', 'Diário do xixi: os dois botões e o gráfico por horário dos últimos 7 dias')}<p class="menor">${t(T.xixi.menor)}</p></div>`,
  botao(T.xixi.micro))}

<section class="s-raca claro"><div class="wrap raca-grade">
 <div class="ra">
  <h2>${t(T.raca.h2)}</h2><p>${t(T.raca.p.replace('{corpo}', r.corpo))}</p>
 </div>
 <div class="rm1">${shot('comandos', 'Tela Comandos: os 7 cartões desenhados com um {R}', 'alto')}</div>
 <div class="rb"><ul class="lista-ok">${r.lista5.map(i => `<li>${t(i)}</li>`).join('')}</ul></div>
 <div class="rm2">${shot('nota-raca', 'O ajuste do {R} dentro do app')}</div>
 <div class="rc"><p class="menor">${t(T.raca.menor)}</p></div>
</div></section>

${sec('s-agora', `<h2>${t(T.agora.h2)}</h2><p>${t(T.agora.p)}</p>`,
  video('agora', 'Gravação do app: tela Agora, toque em Late demais e o que fazer agora aparece'))}

<section class="s-vem claro"><div class="wrap">
 <h2 class="centro">${t(T.vem.h2)}</h2>
 <ul class="lista-ok colunas">${T.vem.itens.map((i, k) => `<li${k === 7 ? ' class="bonus"' : ''}>${t(i)}</li>`).join('')}</ul>
 ${fig('kit', 'Kit para imprimir: o calendário dos 21 dias com o nome do cão', T.vem.legenda, 'largo')}
</div></section>

<section class="s-prova"><div class="wrap estreito">
 <h2 class="centro">${t(T.prova.h2)}</h2><p class="centro prova-p">${t(T.prova.p)}</p>
 <div class="depos">${r.depoimentos.map(([nome, txt, gen], k) => `<figure class="depo"><blockquote><p>${esc(txt)}</p></blockquote><figcaption><span class="av av${k % 3}" aria-hidden="true">${esc([...nome.trim()][0].toUpperCase())}</span><span class="quem"><b>${esc(nome)}</b><span>${t(T.prova.tutor[gen])}</span></span></figcaption></figure>`).join('\n ')}</div>
</div></section>

<section class="s-oferta" id="oferta"><div class="wrap tri caixa-oferta">
 <div class="ta"><h2>${t(T.oferta.h2)}</h2>
  <div class="preco-bloco"><p class="lancamento">${t(T.oferta.lancamento)}</p><p class="preco-linha">de <s><span class="sr">preço cheio </span>${t(T.oferta.de)}</s> <strong>${t(T.oferta.por)}</strong></p></div>
  ${T.oferta.itens.map(i => `<p>${t(i)}</p>`).join('')}</div>
 <div class="tm">${fig('ficha', 'A ficha do cão: a foto, o nome, e o aviso de que ficam só no celular', T.oferta.legenda)}</div>
 <div class="tb">${botao(T.oferta.micro)}</div>
</div></section>

<section class="s-faq claro"><div class="wrap estreito"><h2 class="centro">Dúvidas</h2>
${T.faq.map(([q, a]) => `<details><summary>${t(q)}</summary><p>${t(a)}</p></details>`).join('\n')}
<div class="fecho centro"><p class="fecho-linha"><strong>${t(T.fecho.linha)}</strong></p>${botao(T.fecho.micro)}</div>
</div></section>
</main>
<footer><div class="wrap">
 <p class="aviso">${t(T.fecho.aviso)}</p>
 <p><strong>${t(T.rodape.marca)}</strong> · <a href="mailto:${T.rodape.email}">${T.rodape.email}</a></p>
 <p class="links"><a href="../privacidade/">Privacidade</a> · <a href="../termos/">Termos de uso</a></p>
</div></footer>
<div class="barra-compra" aria-hidden="true" inert><div class="dentro"><p class="preco-bc"><strong>R$ 37</strong> uma vez só</p><a class="btn" href="${esc(ck)}" data-checkout="${id}" tabindex="-1">${t(T.botao)}</a></div></div>
<script>
/* repassa a query (UTMs e fbclid) para o checkout */
(function(){var q=location.search.slice(1);if(!q)return;document.querySelectorAll('a[data-checkout]').forEach(function(a){if(!/^https?:/.test(a.getAttribute('href')))return;a.href+=(a.href.indexOf('?')<0?'?':'&')+q;});})();
/* barra de compra fixa: aparece quando nenhum dos botões principais está na tela, some quando algum aparece.
   O hero inteiro conta como botão (o do hero fica abaixo do celular): enquanto o hero está na tela, a barra não entra */
(function(){var bar=document.querySelector('.barra-compra'),vis=new Set();if(!bar||!('IntersectionObserver' in window))return;
var alvos=[document.querySelector('.hero')].concat([].slice.call(document.querySelectorAll('main .cta .btn')));
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)vis.add(e.target);else vis.delete(e.target);});var on=vis.size===0;
bar.classList.toggle('on',on);bar.inert=!on;bar.setAttribute('aria-hidden',String(!on));bar.querySelector('a').tabIndex=on?0:-1;});
alvos.forEach(function(a){if(a)io.observe(a);});})();
/* o celular do hero em partes, estilo Stories (o mesmo da Lucro na Mão). Cada print dura 3,2 s; o vídeo dura o vídeo.
   Toque avança, segurar pausa, setas do teclado; loop; para fora da tela ou com a aba escondida; cada parte carrega a seguinte.
   Com "reduzir movimento": parado na primeira tela, sem vídeo */
(function(){var reduz=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-story]').forEach(function(st){
var partes=[].slice.call(st.querySelectorAll('.st-parte')),barras=[].slice.call(st.querySelectorAll('.st-barras b')),tela=st.querySelector('.st-tela');
var n=partes.length,atual=0,gasto=0,ultimo=0,segurando=false,fora=false,escondida=false;
function carregar(p){if(!p)return;var md=p.querySelector('[data-src]');if(md&&!md.getAttribute('src')){md.src=md.dataset.src;if(md.tagName==='VIDEO')md.preload='auto';}}
if(reduz){st.classList.add('parado');var im=partes[1];partes.forEach(function(p,k){p.classList.toggle('on',k===1);});carregar(im);return;}
function video(i){return partes[i].querySelector('video');}
function tocar(v){var pr=v.play();if(pr&&pr.catch)pr.catch(function(){v.dataset.falhou='1';});}
function mostrar(i){var antes=atual;partes.forEach(function(p,k){p.classList.toggle('on',k===i);p.classList.toggle('foi',k===antes&&k!==i);var v=video(k);if(v&&k!==i)v.pause();});
barras.forEach(function(b,k){b.style.width=k<i?'100%':'0%';});atual=i;gasto=0;carregar(partes[i]);carregar(partes[(i+1)%n]);
var v=video(i);if(v&&!v.dataset.falhou){try{v.currentTime=0;}catch(e){}if(!fora&&!escondida)tocar(v);}}
function proximo(){mostrar((atual+1)%n);}function anterior(){mostrar((atual-1+n)%n);}
function parado(){return segurando||fora||escondida;}
function quadro(tm){requestAnimationFrame(quadro);var dt=ultimo?Math.min(tm-ultimo,100):0;ultimo=tm;if(parado())return;var v=video(atual),fr;
if(v&&!v.dataset.falhou){if(v.readyState<2||!v.duration){gasto+=dt;if(gasto>3000)v.dataset.falhou='1';return;}if(v.paused&&!v.ended)tocar(v);fr=v.currentTime/v.duration;if(v.ended||fr>=0.995){proximo();return;}}
else{gasto+=dt;fr=gasto/(+partes[atual].dataset.dur||3200);if(fr>=1){proximo();return;}}
barras[atual].style.width=(Math.min(fr,1)*100)+'%';}
function pausar(sim){var v=video(atual);if(v&&!v.dataset.falhou){if(sim)v.pause();else if(!parado())tocar(v);}}
var timer=0,apertou=false;
tela.addEventListener('pointerdown',function(e){if(e.button>0)return;apertou=true;timer=setTimeout(function(){segurando=true;pausar(true);},200);});
function soltar(av){clearTimeout(timer);if(!apertou)return;apertou=false;if(segurando){segurando=false;pausar(false);}else if(av)proximo();}
tela.addEventListener('pointerup',function(){soltar(true);});tela.addEventListener('pointercancel',function(){soltar(false);});tela.addEventListener('pointerleave',function(){soltar(false);});
tela.addEventListener('contextmenu',function(e){e.preventDefault();});
tela.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='Enter'||e.key===' '){e.preventDefault();proximo();}else if(e.key==='ArrowLeft'){e.preventDefault();anterior();}});
if('IntersectionObserver' in window)new IntersectionObserver(function(es){fora=!es[0].isIntersecting;pausar(fora);},{threshold:0.2}).observe(st);
document.addEventListener('visibilitychange',function(){escondida=document.hidden;pausar(escondida);});
mostrar(0);requestAnimationFrame(quadro);});})();
/* trilho das telas: pontos que acompanham, setas, pontos clicáveis e arraste com o mouse (o dedo desliza nativo) */
(function(){document.querySelectorAll('[data-trilho]').forEach(function(t){var pts=t.nextElementSibling,cs=t.children;if(!pts||!pts.hasAttribute('data-pontos'))return;
for(var i=0;i<cs.length;i++)pts.appendChild(document.createElement('i'));
function idx(){var passo=cs.length>1?cs[1].offsetLeft-cs[0].offsetLeft:1;return t.scrollLeft+t.clientWidth>=t.scrollWidth-4?cs.length-1:Math.round(t.scrollLeft/passo);}
function ir(k){k=Math.max(0,Math.min(cs.length-1,k));t.scrollTo({left:cs[k].offsetLeft-cs[0].offsetLeft,behavior:'smooth'});}
function seta(c,r,d){var b=document.createElement('button');b.type='button';b.className=c;b.setAttribute('aria-label',r);b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'"/></svg>';return b;}
var ant=seta('ant','Tela anterior','M15 6l-6 6 6 6'),prox=seta('prox','Próxima tela','M9 6l6 6-6 6');pts.insertBefore(ant,pts.firstChild);pts.appendChild(prox);
function marca(){var n=idx();[].forEach.call(pts.querySelectorAll('i'),function(p,k){p.classList.toggle('on',k===n);});ant.disabled=t.scrollLeft<=4;prox.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4;}
ant.addEventListener('click',function(){ir(idx()-1);});prox.addEventListener('click',function(){ir(idx()+1);});
[].forEach.call(pts.querySelectorAll('i'),function(p,k){p.addEventListener('click',function(){ir(k);});});
t.addEventListener('scroll',function(){requestAnimationFrame(marca);},{passive:true});window.addEventListener('resize',marca);marca();
var x0=0,s0=0,mv=false,arr=false;
t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;x0=e.clientX;s0=t.scrollLeft;mv=true;arr=false;});
window.addEventListener('pointermove',function(e){if(!mv)return;var dx=e.clientX-x0;if(!arr&&Math.abs(dx)>6){arr=true;t.classList.add('arrastando');}if(arr)t.scrollLeft=s0-dx;});
window.addEventListener('pointerup',function(){if(!mv)return;mv=false;if(arr){t.classList.remove('arrastando');var passo=cs.length>1?cs[1].offsetLeft-cs[0].offsetLeft:1;ir(Math.round(t.scrollLeft/passo));}});
});})();
/* gravações do app: carregam e tocam só quando aparecem na tela (mudas, em loop) */
(function(){var vs=document.querySelectorAll('video[data-src]');if(!('IntersectionObserver' in window)){vs.forEach(function(v){v.src=v.dataset.src;});return;}
var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src){v.src=v.dataset.src;}v.play().catch(function(){});}else if(v.src){v.pause();}});},{rootMargin:'200px 0px'});
vs.forEach(function(v){io.observe(v);});})();
</script>
</body>
</html>
`;
  ok(Array.isArray(r.depoimentos) && r.depoimentos.length === 3 && r.depoimentos.every(d => d[2] === 'f' || d[2] === 'm'), 'depoimentos da raça ' + id);
  ok(!/\u2014/.test(html), 'travessão na página ' + id);
  ok(!/\{(R|C|oC|OC)\}/.test(html), 'marcador sobrando em ' + id);
  return html;
}

for (const id of Object.keys(racas)) {
  fs.mkdirSync(path.join(SITE, id), { recursive: true });
  fs.writeFileSync(path.join(SITE, id, 'index.html'), pagina(id));
}

// páginas simples: raiz (escolher a raça), privacidade e termos
const simples = (titulo, corpo, raiz) => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title><link rel="icon" type="image/png" sizes="32x32" href="${raiz}img/favicon-32.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${raiz}estilo.css"></head>
<body><header class="barra"><div class="wrap"><img src="${raiz}img/icone-64.png" width="28" height="28" alt=""><span>No Tapetinho</span></div></header>
<main><section><div class="wrap estreito simples">${corpo}</div></section></main>
<footer><div class="wrap"><p><strong>No Tapetinho</strong> · <a href="mailto:contato@notapetinho.com">contato@notapetinho.com</a></p></div></footer></body></html>
`;
// a raiz: destino da bio (marca.md). Os cartões levam a origem "bio" para o painel separar de anúncio.
const ICONES_APP = JSON.parse(fs.readFileSync(path.join(SITE, '..', 'app', '_fonte', 'icones-ui.json'), 'utf8')).svg;
const svgApp = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES_APP[n]}</svg>`;
const BIO = '?utm_source=bio&utm_medium=raiz';
const URL_SITE = 'https://notapetinho.com/';
fs.writeFileSync(path.join(SITE, 'index.html'), `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(RZ.titulo)}</title>
<meta name="description" content="${esc(RZ.descricao)}">
<link rel="canonical" href="${URL_SITE}">
<meta property="og:type" content="website">
<meta property="og:url" content="${URL_SITE}">
<meta property="og:site_name" content="No Tapetinho">
<meta property="og:title" content="${esc(RZ.titulo)}">
<meta property="og:description" content="${esc(RZ.descricao)}">
<meta property="og:image" content="${URL_SITE}img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Lulu, Shih Tzu, Salsicha e Yorkshire sentados num tapetinho, com a frase Adestramento em casa, 3 minutos por dia.">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="img/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="img/apple-touch-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
${rastreio}
<link rel="stylesheet" href="estilo.css">
</head>
<body class="raiz">
<header class="barra"><div class="wrap"><img src="img/icone-64.png" width="28" height="28" alt=""><span>No Tapetinho</span></div></header>
<main>
<section class="rz-topo"><div class="wrap estreito">
 <span class="chapeu">${esc(RZ.chapeu)}</span>
 <h1>${esc(RZ.h1)}</h1>
 <p class="sub">${esc(RZ.sub)}</p>
 <ul class="rz-linhas">${RZ.linhas.map(([ic, l]) => `<li><span class="rz-ic">${svgApp(ic)}</span><span>${md(l)}</span></li>`).join('')}</ul>
</div></section>
<section class="rz-racas"><div class="wrap estreito">
 <h2>${esc(RZ.h2)}</h2>
 <p class="rz-linha">${esc(RZ.linhaRaca)}</p>
 <ul class="rz-cartoes">${RZ.cartoes.map(([id, nome, cta]) => `<li><a href="${id}/${BIO}"><img src="img/racas/${id}-senta.webp" width="150" height="150" alt="Ilustração do ${esc(nome)} sentado, com a mão segurando o petisco" decoding="async"><strong>${esc(nome)}</strong><span class="rz-cta">${esc(cta)}</span></a></li>`).join('')}</ul>
</div></section>
<section class="rz-outra"><div class="wrap estreito">
 <h3>${esc(RZ.h3)}</h3>
 <p>${esc(RZ.outra).replace('contato@notapetinho.com', '<a href="mailto:contato@notapetinho.com">contato@notapetinho.com</a>')}</p>
</div></section>
</main>
<footer><div class="wrap">
 <p><strong>No Tapetinho</strong> · <a href="mailto:contato@notapetinho.com">contato@notapetinho.com</a> · <a href="privacidade/">Privacidade</a> · <a href="termos/">Termos</a></p>
 <p class="aviso">${esc(RZ.aviso)}</p>
</div></footer>
</body>
</html>
`);
ok(RZ.cartoes.every(([id]) => fs.existsSync(path.join(SITE, 'img', 'racas', id + '-senta.webp'))), 'ilustração dos cartões da raiz (rode _fonte/recortar.py)');
ok(fs.existsSync(path.join(SITE, 'img', 'og.jpg')), 'og.jpg da raiz (rode _fonte/marca.mjs)');
ok(!/\u2014/.test(fs.readFileSync(path.join(SITE, 'index.html'), 'utf8')), 'sem travessão na raiz');
fs.mkdirSync(path.join(SITE, 'privacidade'), { recursive: true });
fs.mkdirSync(path.join(SITE, 'termos'), { recursive: true });
fs.writeFileSync(path.join(SITE, 'privacidade', 'index.html'), simples('Privacidade · No Tapetinho', fs.readFileSync(path.join(AQUI, 'privacidade.html'), 'utf8'), '../'));
fs.writeFileSync(path.join(SITE, 'termos', 'index.html'), simples('Termos de uso · No Tapetinho', fs.readFileSync(path.join(AQUI, 'termos.html'), 'utf8'), '../'));
fs.writeFileSync(path.join(SITE, '.nojekyll'), '');
console.log('ok:', Object.keys(racas).join(', '), '| checkout:', Object.values(CHECKOUT).some(Boolean) ? 'ligado' : 'PENDENTE', '| rastreio:', RASTREIO.pixel && RASTREIO.painel ? 'ligado' : 'PENDENTE');
