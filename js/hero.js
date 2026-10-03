(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Typing line
  var el = document.querySelector('.typed');
  if (el) {
    var words = el.getAttribute('data-words').split('|');
    if (reduce) {
      el.textContent = words[0];
    } else {
      var w = 0, i = 0, del = false;
      var tick = function () {
        var word = words[w];
        el.textContent = word.slice(0, i);
        if (!del && i < word.length) { i++; setTimeout(tick, 90); }
        else if (!del) { del = true; setTimeout(tick, 1400); }
        else if (i > 0) { i--; setTimeout(tick, 45); }
        else { del = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
      };
      tick();
    }
  }

  // Network background
  var c = document.getElementById('hero-network');
  if (!c) return;
  var ctx = c.getContext('2d');
  var pts = [], W = 0, H = 0, dpr = window.devicePixelRatio || 1;
  var resize = function () {
    var r = c.parentElement.getBoundingClientRect();
    W = r.width; H = r.height;
    c.width = W * dpr; c.height = H * dpr;
    c.style.width = W + 'px'; c.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(70, Math.round(W * H / 16000));
    pts = [];
    for (var k = 0; k < n; k++) {
      pts.push({ x: Math.random() * W, y: Math.random() * H,
                 vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
    }
  };
  var draw = function () {
    var rgb = document.body.classList.contains('quarto-dark') ? '200,205,230' : '30,40,80';
    ctx.clearRect(0, 0, W, H);
    pts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    for (var a = 0; a < pts.length; a++) {
      for (var b = a + 1; b < pts.length; b++) {
        var d = Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y);
        if (d < 140) {
          ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.2 * (1 - d / 140)) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke();
        }
      }
    }
    ctx.fillStyle = 'rgba(' + rgb + ',0.35)';
    pts.forEach(function (p) { ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill(); });
    if (!reduce) requestAnimationFrame(draw);
  };
  resize(); draw();
  window.addEventListener('resize', resize);
})();
