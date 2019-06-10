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
          <v-btn color="success" flat @click="saveAction">
            Save
          </v-btn>
          <v-btn color="warning" flat @click="resetAddCategory">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      v-if="!categories && $asyncComputed.categories.updating"
      class="text-xs-center"
    >
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-list v-if="categories">
      <template v-for="(category, idx) in categories">
        <v-hover :key="category.id">
          <v-list-tile slot-scope="{ hover }" avatar>
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
              <v-list-tile-content>
                <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="!!category.description">
                  {{ category.description }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action v-show="hover" class="icons">
                <v-btn icon @click="startEditCategory(subcategory)">
                  <v-icon>fa-pencil-alt</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="deleteCategory(subcategory.id, ...arguments)"
                >
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

    <v-btn class="ma-0" flat small @click="startAddRootCategoryModal">
      Add category
    </v-btn>
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
      this.categoryModel = { ...category }
      this.addingCategory = true
      this.saveAction = this.updateCategory
    },
    addCategory() {
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
        .catch(this.errorHandling)
    },
    updateCategory() {
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
      categories[index] = [categories[index+1], categories[index+1] = categories[index]][0]

      return this.$axios
        .post(endpoints.gradingScheme.increment(categoryId))
        .then(this.$asyncComputed.categories.update)
    },
    decrementOrder(categories, index) {
      return this.$axios
        .post(endpoints.gradingScheme.decrement(categories[index].id))
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
.icons > * {
  margin: 0;
}
</style>
