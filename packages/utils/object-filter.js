export const getValue = function (item) {
  return typeof item === 'object' ? item.value : item
}

export const getKey = function (item) {
  return typeof item === 'object' ? item.key : item
}

export const getInlineDesc = function (item) {
  return typeof item === 'object' ? item.inlineDesc : ''
}

export const getLabel = function (list, value) {
  list = list || [];
  if (!list.length) {
    return value
  }
  if (typeof list[0] === 'string') {
    return value
  }
  const match = list.filter(function(one){
    return one.key === value
  })
  if (match.length) {
    return match[0].value || match[0].label
  }
  return value
}

export const getLabels = function (list, values) {
  return values.map(function (value) {
    return getLabel(list, value);
  })
}