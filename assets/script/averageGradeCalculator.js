export function calculateAverageRow(gradingCategories, grades) {
  if (gradingCategories.length === 0) return 0

  const total = gradingCategories.reduce((acc, v) => {
    return acc + v.points
  }, 0)

  const score = gradingCategories
    .map(category => {
      if (category.subcategories && category.subcategories.length > 0) {
        return category.points * calculateAverageRow(category.subcategories, grades)
      }
      return category.points * (grades[category.id].value || 0)
    })
    .reduce((acc, v) => acc + v, 0)

  return score / total
}
