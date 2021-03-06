<template>
  <v-card class="pa-2">
    <v-card-title class="headline">Grading criteria</v-card-title>
    <v-dialog v-model="addingCategory" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline"> {{ categoryModel.id ? 'Update' : 'Add' }}grading category</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field-error v-model="categoryModel.name" error="name" label="Name"></v-text-field-error>
            <v-text-field-error
              v-model="categoryModel.points"
              error=""
              label="Points"
              type="number"
            ></v-text-field-error>
            <v-textarea v-model="categoryModel.description" label="Description"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" flat @click="saveAction">Save</v-btn>
          <v-btn color="warning" flat @click="resetAddCategory">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!gradingCategories" class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-list v-else>
      <template v-for="(category, idx) in gradingCategories">
        <v-hover :key="category.id">
          <v-list-tile slot-scope="{ hover }">
            <v-list-tile-avatar>{{ category.points }}</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ category.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ category.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-show="hover" class="icons">
              <v-btn icon @click="startAddSubcategory(category)"><v-icon color="primary">fa-plus</v-icon></v-btn>
              <v-btn icon @click="startEditCategory(category)"><v-icon color="secondary">fa-pencil-alt</v-icon></v-btn>
              <v-btn icon @click="deleteCategory(category.id)"><v-icon color="red">fa-trash</v-icon></v-btn>
              <UpDownButton
                @down="incrementOrder(gradingCategories, idx)"
                @up="decrementOrder(gradingCategories, idx)"
              ></UpDownButton>
            </v-list-tile-action>
          </v-list-tile>
        </v-hover>
        <template v-for="(subcategory, subIdx) in category.subcategories">
          <v-hover :key="subcategory.id">
            <v-list-tile slot-scope="{ hover }" class="ml-4">
              <v-list-tile-avatar>{{ subcategory.points }}</v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ subcategory.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ subcategory.description }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action v-show="hover" class="icons">
                <v-btn icon @click="startEditCategory(subcategory)">
                  <v-icon color="primary">fa-pencil-alt</v-icon>
                </v-btn>
                <v-btn icon @click="deleteCategory(subcategory.id)"><v-icon color="red">fa-trash</v-icon></v-btn>
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
      <v-btn class="ma-0" color="accent" flat @click="startAddRootCategoryModal">
        Add category
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UpDownButton from './UpDownButton'

export default {
  components: {
    UpDownButton
  },
  data() {
    return {
      dialog: false,
      addingCategory: false,
      categoryModel: {},
      targetForCategory: null,
      saveAction: null,
      gradingCategories: []
    }
  },
  computed: {
    totalPoints() {
      return this.categories.map(cat => cat.points).reduce((acc, current) => acc + current, 0)
    }
  },
  mounted() {
    this.loadGradingCategories()
  },
  created() {
    this.resetAddCategory()
  },
  methods: {
    async loadGradingCategories() {
      this.gradingCategories = await this.$axios.$get(this.$endpoint.gradingScheme.get())
    },
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
        .$post(this.$endpoint.gradingScheme.save(), this.categoryModel)
        .then(this.loadGradingCategories)
        .then(this.resetAddCategory)
    },
    updateCategory() {
      return this.$axios
        .$post(this.$endpoint.gradingScheme.update(this.categoryModel.id), this.categoryModel)
        .then(this.loadGradingCategories)
        .then(this.resetAddCategory)
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
      return this.$axios.$delete(this.$endpoint.gradingScheme.deleteCategory(id)).then(this.loadGradingCategories)
    },
    incrementOrder(categories, index) {
      if (index + 1 === categories.length) {
        return
      }
      const categoryId = categories[index].id
      // eslint-disable-next-line
      categories[index] = [categories[index + 1], (categories[index + 1] = categories[index])][0]

      return this.$axios.post(this.$endpoint.gradingScheme.increment(categoryId)).then(this.loadGradingCategories)
    },
    decrementOrder(categories, index) {
      if (index === 0) {
        return
      }
      const categoryId = categories[index].id
      // eslint-disable-next-line
      categories[index] = [categories[index - 1], (categories[index - 1] = categories[index])][0]

      return this.$axios.post(this.$endpoint.gradingScheme.decrement(categoryId)).then(this.loadGradingCategories)
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
