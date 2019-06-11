<template>
  <v-card class="pa-2">
    <v-dialog v-model="addingCategory" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline"> {{ categoryModel.id ? 'Update' : 'Add' }}grading category</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field ref="name" v-model="categoryModel.name" :error-messages="errors.name" label="Name">
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
          <v-btn color="success" flat @click="saveAction">
            Save
          </v-btn>
          <v-btn color="warning" flat @click="resetAddCategory">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!categories && $asyncComputed.categories.updating" class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-list v-if="categories">
      <template v-for="(category, idx) in categories">
        <v-hover :key="category.id">
          <v-list-tile slot-scope="{ hover }">
            <v-list-tile-avatar>
              <span v-text="showPointsCategory(category)"></span>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="category.name"></v-list-tile-title>
              <v-list-tile-sub-title
                v-if="!!category.description"
                v-text="category.description"
              ></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-show="hover" class="icons">
              <v-btn icon @click="startAddSubcategory(category)">
                <v-icon>fa-plus </v-icon>
              </v-btn>
              <v-btn icon @click="startEditCategory(category)">
                <v-icon>fa-pencil-alt</v-icon>
              </v-btn>
              <v-btn icon @click="deleteCategory(category.id, ...arguments)">
                <v-icon color="red">fa-trash</v-icon>
              </v-btn>
              <UpDownButton
                @down="incrementOrder(categories, idx)"
                @up="decrementOrder(categories, idx)"
              ></UpDownButton>
            </v-list-tile-action>
          </v-list-tile>
        </v-hover>
        <template v-for="(subcategory, subIdx) in category.subcategories">
          <v-hover :key="subcategory.id">
            <v-list-tile slot-scope="{ hover }" class="ml-4">
              <v-list-tile-avatar>
                <span v-text="showPointsSubcategory(category, subcategory)"></span>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ subcategory.name }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="!!subcategory.description">
                  {{ subcategory.description }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action v-show="hover" class="icons">
                <v-btn icon @click="startEditCategory(subcategory)">
                  <v-icon>fa-pencil-alt</v-icon>
                </v-btn>
                <v-btn icon @click="deleteCategory(subcategory.id, ...arguments)">
                  <v-icon color="red">fa-trash</v-icon>
                </v-btn>
                <UpDownButton
                  @up="decrementOrder(category.subcategories, subIdx)"
                  @down="incrementOrder(category.subcategories, subIdx)"
                ></UpDownButton>
              </v-list-tile-action>
            </v-list-tile>
          </v-hover>
        </template>
      </template>
    </v-list>

    <v-card-actions>
      <v-btn class="ma-0" flat @click="startAddRootCategoryModal">
        Add category
      </v-btn>
      <v-spacer></v-spacer>
      <v-checkbox v-model="percentages" color="secondary" class="point-checkbox" label="Show points as %"></v-checkbox>
      <v-checkbox
        v-model="fromTotal"
        color="secondary"
        class="point-checkbox"
        label="Show subcategory points as part of parent"
      ></v-checkbox>
    </v-card-actions>
  </v-card>
</template>

<script>
import endpoints from '../assets/script/endpoints'
import UpDownButton from './UpDownButton'
import errorHandlingMixin from './errorHandlingMixin'

export default {
  components: {
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
      percentages: false,
      fromTotal: false,
      dialog: false,
      addingCategory: false,
      categoryModel: {},
      targetForCategory: null,
      saveAction: null
    }
  },
  computed: {
    totalPoints() {
      return this.categories.map(cat => cat.points).reduce((acc, current) => acc + current, 0)
    }
  },
  created() {
    this.resetAddCategory()
  },
  asyncComputed: {
    categories() {
      return this.$axios.$get(endpoints.gradingScheme.getCategories(this.examSession)).catch(this.errorHandling)
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
      this.categoryModel = { ...category }
      this.addingCategory = true
      this.saveAction = this.updateCategory
    },
    addCategory() {
      return this.$axios
        .$post(endpoints.gradingScheme.save(this.examSession), this.categoryModel)
        .then(() => {
          this.clearErrors()
          this.resetAddCategory()
          return this.$asyncComputed.categories.update()
        })
        .catch(this.errorHandling)
    },
    updateCategory() {
      return this.$axios
        .$post(endpoints.gradingScheme.update(this.categoryModel.id), this.categoryModel)
        .then(() => {
          this.clearErrors()
          this.resetAddCategory()
          return this.$asyncComputed.categories.update()
        })
        .catch(this.errorHandling)
    },
    resetAddCategory() {
      this.addingCategory = false
      this.categoryModel = {
        id: null,
        parent_category_id: null,
        name: '',
        points: 1,
        description: ''
      }
      this.saveAction = () => {}
    },
    deleteCategory(id) {
      return this.$axios
        .$delete(endpoints.gradingScheme.deleteCategory(id))
        .then(() => {
          this.$asyncComputed.categories.update()
        })
        .catch(this.errorHandling)
    },
    incrementOrder(categories, index) {
      if (index + 1 === categories.length) {
        return
      }
      const categoryId = categories[index].id
      // eslint-disable-next-line
      categories[index] = [categories[index + 1], (categories[index + 1] = categories[index])][0]

      return this.$axios.post(endpoints.gradingScheme.increment(categoryId)).then(this.$asyncComputed.categories.update)
    },
    decrementOrder(categories, index) {
      return this.$axios
        .post(endpoints.gradingScheme.decrement(categories[index].id))
        .then(this.$asyncComputed.categories.update)
    },
    showPointsCategory(category) {
      if (category.subcategories.length > 0 && this.fromTotal) {
        return ''
      }
      if (this.percentages) {
        return Math.round((category.points / this.totalPoints) * 100 * 100) / 100 + 'p'
      }
      return category.points + 'p'
    },
    showPointsSubcategory(category, subcategory) {
      if (this.percentages) {
        const total = category.subcategories.map(cat => cat.points).reduce((acc, current) => acc + current, 0)

        return Math.round((subcategory.points / total) * 100 * 100) / 100 + 'p'
      }
      if (this.fromTotal) {
        const total = category.subcategories.map(cat => cat.points).reduce((acc, current) => acc + current, 0)

        return (category.points / this.totalPoints) * (subcategory.points / total)
      }
      return subcategory.points + 'p'
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
.icons > * {
  margin: 0;
}
.point-checkbox {
  flex-grow: 0;
  margin: 0 1em;
}
</style>
