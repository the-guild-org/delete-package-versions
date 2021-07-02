
export const enum OwnerType {
  UNKNOWN = 'Unknown',
  USER = 'User',
  ORG = 'Organization'
}

export function toOwnerType(type: string): OwnerType {

  if (!type) {
    return OwnerType.UNKNOWN
  }

  const stringToOwnerType: { [key: string]: OwnerType } = {
    'user': OwnerType.USER,
    'org': OwnerType.ORG,
    'organization': OwnerType.ORG
  } as const

  return stringToOwnerType[type.toLowerCase()] || OwnerType.UNKNOWN
}