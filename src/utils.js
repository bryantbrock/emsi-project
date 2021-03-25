
export const keysToCamelCase = data => {
  let result = {}

  Object.keys(data).map(key => {
    const arrayValues = key.split('_')
    const upperValues = arrayValues.splice(1).map(
      word => word[0].toUpperCase() + word.substr(1)
    )

    const newKey = [arrayValues[0], ...upperValues].join('')
    const value = data[key]

    result[newKey] = value
  })

  return result
}