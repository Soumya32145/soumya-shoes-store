console.log("JS loaded");
console.log(document.querySelector(".burger_icon"));
console.log(document.querySelector(".menu"));

/* ================= PAGE RESET ================= */
window.addEventListener("pageshow", () => {
   setTimeout(() => {
      window.scrollTo(0, 0);
   }, 10);

   const modal = document.getElementById("product-modal");
   if (modal) modal.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {

   const header = document.querySelector(".header");
   const burger = document.querySelector(".burger_icon");
   const menu = document.querySelector(".menu");
   const links = document.querySelectorAll(".menu a");

   const buttons = document.querySelectorAll(".btn-col");

   const modal = document.getElementById("product-modal");
   const modalImg = document.getElementById("modal-img");
   const modalTitle = document.getElementById("modal-title");
   const modalPrice = document.getElementById("modal-price");
   const closeBtn = document.querySelector(".close");
   const addCartBtn = document.getElementById("add-cart");

   const progressBar = document.getElementById("progress-bar");
   const themeToggle = document.getElementById("theme-toggle");

   const viewMoreBtn = document.getElementById("view-more-btn");
   const hiddenItems = document.querySelectorAll(".arrival-item.hidden");

   const contactForm = document.querySelector(".contact-form");

   let cart = [];
   let expanded = false;

   /* ================= MODAL FIX CORE ================= */
   function closeModal() {
      if (!modal) return;
      modal.style.display = "none";
   }

   /* ================= VIEW MORE ================= */
   viewMoreBtn?.addEventListener("click", () => {
      expanded = !expanded;

      hiddenItems.forEach(item => {
         item.style.display = expanded ? "block" : "none";
      });

      viewMoreBtn.textContent = expanded ? "View Less" : "View More";
   });

   /* ================= ARRIVAL MODAL ================= */
   document.querySelectorAll(".arrival-item").forEach(item => {

      item.addEventListener("click", () => {

         modal.style.display = "flex";

         modalImg.src = item.querySelector("img").src;
         modalTitle.innerText = item.querySelector("h3").innerText;
         modalPrice.innerText = item.querySelector("p").innerText;
      });

      item.addEventListener("dblclick", () => {
         const name = item.querySelector("h3").innerText;
         cart.push(name);
         alert(`🛒 ${name} added (${cart.length})`);
      });

   });

   /* ================= COLLECTION MODAL ================= */
   document.querySelectorAll(".collection-item").forEach(item => {

      item.addEventListener("click", () => {

         modal.style.display = "flex";

         modalImg.src = item.querySelector("img").src;
         modalTitle.innerText = item.querySelector("h3").innerText;
         modalPrice.innerText = item.querySelector(".price").innerText;
      });

   });

   /* ================= THEME SWITCH ================= */
   const themes = ["blue", "dark", "pink"];
   let currentTheme = localStorage.getItem("themeIndex") || 0;

   function applyTheme() {
      document.body.classList.remove(...themes);
      const theme = themes[currentTheme];
      document.body.classList.add(theme);

      const icons = { blue: "🔵", dark: "🌑", pink: "🌸" };
      themeToggle.textContent = icons[theme];

      localStorage.setItem("themeIndex", currentTheme);
   }

   themeToggle?.addEventListener("click", () => {
      currentTheme = (parseInt(currentTheme) + 1) % themes.length;
      applyTheme();
   });

   applyTheme();

   /* ================= SCROLL ================= */
   window.addEventListener("scroll", () => {

      header?.classList.toggle("sticky", window.scrollY > 10);

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (progressBar) {
         progressBar.style.width = (scrollTop / scrollHeight) * 100 + "%";
      }
   });

   /* ================= FILTER ================= */
   buttons.forEach(btn => {
      btn.addEventListener("click", () => {

         buttons.forEach(b => b.classList.remove("active"));
         btn.classList.add("active");

         const filter = btn.dataset.btn;

         document.querySelectorAll(".collection-item").forEach(item => {
            const type = item.dataset.item;
            item.style.display = (filter === "all" || filter === type) ? "" : "none";
         });
      });
   });

   /* ================= MOBILE MENU ================= */
   burger?.addEventListener("click", () => {
      menu.classList.toggle("active");

      const icon = burger.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
   });

   links.forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("active"));
   });

   document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
         menu.classList.remove("active");
      }
   });

   /* ================= SMOOTH SCROLL ================= */
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", (e) => {

         const target = document.querySelector(anchor.getAttribute("href"));
         if (!target) return;

         e.preventDefault();

         window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
         });
      });
   });

   /* ================= ACTIVE LINK ================= */
   const sections = document.querySelectorAll("section, main");

   window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 130;

      sections.forEach(section => {
         if (!section.id) return;

         const link = document.querySelector(`.menu a[href="#${section.id}"]`);

         if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
         ) {
            document.querySelectorAll(".menu a").forEach(a => a.classList.remove("active"));
            link?.classList.add("active");
         }
      });
   });

   window.dispatchEvent(new Event("scroll"));

   /* ================= MODAL CLOSE FIXED ================= */
   closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
   });

   modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
         closeModal();
      }
   });

   /* ================= ADD TO CART FIX ================= */
   addCartBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      cart.push(modalTitle.innerText);

      setTimeout(() => {
         alert(`Added 🛒 (${cart.length})`);
      }, 50);
   });

   /* ================= CONTACT FORM ================= */
   function showToast(msg, type = "success") {

      const toast = document.createElement("div");
      toast.textContent = msg;

      toast.style.position = "fixed";
      toast.style.bottom = "20px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.padding = "12px 18px";
      toast.style.borderRadius = "10px";
      toast.style.color = "#fff";
      toast.style.fontSize = "14px";
      toast.style.zIndex = "9999";
      toast.style.backdropFilter = "blur(10px)";
      toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
      toast.style.transition = "0.4s ease";

      toast.style.background =
         type === "error"
            ? "rgba(255,0,80,0.85)"
            : "rgba(0,180,255,0.85)";

      document.body.appendChild(toast);

      setTimeout(() => {
         toast.style.opacity = "0";
         toast.style.transform = "translateX(-50%) translateY(20px)";
      }, 2000);

      setTimeout(() => toast.remove(), 2500);
   }

   contactForm?.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("input[placeholder='Your Name']")?.value.trim();
      const email = contactForm.querySelector("input[placeholder='Your Email']")?.value.trim();
      const message = contactForm.querySelector("textarea")?.value.trim();

      if (!name || !email || !message) {
         showToast("⚠ Please fill all fields", "error");
         return;
      }

      if (!email.includes("@")) {
         showToast("⚠ Enter valid email", "error");
         return;
      }

      showToast("✅ Message sent successfully!");
      contactForm.reset();
   });

});