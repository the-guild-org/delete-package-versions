
import {OwnerType, toOwnerType} from '../src/owner-type'

describe('toOwnerType tests', () => {

  test('null input returns unknown', () => {
    expect(toOwnerType(null as unknown as string)).toBe(OwnerType.UNKNOWN)
  })

  test('unsupported input returns unknown', () => {
    expect(toOwnerType('club')).toBe(OwnerType.UNKNOWN)
  })

  test('user input returns user', () => {
    expect(toOwnerType('user')).toBe(OwnerType.USER)
  })

  test('User input returns user', () => {
    expect(toOwnerType('User')).toBe(OwnerType.USER)
  })

  test('org input returns organization', () => {
    expect(toOwnerType('org')).toBe(OwnerType.ORG)
  })

  test('Org input returns organization', () => {
    expect(toOwnerType('Org')).toBe(OwnerType.ORG)
  })

  test('organization input returns organization', () => {
    expect(toOwnerType('organization')).toBe(OwnerType.ORG)
  })

  test('Organization input returns organization', () => {
    expect(toOwnerType('Organization')).toBe(OwnerType.ORG)
  })
})