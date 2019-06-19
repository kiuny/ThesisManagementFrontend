<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md6 lg4>
        <v-card>
          <v-card-title class="justify-center flex-column">
            <span>Manage your domains of interest</span>
            <v-menu allow-overflow transition="transition slide-y" bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="interestModel"
                  single-line
                  label="Add domain of interest"
                  append-icon="fa-search-plus"
                  v-on="on"
                  @keypress.enter="addDomain(interestModel)"
                >
                </v-text-field>
              </template>
              <v-list v-if="items && items.length">
                <v-list-tile v-for="item in items" :key="item" @click="addDomain(item)">
                  <v-list-tile-title>{{ item }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <v-container fluid grid-list-sm>
              <v-chip v-for="interest in interests" :key="interest.id" close @input="removeDomain(interest)">
                {{ interest.name }}
              </v-chip>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'debounce-promise'
import endpoints from '../assets/script/endpoints'

export default {
  data() {
    return {
      interestModel: ''
    }
  },
  asyncComputed: {
    items() {
      if (this.interestModel.length <= 2) return []

      return this.searchWiki()
    },
    interests() {
      return this.$axios.$get(endpoints.domainsOfInterest.get(this.user.id))
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  mounted() {},
  methods: {
    searchWiki: debounce(function() {
      return this.$axios
        .$get(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${this.interestModel}`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(result => result[1])
    }, 500),
    addDomain(name) {
      this.interestModel = ''
      if (!name) return
      return this.$axios.$post(endpoints.domainsOfInterest.create, { name }).then(this.$asyncComputed.interests.update)
    },
    removeDomain(interest) {
      this.interests = this.interests.filter(int => int.id !== interest.id)
      this.$axios.$delete(endpoints.domainsOfInterest.delete(interest.id))
    }
  }
}
</script>

<style scoped></style>
