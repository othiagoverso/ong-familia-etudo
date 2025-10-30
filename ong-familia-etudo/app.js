

document.addEventListener("DOMContentLoaded", () => {
  // Dropdown (desktop)
  const menu = document.getElementById("menu-servicos");
  if (menu) {
    const button = menu.querySelector("button");
    const panel = menu.querySelector(".menu-panel");
    const toggle = (open) => {
      menu.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
    };
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = menu.classList.contains("open");
      toggle(!isOpen);
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) toggle(false);
    });
  }

  // Hamburger + mobile drawer
  const btnHamburger = document.getElementById("btn-hamburger");
  const drawer = document.getElementById("mobile-drawer");
  if (btnHamburger && drawer) {
    btnHamburger.addEventListener("click", () => {
      const open = !drawer.classList.contains("open");
      drawer.classList.toggle("open", open);
      btnHamburger.setAttribute("aria-expanded", String(open));
    });
  }

  // Form validation + toast
  const form = document.getElementById("form-rapido");
  const error = document.getElementById("erro-form");
  const toast = document.getElementById("toast");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      error?.classList.remove("show");
      const nome = form.querySelector('input[name="nome"]');
      const whats = form.querySelector('input[name="whats"]');

      let valid = true;
      // nome
      if (!nome.value || nome.value.trim().length < 3) {
        nome.classList.add("error");
        valid = false;
      } else {
        nome.classList.remove("error");
      }
      // whatsapp pattern
      const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!re.test(whats.value)) {
        whats.classList.add("error");
        valid = false;
      } else {
        whats.classList.remove("error");
      }

      if (!valid) {
        error?.classList.add("show");
        return;
      }

      // Simulate send
      showToast("Solicitação enviada com sucesso!");
      form.reset();
    });
  }

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  // Modal
  const modalBackdrop = document.getElementById("modal-backdrop");
  const btnOpenModal = document.getElementById("btn-open-modal");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnOkModal = document.getElementById("btn-ok-modal");

  function openModal() {
    modalBackdrop?.classList.add("open");
    modalBackdrop?.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modalBackdrop?.classList.remove("open");
    modalBackdrop?.setAttribute("aria-hidden", "true");
  }

  btnOpenModal?.addEventListener("click", openModal);
  btnCloseModal?.addEventListener("click", closeModal);
  btnOkModal?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
