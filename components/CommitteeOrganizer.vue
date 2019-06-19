<template>
  <v-card class="pa-2">
    <v-card-title>
      <span class="headline">Committees</span>
      <v-btn icon @click="newCommittee"><v-icon>fa-plus</v-icon></v-btn>
    </v-card-title>
    <v-container grid-list-sm fluid>
      <v-layout row wrap>
        <v-flex v-for="professor in availableProfessors" :key="professor.id">
          <drag class="drag" tag="v-chip" :transfer-data="professor">{{ professor.name }}</drag>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-sm fluid>
      <v-layout row wrap>
        <v-flex v-for="(committee, i) in committees" :key="committee.id" shrink>
          <h3>
            Committee {{ i + 1 }}
            <v-btn icon @click="deleteCommittee(committee)">
              <v-icon color="error" small>fa-trash</v-icon>
            </v-btn>
          </h3>
          <h3></h3>
          <v-list subheader>
            <drop @drop="setLeader(committee, ...arguments)">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-subheader v-on="on">Committee leader</v-subheader>
                </template>
                <span>Drag the leader over here</span>
              </v-tooltip>
              <v-list-tile v-if="committee.leader">
                <v-list-tile-content>
                  <v-chip close @input="removeLeader(committee)">{{ committee.leader.name }}</v-chip>
                </v-list-tile-content>
              </v-list-tile>
            </drop>

            <v-divider></v-divider>

            <drop @drop="addMember(committee, ...arguments)">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-subheader v-on="on">Committee members</v-subheader>
                </template>
                <span>Drag the members over here</span>
              </v-tooltip>
              <v-list-tile v-for="member in committee.members" :key="member.id">
                <v-list-tile-content>
                  <v-chip close @input="removeMember(committee, member)">{{ member.name }}</v-chip>
                </v-list-tile-content>
              </v-list-tile>
            </drop>

            <v-divider></v-divider>

            <drop @drop="setSecretary(committee, ...arguments)">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-subheader v-on="on">Committee secretary</v-subheader>
                </template>
                <span>Drag the secretary over here</span>
              </v-tooltip>
              <v-list-tile v-if="committee.secretary">
                <v-list-tile-content>
                  <v-chip close @input="removeSecretary(committee)">{{ committee.secretary.name }}</v-chip>
                </v-list-tile-content>
              </v-list-tile>
            </drop>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import flatMap from 'lodash/flatMap'
import map from 'lodash/map'
import filter from 'lodash/filter'
import endpoints from '../assets/script/endpoints'
export default {
  props: {
    examSession: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      committees: []
    }
  },
  computed: {
    ...mapState('professors', ['professors']),

    usedProfessorsIds() {
      return new Set(
        map(
          filter(flatMap(this.committees, committee => [committee.leader, ...committee.members, committee.secretary])),
          prof => prof.id
        )
      )
    },
    availableProfessors() {
      return filter(this.professors, prof => !this.usedProfessorsIds.has(prof.id))
    }
  },
  async created() {
    await this.$store.dispatch('professors/loadProfessors')
    this.committees = map(this.examSession.committees, committee => {
      const members = []
      if (committee.member1_id) members.push(this.professors[committee.member1_id])
      if (committee.member2_id) members.push(this.professors[committee.member2_id])

      return {
        id: committee.id,
        leader: committee.leader_id ? this.professors[committee.leader_id] : null,
        members: members,
        secretary: committee.secretary_id ? this.professors[committee.secretary_id] : null
      }
    })
  },
  methods: {
    saveCommittee(committee) {
      return this.$axios.$post(endpoints.committees.update(committee.id), {
        leader_id: committee.leader ? committee.leader.id : null,
        member1_id: committee.members.length > 0 ? committee.members[0].id : null,
        member2_id: committee.members.length > 1 ? committee.members[1].id : null,
        secretary_id: committee.secretary ? committee.secretary.id : null
      })
    },
    async newCommittee() {
      const comm = await this.$axios.$post(endpoints.committees.create(this.examSession.name))

      this.committees.push({
        id: comm.id,
        leader: null,
        members: [],
        secretary: null
      })
    },
    setLeader(committee, professor) {
      committee.leader = professor
      this.saveCommittee(committee)
    },
    setSecretary(committee, professor) {
      committee.secretary = professor
      this.saveCommittee(committee)
    },
    addMember(committee, professor) {
      committee.members.push(professor)
      if (committee.members.length === 3) {
        this.$delete(committee.members, 0)
      }
      this.saveCommittee(committee)
    },
    removeLeader(committee) {
      committee.leader = null
      this.saveCommittee(committee)
    },
    removeSecretary(committee) {
      committee.secretary = null
      this.saveCommittee(committee)
    },
    removeMember(committee, professor) {
      committee.members = filter(committee.members, member => member.id !== professor.id)
      this.saveCommittee(committee)
    },
    deleteCommittee(committee) {
      this.$axios.$delete(endpoints.committees.delete(committee.id))

      this.committees = filter(this.committees, comm => comm.id !== committee.id)
    }
  }
}
</script>

<style scoped></style>
