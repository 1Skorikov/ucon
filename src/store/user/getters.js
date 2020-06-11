export const me = state => state.user

export const faculties = state => {
  return state.user.university.faculties
}

export const specialties = (state, getters) => {
  const arrToConvert = getters.faculties.map(el => el.specialties)
  let newArr = []

  for (let i = 0; i < arrToConvert.length; i++) {
    newArr = newArr.concat(arrToConvert[i])
  }

  return newArr
}

export const groups = (state, getters) => {
  const arrToConvert = getters.specialties.map(el => el.groups)
  let newArr = []

  for (let i = 0; i < arrToConvert.length; i++) {
    newArr = newArr.concat(arrToConvert[i])
  }

  return newArr
}
