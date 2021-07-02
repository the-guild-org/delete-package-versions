
import {OwnerType, toOwnerType} from '../src/owner-type'

describe('toOwnerType tests', () => {

  test('null input returns Unknown', () => {
    expect(toOwnerType(null as unknown as string)).toBe(OwnerType.UNKNOWN)
  })

  test('unsupported input returns Unknown', () => {
    expect(toOwnerType('club')).toBe(OwnerType.UNKNOWN)
  })

  test('user input returns User', () => {
    expect(toOwnerType('user')).toBe(OwnerType.USER)
  })

  test('User input returns User', () => {
    expect(toOwnerType('User')).toBe(OwnerType.USER)
  })

  test('org input returns Organization', () => {
    expect(toOwnerType('org')).toBe(OwnerType.ORG)
  })

  test('Org input returns Organization', () => {
    expect(toOwnerType('Org')).toBe(OwnerType.ORG)
  })

  test('organization input returns Organization', () => {
    expect(toOwnerType('organization')).toBe(OwnerType.ORG)
  })

  test('Organization input returns Organization', () => {
    expect(toOwnerType('Organization')).toBe(OwnerType.ORG)
  })
})