type TruncateOptions = {
  length: number
  omission: string
}

export function truncate(str: string, options: TruncateOptions) {
  const { length, omission } = options
  if (str.length <= length) return str
  return str.slice(0, length - omission.length) + omission
}
