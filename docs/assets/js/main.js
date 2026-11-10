/* ==========================================================
   juan.eng.br — interações
   ========================================================== */

/* ---- 1. SEUS CONTATOS: preencha aqui ----
   whatsapp: só números, com 55 + DDD (ex.: '5585999998888')
   Deixe '' (vazio) o que ainda não tiver. */
const CONTATO = {
  whatsapp: '',
  email: '',
  instagram: '',   // link completo, ex.: 'https://www.instagram.com/seu.usuario/'
  linkedin: '',    // ex.: 'https://www.linkedin.com/in/seu-usuario/'
  x: ''            // ex.: 'https://x.com/seu_usuario'
};

/* ---- 2. ETAPAS DO TOPO ----
   Para trocar pelas suas imagens, salve as 4 com a MESMA câmera
   na pasta assets/img/etapas/ e ajuste os nomes abaixo. */
const ETAPAS = [
  { img: 'assets/img/etapas/1-croqui.svg', nome: 'Projeto', desc: 'croqui à mão e estudo de volumetria', alt: 'Croqui à mão de um edifício residencial de seis pavimentos' },
  { img: 'assets/img/etapas/2-estrutura.svg', nome: 'Estrutura', desc: 'pilares, vigas e lajes em concreto armado', alt: 'Estrutura de concreto armado do edifício, com pilares, vigas e lajes' },
  { img: 'assets/img/etapas/3-instalacoes.svg', nome: 'Instalações e acabamentos', desc: 'hidráulica, elétrica, vedação e revestimentos', alt: 'Edifício com instalações hidráulicas e elétricas e acabamentos em execução' },
  { img: 'assets/img/etapas/4-final.svg', nome: 'Obra pronta', desc: 'render final do edifício entregue', alt: 'Render final do edifício pronto, ao entardecer' }
];

