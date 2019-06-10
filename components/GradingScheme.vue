<template>
  <v-card class="pa-2">
    <v-dialog v-model="addingCategory" max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ categoryModel.id ? 'Update' : 'Add' }}grading category
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              ref="name"
              v-model="categoryModel.name"
              :error-messages="errors.name"
              label="Name"
            >
            </v-text-field>
            <v-text-field
              ref="points"
              v-model="categoryModel.points"
              :error-messages="errors.points"
              label="Points"
              type="number"
            >
            </v-text-field>
            <v-textarea
              ref="description"
              v-model="categoryModel.description"
              :error-messages="errors.description"
              label="Description"
            >
            </v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <AsyncButton color="success" flat @click="saveAction">
            Save
          </AsyncButton>
          <v-btn color="warning" flat @click="resetAddCategory">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="$asyncComputed.categories.updating" class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-list v-else>
      <template v-for="(category, idx) in categories">
        <v-list-group
          v-if="category.subcategories && category.subcategories.length > 0"
          :key="category.id"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="!!category.description">
                  {{ category.description }}
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click="startAddSubcategory(category)">
                  <v-icon>fa-plus</v-icon>
                </v-btn>
                <AsyncButton
                  icon
                  @click="deleteCategory(categories, idx, ...argument)"
                >
                  <v-icon color="red">fa-trash</v-icon>
                </AsyncButton>
                <UpDownButton
                  @down="incrementOrder(category)"
                  @up="decrementOrder(category)"
                ></UpDownButton>
              </v-list-tile-action>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="subcategory in categories.subcategories"
            :key="subcategory.id"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ category.name }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="!!category.description">
                {{ category.description }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="startEditCategory(subcategory)">
                <v-icon>fa-pencil-alt</v-icon>
              </v-btn>

              <AsyncButton
                icon
                @click="deleteCategory(subcategory.id, ...arguments)"
              >
                <v-icon color="red">fa-trash</v-icon>
              </AsyncButton>
              <UpDownButton
                @up="decrementOrder(subcategory)"
                @down="incrementOrder(subcategory)"
              ></UpDownButton>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else :key="category.id">
          <v-list-tile-content>
            <v-list-tile-title v-text="category.name"></v-list-tile-title>
            <v-list-tile-sub-title
              v-if="!!category.description"
              v-text="category.description"
            ></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action class="icons">
            <v-btn icon @click="startAddSubcategory(category)">
              <v-icon>fa-plus </v-icon>
            </v-btn>
            <v-btn icon @click="startEditCategory(category)">
              <v-icon>fa-pencil-alt</v-icon>
            </v-btn>
            <AsyncButton
              icon
              @click="deleteCategory(category.id, ...arguments)"
            >
              <v-icon color="red">fa-trash</v-icon>
            </AsyncButton>
            <UpDownButton
              @down="incrementOrder(category)"
              @up="decrementOrder(category)"
            ></UpDownButton>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>

    <v-btn class="ma-0" flat small @click="startAddRootCategoryModal">
      Add category
    </v-btn>
  </v-card>
</template>

<script>
import endpoints from '../assets/script/endpoints'
import UpDownButton from './UpDownButton'
import errorHandlingMixin from './errorHandlingMixin'
import AsyncButton from './AsyncButton'

export default {
  components: {
    AsyncButton,
    UpDownButton
  },
  mixins: [errorHandlingMixin],
  props: {
    examSession: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      addingCategory: false,
      categoryModel: {},
      targetForCategory: null,
      saveAction: null
    }
  },
  created() {
    this.resetAddCategory()
  },
  asyncComputed: {
    categories() {
      return this.$axios
        .$get(endpoints.gradingScheme.getCategories(this.examSession))
        .catch(this.errorHandling)
    }
  },
  methods: {
    startAddRootCategoryModal() {
      this.saveAction = this.addCategory
      this.addingCategory = true
    },
    startAddSubcategory(category) {
      this.categoryModel.parent_category_id = category.id
      this.saveAction = this.addCategory
      this.addingCategory = true
    },
    startEditCategory(category) {
      this.categoryModel = category
      this.addingCategory = true
      this.saveAction = this.updateCategory
    },
    addCategory(done) {
      return this.$axios
        .$post(
          endpoints.gradingScheme.save(this.examSession),
          this.categoryModel
        )
        .then(() => {
          this.clearErrors()
          this.resetAddCategory()
          return this.$asyncComputed.categories.update()
        })
        .then(done)
        .catch(this.errorHandling)
    },
    updateCategory(done) {
      return this.$axios
        .$post(
          endpoints.gradingScheme.update(this.categoryModel.id),
          this.categoryModel
        )
        .then(() => {
          this.clearErrors()
          this.resetAddCategory()
          return this.$asyncComputed.categories.update()
        })
        .then(done)
        .catch(this.errorHandling)
    },
    resetAddCategory() {
      this.addingCategory = false
      this.categoryModel = {
        id: null,
        parent_category_id: null,
        name: '',
        points: 0,
        description: ''
      }
      this.saveAction = () => {}
    },
    deleteCategory(id, done) {
      return this.$axios
        .$delete(endpoints.gradingScheme.deleteCategory(id))
        .then(this.$asyncComputed.categories.update)
        .then(done)
        .catch(this.errorHandling)
    },
    incrementOrder(category) {
      return this.$axios
        .post(endpoints.gradingScheme.increment(category.id))
        .then(this.$asyncComputed.categories.update)
    },
    decrementOrder(category) {
      return this.$axios
        .post(endpoints.gradingScheme.decrement(category.id))
        .then(this.$asyncComputed.categories.update)
    }
  }
}
</script>

<style scoped>
.icons {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
