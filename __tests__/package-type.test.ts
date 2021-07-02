
import {PackageType, toPackageType} from '../src/package-type'

describe('toPackageType tests', () => {

  test('null input returns unknown', () => {
    expect(toPackageType(null as unknown as string)).toBe(PackageType.UNKNOWN)
  })

  test('unsupported input returns unknown', () => {
    expect(toPackageType('golang')).toBe(PackageType.UNKNOWN)
  })

  test('npm input returns npm', () => {
    expect(toPackageType('npm')).toBe(PackageType.NPM)
  })

  test('NPM input returns npm', () => {
    expect(toPackageType('NPM')).toBe(PackageType.NPM)
  })

  test('maven input returns npm', () => {
    expect(toPackageType('maven')).toBe(PackageType.MAVEN)
  })

  test('MAVEN input returns npm', () => {
    expect(toPackageType('MAVEN')).toBe(PackageType.MAVEN)
  })

  test('rubygems input returns rubygems', () => {
    expect(toPackageType('rubygems')).toBe(PackageType.RUBYGEMS)
  })

  test('RUBYGEMS input returns rubygems', () => {
    expect(toPackageType('RUBYGEMS')).toBe(PackageType.RUBYGEMS)
  })

  test('nuget input returns nuget', () => {
    expect(toPackageType('nuget')).toBe(PackageType.NUGET)
  })

  test('NUGET input returns nuget', () => {
    expect(toPackageType('NUGET')).toBe(PackageType.NUGET)
  })

  test('docker input returns docker', () => {
    expect(toPackageType('docker')).toBe(PackageType.DOCKER)
  })

  test('DOCKER input returns docker', () => {
    expect(toPackageType('DOCKER')).toBe(PackageType.DOCKER)
  })

  test('container input returns container', () => {
    expect(toPackageType('container')).toBe(PackageType.CONTAINER)
  })

  test('CONTAINER input returns container', () => {
    expect(toPackageType('CONTAINER')).toBe(PackageType.CONTAINER)
  })
})
