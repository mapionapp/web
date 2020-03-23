<template>
  <v-container>
    <router-link to="/">
      <v-btn @click="to = '/'" rounded color="primary" depressed dark>Zurück</v-btn>
    </router-link>
    <div class="d-flex justify-center">
      <img src="../assets/preview-gradient.png" alt="mapion" />
    </div>

    <h1>Impressum</h1>
    <h5 class="mb-3">Angaben gemäß § 5 TMG.</h5>
    <h4>Kontakt:</h4>
    <p class="mb-3">
      Timo Schwarzer<br />
      Helmholtzstr. 4<br />
      38114 Braunschweig<br />
      und <a href="https://github.com/wirvsvirus-27">weitere Autoren</a>.
    </p>
    <h4 class="mb-2">Haftungsausschluss</h4>
    <h5>Haftung für Inhalte</h5>
    <p class="mb-2">
      Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
      verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
      gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
      Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
      allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
      Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde
      ich diese Inhalte umgehend entfernen.
    </p>
    <h5>Haftung für Links</h5>
    <p class="mb-2">
      Mein Angebot enthält gegebenfalls Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe.
      Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
      stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
      der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung
      nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
      Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige
      Links umgehend entfernen.
    </p>
    <h5>Urheberrecht</h5>
    <p>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
      Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
      Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
      dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
      Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
      Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte
      Ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend
      entfernen.
    </p>
  </v-container>
</template>

<script>
  export default {
    name: 'imprint-page',
  }
</script>

<style lang="scss" scoped>
  img {
    max-width: 600px;
    width: 100%;
    height: 100%;
  }
</style>
