// Waits up to 40 s for the human to clear a CAPTCHA / "I'm not a robot" check.
// Paste the whole file into the browser javascript tool (top-level await works).
// It never touches the CAPTCHA: it only reads the page.
// Returns {done:true, by:...} when it is cleared, {done:false} on timeout (run it again).
// If the page navigates while it waits, the tool reports "the page navigated":
// that also means something happened, so check the page.
const SEL = [
  'iframe[src*="recaptcha"]', 'iframe[src*="hcaptcha"]', 'iframe[src*="challenges.cloudflare"]',
  'iframe[src*="arkoselabs"]', 'iframe[src*="funcaptcha"]', '#px-captcha', '[id*="captcha" i]',
  '[class*="captcha" i]', '#challenge-form', '#cf-challenge-running'
].join(',');
const TOKENS = '[name="g-recaptcha-response"],[name="h-captcha-response"],[name="cf-turnstile-response"]';
const visible = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
const present = () => [...document.querySelectorAll(SEL)].some(el => visible(el) && !el.closest('.grecaptcha-badge'));
const token = () => [...document.querySelectorAll(TOKENS)].some(t => t.value && t.value.length > 20);
const url0 = location.href, t0 = Date.now(), seen = present();
if (seen || token()) await new Promise(r => {
  const i = setInterval(() => {
    if (token() || (seen && !present()) || location.href !== url0) { clearInterval(i); r(); }
  }, 1000);
  setTimeout(() => { clearInterval(i); r(); }, 40000);
});
({
  done: token() || (seen && !present()) || location.href !== url0,
  by: token() ? 'token' : (location.href !== url0 ? 'page changed' : (seen && !present() ? 'captcha gone' : (!seen ? 'no captcha found' : 'nothing yet'))),
  captcha_seen: seen, sec: Math.round((Date.now() - t0) / 1000), url: location.href
})
