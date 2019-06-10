<template>
  <v-card class="pa-2">
    <table>
      <tbody>
        <tr>
          <td v-for="(category, i) in categories" :key="i" :colspan="1 + category.subcategories.length || 1">
            <span v-if="!category.editing" @click="enableEdit(category)">
              {{ category.name }}
            </span>
            <v-text-field
              v-else
              :ref="`category-${i}`"
              v-model="category.name"
              solo
              flat
              autofocus
              @focusout="stopEdit(category)"
              @keyup.enter="stopEdit(category)"
              @keyup.esc="cancelEdit(category)"
            ></v-text-field>
          </td>
          <td><v-icon @click="addCategory">fa-plus</v-icon></td>
          <td>Total points</td>
        </tr>
        <tr>
          <template v-for="(category, i) in categories">
            <td v-for="(subcategory, j) in category.subcategories" :key="`subcat-${i}-${j}`">
              <span v-if="!category.editing" @click="enableEdit(subcategory)">
                {{ subcategory.name }}
              </span>
              <v-text-field
                v-else
                :ref="`subcategory-${i}`"
                v-model="subcategory.name"
                solo
                flat
                autofocus
                @focusout="stopEdit(subcategory)"
                @keyup.enter="stopEdit(subcategory)"
                @keyup.esc="cancelEdit(subcategory)"
              ></v-text-field>
            </td>
            <td :key="`addsubcategory-${i}`">
              <v-icon @click="addSubCategory(category)">fa-plus</v-icon>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      categories: []
    }
  },
  methods: {
    addCategory() {
      this.categories.push({
        name: 'New categoryModel',
        oldName: 'New categoryModel',
        editing: true,
        points: 1,
        subcategories: []
      })
    },
    addSubCategory(category) {
      category.subcategories.push({
        name: 'New subcategory',
        oldName: 'New subcategory',
        editing: true,
        points: 1
      })
    },
    enableEdit(category) {
      category.editing = true
      category.oldName = category.name
    },
    stopEdit(category) {
      category.editing = false
    },
    cancelEdit(category) {
      category.name = category.oldName
      category.editing = false
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  column-width: fit-content;
}
</style>
