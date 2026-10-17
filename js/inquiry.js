// Sends the admissions form to the school app. If the app can't be reached,
// the form falls back to its mailto: action so no inquiry is lost.
(function () {
  var form = document.getElementById('inquiry');
  if (!form || !window.fetch) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      name: form.name.value,
      phone: form.phone.value,
      website: form.website.value,
      language: (document.documentElement.lang || 'en').slice(0, 2) === 'es' ? 'es' : 'en'
    };
    var button = form.querySelector('button');
    button.disabled = true;
    fetch('https://app.cdl-ta.com/api/public/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.innerHTML = '<h2>Thank you</h2><p>Admissions will call you soon. Questions? Call (502) 230-8224.</p>';
    }).catch(function () {
      button.disabled = false;
      form.submit();
    });
  });
})();
