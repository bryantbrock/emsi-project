
// Only goes two levels deep - needs
// more engineering to recursively
// go as far down as necessary.

export const keysToCamelCase = data => {
  let result = {}

  Object.keys(data).map(key => {
    const arrayValues = key.split('_')
    const upperValues = arrayValues.splice(1).map(
      word => word[0].toUpperCase() + word.substr(1)
    )

    const newKey = [arrayValues[0], ...upperValues].join('')
    const value = data[key]

    if (typeof value === 'object') {
      result[newKey] = keysToCamelCase(value)
    } else {
      result[newKey] = value
    }
  })

  return result
}

export const withCommas = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");