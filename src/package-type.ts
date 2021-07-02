
export const enum PackageType {
  UNKNOWN = 'unknown',
  NPM = 'npm',
  MAVEN = 'maven',
  RUBYGEMS = 'rubygems',
  NUGET = 'nuget',
  DOCKER = 'docker',
  CONTAINER = 'container'
}

export function toPackageType(type: string): PackageType {

  if (!type) {
    return PackageType.UNKNOWN
  }

  const stringToPackageType: { [key: string]: PackageType } = {
    'npm': PackageType.NPM,
    'maven': PackageType.MAVEN,
    'rubygems': PackageType.RUBYGEMS,
    'nuget': PackageType.NUGET,
    'docker': PackageType.DOCKER,
    'container': PackageType.CONTAINER
  } as const

  return stringToPackageType[type.toLowerCase()] || PackageType.UNKNOWN
}