(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ---------- Links de contato ---------- */
  const waNumber = CONTATO.whatsapp.replace(/\D/g, '');
  const links = {
    whatsapp: waNumber ? 'https://wa.me/' + waNumber : '',
    email: CONTATO.email ? 'mailto:' + CONTATO.email : '',
    instagram: CONTATO.instagram,
    linkedin: CONTATO.linkedin,
    x: CONTATO.x
  };
  $$('[data-link]').forEach((a) => {
    const href = links[a.dataset.link];
    if (href) {
      a.href = href;
      if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    } else if (a.closest('.socials')) {
      a.hidden = true;
    } else {
      a.href = '#contato';
    }
  });
  if (waNumber) {
    const t = $('[data-text="whatsapp"]');
    if (t) t.textContent = waNumber.length >= 12 ? '(' + waNumber.slice(2, 4) + ') ' + waNumber.slice(4, -4) + '-' + waNumber.slice(-4) : waNumber;
  }
  if (CONTATO.email) { const t = $('[data-text="email"]'); if (t) t.textContent = CONTATO.email; }
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  /* ---------- Menu no celular ---------- */
  const toggle = $('.nav-toggle');
  const nav = $('#menu');
  if (toggle && nav) {
    const close = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    $$('a', nav).forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---------- Topo: lente + etapas ---------- */
  const stage = $('#hero-stage');
  if (stage) {
    const base = $('#hero-base');
    const lens = $('#hero-lens');
    const nextLabel = $('#hero-next');
    const counter = $('#steps-counter');
    const stepName = $('#steps-name');
    const stepDesc = $('#steps-desc');
    const steps = $$('.step');
    let atual = 0;

    ETAPAS.forEach((e) => { const i = new Image(); i.src = e.img; });

    const render = () => {
      const prox = (atual + 1) % ETAPAS.length;
      base.src = ETAPAS[atual].img;
      base.alt = ETAPAS[atual].alt;
      lens.src = ETAPAS[prox].img;
      nextLabel.textContent = ETAPAS[prox].nome;
      counter.textContent = '0' + (atual + 1) + ' / 0' + ETAPAS.length;
      stepName.textContent = '0' + (atual + 1) + ' · ' + ETAPAS[atual].nome;
      stepDesc.textContent = ETAPAS[atual].desc;
      steps.forEach((b, i) => {
        b.classList.toggle('is-active', i === atual);
        b.classList.toggle('is-done', i < atual);
        b.setAttribute('aria-pressed', String(i === atual));
      });
    };
    const irPara = (i) => { atual = (i + ETAPAS.length) % ETAPAS.length; render(); };

    let raf = 0;
    stage.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = stage.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        stage.style.setProperty('--x', x + 'px');
        stage.style.setProperty('--y', y + 'px');
        stage.classList.add('is-hover');
      });
    });
    stage.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); stage.classList.remove('is-hover'); });
    stage.addEventListener('click', () => irPara(atual + 1));

    // O texto fica por cima do prédio: passar o mouse nele esconde a lente
    const col = $('[data-noadvance]');
    if (col) {
      col.addEventListener('pointerenter', () => stage.classList.remove('is-hover'));
      col.addEventListener('pointermove', (e) => e.stopPropagation());
    }
    steps.forEach((b) => b.addEventListener('click', () => irPara(Number(b.dataset.step))));
    render();
  }

  /* ---------- Portfólio: carrossel arrastável ---------- */
  const track = $('#carousel');
  if (track) {
    const bar = $('#carousel-progress');
    const passo = () => { const c = $('.card', track); return c ? c.getBoundingClientRect().width + 20 : 460; };
    const atualizar = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      if (bar) bar.style.width = (14 + p * 86) + '%';
    };
    track.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);
    $$('[data-carousel]').forEach((b) => b.addEventListener('click', () => {
      track.scrollBy({ left: (b.dataset.carousel === 'next' ? 1 : -1) * passo(), behavior: 'smooth' });
    }));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { track.scrollBy({ left: passo(), behavior: 'smooth' }); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { track.scrollBy({ left: -passo(), behavior: 'smooth' }); e.preventDefault(); }
    });

    let drag = null;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, s: track.scrollLeft, moved: false };
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 4) { drag.moved = true; track.classList.add('is-dragging'); }
      if (drag.moved) track.scrollLeft = drag.s - dx;
    });
    window.addEventListener('pointerup', () => {
      if (drag && drag.moved) {
        // evita abrir um link sem querer depois de arrastar
        track.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
      }
      drag = null;
      track.classList.remove('is-dragging');
    });
    atualizar();
  }

  /* ---------- Animações ao rolar ---------- */
  const revelar = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revelar.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  } else {
    revelar.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Menu: marca a seção atual ---------- */
  const navLinks = $$('.nav a');
  const secoes = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && secoes.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach((s) => io2.observe(s));
  }

  /* ---------- Formulário: envia pelo WhatsApp ou e-mail ---------- */
  const form = $('#contact-form');
  if (form) {
    const note = $('#form-note');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const nome = String(d.get('nome') || '').trim();
      const msg = String(d.get('mensagem') || '').trim();
      if (!nome || !msg) { note.textContent = 'Preencha seu nome e a mensagem.'; return; }
      const texto = 'Olá, Juan! Sou ' + nome + '.\nAssunto: ' + d.get('assunto') +
        (d.get('telefone') ? '\nMeu WhatsApp: ' + d.get('telefone') : '') + '\n\n' + msg;
      if (waNumber) {
        window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        note.textContent = 'Abrindo o WhatsApp com a sua mensagem…';
      } else if (CONTATO.email) {
        window.location.href = 'mailto:' + CONTATO.email + '?subject=' + encodeURIComponent('Contato pelo site: ' + d.get('assunto')) + '&body=' + encodeURIComponent(texto);
        note.textContent = 'Abrindo o seu e-mail com a mensagem…';
      } else {
        note.textContent = 'Contato ainda não configurado.';
      }
    });
  }
})();
