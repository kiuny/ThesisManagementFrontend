<template>
  <v-card class="pa-2">
    <v-card-title>
      <span class="headline">Committees</span>
      <v-btn icon @click="newCommittee"><v-icon>fa-plus</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="randomAssign">Randomly distribute students</v-btn>
      <v-btn @click="lexicalAssign">Distribute students alphabetically</v-btn>
    </v-card-title>
    <v-container grid-list-sm fluid justify-space-around>
      <v-layout row wrap justify-space-around>
        <v-flex v-for="professor in availableProfessors" :key="professor.id" shrink>
          <drag class="drag" tag="v-chip" :transfer-data="professor">{{ professor.name }}</drag>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-md fluid>
      <v-layout row wrap justify-space-around>
        <v-flex v-for="(committee, i) in committees" :key="committee.id" shrink>
          <v-layout row>
            <v-flex class="committee-card">
              <h3>
                Committee {{ i + 1 }}
                <v-btn icon @click="deleteCommittee(committee)">
                  <v-icon color="error" small>fa-trash</v-icon>
                </v-btn>
              </h3>
              <v-list dense>
                <drop @drop="setLeader(committee, ...arguments)">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-subheader v-on="on">Committee leader</v-subheader>
                    </template>
                    <span>Drag the leader over here</span>
                  </v-tooltip>
                  <v-list-tile v-if="committee.leader">
                    <v-list-tile-content>
                      <v-chip small close @input="removeLeader(committee)">
                        {{ committee.leader.name }}
                      </v-chip>
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
                      <v-chip close @input="removeSecretary(committee)">
                        {{ committee.secretary.name }}
                      </v-chip>
                    </v-list-tile-content>
                  </v-list-tile>
                </drop>
              </v-list>
            </v-flex>
            <v-divider inset vertical></v-divider>
            <v-flex
              v-if="committee.assigned_students && committee.assigned_students.length > 0"
              class="committee-card"
              shrink
            >
              <div v-bar class="full-height">
                <v-list class="student-list">
                  <v-list-tile v-for="student in committee.assigned_students" :key="`student-${student.id}`">
                    <v-list-tile-content>
                      {{ student.name }}
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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
    ...mapGetters('professors', ['getProfessor']),

    usedProfessorsIds() {
      return new Set(
        this.committees
          .flatMap(comm => [comm.leader, ...comm.members, comm.secretary])
          .filter(m => m)
          .map(prof => +prof.id)
      )
    },
    availableProfessors() {
      return filter(this.professors, prof => {
        return !this.usedProfessorsIds.has(prof.id)
      })
    }
  },
  watch: {
    examSession: {
      handler() {
        this.committees = this.examSession.committees.map(comm => ({ ...comm }))
      },
      immediate: true
    }
  },
  created() {
    this.$store.dispatch('professors/loadProfessors')
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
      committee.members = filter(committee.members, member => member !== professor.id)
      this.saveCommittee(committee)
    },
    deleteCommittee(committee) {
      this.$axios.$delete(endpoints.committees.delete(committee.id))

      this.committees = filter(this.committees, comm => comm.id !== committee.id)
    },
    randomAssign() {
      return this.$axios
        .$post(endpoints.sessions.randomAssign(this.examSession.name))
        .then(() => this.$store.dispatch('examSessions/loadExamSession', this.examSession.name))
    },
    lexicalAssign() {
      return this.$axios
        .$post(endpoints.sessions.lexicalAssign(this.examSession.name))
        .then(() => this.$store.dispatch('examSessions/loadExamSession', this.examSession.name))
    }
  }
}
</script>

<style>
.committee-card {
  max-height: 350px;
  width: 250px;
}

.student-list .v-list__tile {
  height: 1.5em !important;
}

.full-height {
  height: 100%;
}
</style>
