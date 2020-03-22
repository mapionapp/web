<template>
  <v-app>
    <v-content>
      <router-view />

      <v-dialog v-model="initialDialogOpen" max-width="500px">
        <v-card class="pa-5" color="red darken-1" dark>
          <h1>Bevor Du loslegst...</h1>

          <div class="my-3">
            Dies ist eine Webseite, die jeder und jedem in unserer Gesellschaft den Zugang zu notwendigen Gütern in
            dieser schwierigen Zeit erleichtern soll. Diese Webseite ist <strong>kein</strong> Ort, um Hamsterkäufe zu
            planen.
          </div>

          <h3>
            Der Einzelhandel bleibt geöffnet und die Lieferketten bestmöglich aufrechterhalten. (<a
              class="white--text"
              target="_blank"
              href="https://www.bundesregierung.de/breg-de/aktuelles/vereinbarung-zwischen-der-bundesregierung-und-den-regierungschefinnen-und-regierungschefs-der-bundeslaender-angesichts-der-corona-epidemie-in-deutschland-1730934"
              >Meldung der Bundesregierung</a
            >)
          </h3>

          <div class="my-4">
            Das funktioniert nur, wenn
            <strong> jede und jeder mithilft</strong>, indem er/sie angemessenem Maße einkauft. Bitte denke beim
            Einkaufen auch Menschen, denen es derzeit nur erschwert möglich ist, ihre Einkäufe tätigen.
          </div>

          <div class="text-center">
            <v-btn @click="pressAcceptBtn" rounded color="primary" dark depressed>Gelesen und Akzeptiert</v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data: () => ({
      initialDialogOpen: true,
    }),
    methods: {
      pressAcceptBtn: function(event) {
        if (event) {
          this.initialDialogOpen = false
        }
      },
    },
  }
</script>
