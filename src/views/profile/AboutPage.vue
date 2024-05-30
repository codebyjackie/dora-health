<template>
  <div class="about-container">
    <h1>About This App</h1>
    <p>Version: 1.0.0</p>
    <p>Developer: Your Company</p>
    <p>
      This application uses the Varela Round font, provided by The Varela Round
      Project Authors (https://github.com/alefalefalef/Varela-Round-Hebrew/),
      under the SIL Open Font License, Version 1.1. The full license can be
      found at:
      <a href="https://openfontlicense.org" target="_blank"
        >https://openfontlicense.org</a
      >.
    </p>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
}

p {
  margin-bottom: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}
</style>
