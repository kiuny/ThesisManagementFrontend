<template>
  <v-dialog v-model="open" max-width="1200">
    <template v-slot:activator="{ on }">
      <v-btn v-bind="$attrs" v-on="on">Leave final review</v-btn>
    </template>
    <v-card class="pa-5">
      <v-card-title>
        <span class="display-2">Final review for {{ student.name }}</span>
      </v-card-title>
      <v-layout column>
        <span class="title">Evaluare generală</span>
        <v-radio-group v-model="finalReview.overall" row>
          <v-radio label="Satisfăcător" value="1"></v-radio>
          <v-radio label="Bine" value="2"></v-radio>
          <v-radio label="Foarte bine" value="3"></v-radio>
          <v-radio label="Excelent" value="4"></v-radio>
        </v-radio-group>
        <span class="title">Recomandare notă</span>
        <v-radio-group v-model="finalReview.grade_recommendation" row>
          <v-radio label="5-6" value="1"></v-radio>
          <v-radio label="7-8" value="2"></v-radio>
          <v-radio label="9-10" value="3"></v-radio>
        </v-radio-group>
        <span class="title mb-3">Studiul domeniului lucrării</span>
        <ul>
          <li>
            <span class="subtitle">Structură (concordanța cu titlul)</span>
            <v-radio-group v-model="finalReview.structure" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
          <li>
            <span class="subtitle">Aspecte originale (articol, publicaţie, comunicare, etc.)</span>
            <v-radio-group v-model="finalReview.originality" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
          <li>
            <span class="subtitle">Modul de sintetizare a rezultatelor din literatură</span>
            <v-radio-group v-model="finalReview.literature_results" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
          <li>
            <span class="subtitle">Bibliografie relevantă și referințe în text</span>
            <v-radio-group v-model="finalReview.references" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
          <li>
            <span class="subtitle">Formă, mod redactare, stil</span>
            <v-radio-group v-model="finalReview.form" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
        </ul>
        <span class="title mb-3">Rezultate experimentale relevante</span>
        <ul>
          <li>
            <span class="subtitle">Analiza rezultatelor</span>
            <v-radio-group v-model="finalReview.result_analysis" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
          <li>
            <span class="subtitle">Mod de prezentare rezultate (tabele, grafice, etc.)</span>
            <v-radio-group v-model="finalReview.result_presentation" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
        </ul>

        <span class="title mb-3">Aplicaţia practică</span>
        <ul>
          <li>
            <span class="subtitle">Complexitatea aplicației soft</span>
            <v-radio-group v-model="finalReview.app_complexity" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
          </li>
          <li>
            <span class="subtitle">Calitatea aplicației soft</span>
            <v-radio-group v-model="finalReview.app_quality" row>
              <v-radio label="Nesatisfăcător" value="1"></v-radio>
              <v-radio label="Satisfăcător" value="2"></v-radio>
              <v-radio label="Bine" value="3"></v-radio>
              <v-radio label="Foarte bine" value="4"></v-radio>
              <v-radio label="Excelent" value="5"></v-radio>
            </v-radio-group>
            <ul style="list-style-type: disc">
              <li>
                Ilustrarea (în lucrarea scrisă) a etapelor din ciclul de viaţă al aplicaţiei (analiză, proiectare,
                testare)
              </li>
              <li>Implementare</li>
              <li>
                După specificul aplicaţiei, se vor considera următoarele aspecte: validare, securitate, folosirea
                principiilor de dezvoltare, folosirea şabloanelor de proiectare, etc
              </li>
            </ul>
          </li>
        </ul>
        <span class="title mb-3">Alte observatii</span>
        <v-textarea v-model="finalReview.observations" solo outline clearable> </v-textarea>
      </v-layout>
      <v-card-actions>
        <v-btn flat color="success" @click="save">Save</v-btn>
        <v-btn flat color="warning" @click="open = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="info" @click="download">Download</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="error" @click="deleteReview">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import endpoints from '../assets/script/endpoints'

export default {
  props: {
    student: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false,
      finalReview: {
        overall: null,
        grade_recommendation: null,
        structure: null,
        originality: null,
        literature_results: null,
        references: null,
        form: null,
        result_analysis: null,
        result_presentation: null,
        app_complexity: null,
        app_quality: null,
        observations: null
      }
    }
  },
  watch: {
    async open() {
      this.finalReview = (await this.$axios.$get(endpoints.finalReview.get(this.student.id))) || this.finalReview
    }
  },
  methods: {
    async save() {
      await this.$axios.$post(endpoints.finalReview.update(this.student.id), this.finalReview)
    },
    async download() {
      if (!this.finalReview.id) {
        return
      }
      const data = await this.$axios.$get(endpoints.finalReview.download(this.student.id), {
        responseType: 'blob'
      })
      const downloadUrl = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', `${this.student.name}-Review.pdf`)
      link.click()
    },
    async deleteReview() {
      await this.$axios.$delete(endpoints.finalReview.delete(this.student.id))
      for (const key in this.finalReview) {
        this.$set(this.finalReview, key, null)
      }
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
.v-input--radio-group {
  margin-top: 0;
  margin-left: 2em;
}
</style>
