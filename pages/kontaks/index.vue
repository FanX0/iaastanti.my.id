<template>
  <div id="app">

    <section class="contact-section">
      <div class="container">
        <h1 class="section-title">Contact Us</h1>
        <p class="section-description">
          Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui Instagram atau WhatsApp.
        </p>

        <div class="contact-methods">
          <div class="contact-item">
            <a href="https://www.instagram.com/iaastanti_glowscare" target="_blank" class="contact-link">
              <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram" class="contact-icon"/>
              <span class="contact-text">@iaastanti_glowscare
              </span>
            </a>
          </div>

          <div class="contact-item">
            <a href="https://api.whatsapp.com/send?phone=6282159510535&text=Halo%20Admin" target="_blank" class="contact-link">
              <img src="https://img.icons8.com/fluent/48/000000/whatsapp.png" alt="WhatsApp" class="contact-icon"/>
              <span class="contact-text">+62 82159510535</span>
            </a>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  background: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 0;
}

.header-main {
  padding: 10px 0;
  background-color: #171405;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
}

.logo {
  font-size: 25px;
  font-weight: 700;
}

.contact-section {
  padding: 60px 0;
  background: #fff;
  text-align: center;
}

.section-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.section-description {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 20px;
  color: #555;
}

.contact-methods {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.contact-link {
  text-decoration: none;
  color: #333;
}

.contact-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 10px;
}

.contact-text {
  font-size: 18px;
  font-weight: 500;
}

.contact-link:hover .contact-text {
  color: #ac0800;
}

.footer-main {
  padding: 20px 0;
  background-color: #171405;
  color: #fff;
  text-align: center;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
