// "Watch": cheaply notes what the human does in this tab (clicks, which field was edited (never its text), scroll, page changes).
// 1) Install once per page:   paste this file. Returns {watch:'on'}.
// 2) Read later (tiny output): window.__watch ? window.__watch.summary() : 'no watcher (page changed)'
// It keeps only the last 30 events, stores no typed text (only "typed in <field>"),
// and records only real human events (isTrusted), never the agent's own scripted ones.
if (!window.__watch) {
  const ev = [], t0 = Date.now();
  const name = el => {
    if (!el || !el.tagName) return '?';
    const field = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable;
    const lab = el.labels && el.labels[0] ? el.labels[0].innerText : '';
    const t = (el.getAttribute('aria-label') || lab || (field ? (el.placeholder || el.name || el.id || el.type || '') : (el.innerText || el.id || ''))).trim().replace(/\s+/g, ' ');
    return el.tagName.toLowerCase() + (t ? ' "' + t.slice(0, 40) + '"' : '');
  };
  const add = (type, el) => {
    const last = ev[ev.length - 1], n = name(el);
    if (last && last.type === type && last.on === n) { last.times++; last.s = Math.round((Date.now() - t0) / 1000); return; }
    ev.push({ s: Math.round((Date.now() - t0) / 1000), type, on: n, times: 1 });
    if (ev.length > 30) ev.shift();
  };
  addEventListener('click', e => e.isTrusted && add('click', e.target.closest('a,button,input,label,[role=button]') || e.target), true);
  addEventListener('input', e => e.isTrusted && !/checkbox|radio/.test(e.target.type) && add('typed in', e.target), true);
  addEventListener('change', e => e.isTrusted && add('changed', e.target), true);
  addEventListener('scroll', e => e.isTrusted && add('scroll', document.body), { capture: true, passive: true });
  addEventListener('beforeunload', () => add('left page', document.body));
  window.__watch = {
    ev,
    summary: () => ({ url: location.href, title: document.title.slice(0, 60), idle_sec: ev.length ? Math.round((Date.now() - t0) / 1000) - ev[ev.length - 1].s : null, last: ev.slice(-8) })
  };
}
({ watch: 'on', url: location.href })
