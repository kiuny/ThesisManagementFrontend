export const state = () => ({
  previous: JSON.parse(sessionStorage.getItem('previous') || '[]')
})

export const mutations = {
  addPrevious(state, paper) {
    state.previous = state.previous.filter(item => item.id !== paper.id)
    state.previous.push({
      id: paper.id,
      name: paper.student.name
    })
    sessionStorage.setItem('previous', JSON.stringify(state.previous))
  }
}
