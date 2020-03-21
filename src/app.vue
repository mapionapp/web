<template>
  <v-app>
    <v-content>
      <router-view />

      <v-dialog v-model="initialDialogOpen">
        <v-card class="pa-3" color="red darken-1" dark>
          <h1>Bevor Du loslegst...</h1>

          <div class="my-3">
            Dies ist eine Webseite, die jeder und jedem in unserer Gesellschaft den Zugang
            zu notwendigen Gütern in dieser schwierigen Zeit erleichtern soll.
            Diese Webseite ist <strong>kein</strong> Ort, um Hamsterkäufe zu planen.
          </div>

          <h3>
            Der Einzelhandel bleibt geöffnet und die Lieferketten werden so gut es geht
            aufrechterhalten. (<a class="white--text" target="_blank" href="https://www.bundesregierung.de/breg-de/aktuelles/vereinbarung-zwischen-der-bundesregierung-und-den-regierungschefinnen-und-regierungschefs-der-bundeslaender-angesichts-der-corona-epidemie-in-deutschland-1730934">Meldung der Bundesregierung</a>)
            Das funktioniert nur, wenn jede und jeder mithilft, indem er/sie nur in angemessenem Maße
            einkauft. Bitte denke beim Einkaufen auch an Menschen, denen es derzeit nur erschwert möglich
            ist, ihre Einkäufe zu tätigen.
          </h3>

          <div class="my-3">
            <a @click="initialDialogOpen = false" class="white--text">Klicke hier</a>, wenn du den Text gelesen hast.
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
      initialDialogOpen: true
    }),
  }
</script>
