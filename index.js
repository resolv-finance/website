
document.querySelectorAll('a.nav').forEach(el => {
  el.onclick = event => {
    document.querySelectorAll('main').forEach(main => {
      main.classList.toggle('hidden', main.id !== event.target.href.split('#')[1]);
    });
    return false;
  }
});
