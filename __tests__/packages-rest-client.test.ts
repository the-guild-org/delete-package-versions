
import {PackagesRestClient} from '../src/packages-rest-client'
import {DeleteVersionParams, PackagesClientParams} from '../src/packages-client'
import {PackageType} from '../src/package-type'

describe('PackagesRestClient tests', () => {

  let client: PackagesRestClient

  beforeEach(() => {
    client = PackagesRestClient.create()
  })

  describe('deleteVersion tests', () => {

    test('deleteVersion validation fails when token is undefined', done => {

      client.deleteVersion(getDeleteVersionParams({token: undefined})).subscribe({
        error: e => {
          expect(e.message).toBe('missing token')
          done()
        }
      })
    })

    test('deleteVersion validation fails when token is empty string', done => {

      client.deleteVersion(getDeleteVersionParams({token: ''})).subscribe({
        error: e => {
          expect(e.message).toBe('missing token')
          done()
        }
      })
    })

    test('deleteVersion validation fails when packageOwner is undefined', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: undefined
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing packageOwner')
          done()
        }
      })
    })

    test('deleteVersion validation fails when packageOwner is empty string', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: ''
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing packageOwner')
          done()
        }
      })
    })

    test('deleteVersion validation fails when packageName is undefined', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: 'actions',
        packageName: undefined
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing packageName')
          done()
        }
      })
    })

    test('deleteVersion validation fails when packageName is empty string', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: 'actions',
        packageName: ''
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing packageName')
          done()
        }
      })
    })

    test('deleteVersion validation fails when packageType is undefined', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: 'actions',
        packageName: 'alpine',
        packageType: undefined
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing packageType')
          done()
        }
      })
    })

    test('deleteVersion validation fails when packageType is unknown', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: 'actions',
        packageName: 'alpine',
        packageType: PackageType.UNKNOWN
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing packageType')
          done()
        }
      })
    })

    test('deleteVersion validation fails when versionId is unknown', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: 'actions',
        packageName: 'alpine',
        packageType: PackageType.CONTAINER,
        versionId: undefined
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing versionId')
          done()
        }
      })
    })

    test('deleteVersion validation fails when versionId is 0', done => {

      const params = getDeleteVersionParams({
        token: '123',
        packageOwner: 'actions',
        packageName: 'alpine',
        packageType: PackageType.CONTAINER,
        versionId: 0
      })

      client.deleteVersion(params).subscribe({
        error: e => {
          expect(e.message).toBe('missing versionId')
          done()
        }
      })
    })

    test('deleteVersion succeeds for owner type user', done => {

      const params = getDeleteVersionParams({
        packageOwner: 'actions',
        packageName: 'alpine',
        packageType: PackageType.CONTAINER,
        versionId: 2
      })

      client.deleteVersion(params).subscribe({
        next: x => {
          console.log('next')
          console.log(x)
          // done()
        },
        error: e => {
          console.log('error')
          console.log(e)
          done()
        },
        complete: () => {
          console.log('complete')
          done()
        }
      })
    })
  })
})

function getParams<T extends PackagesClientParams>(params: Partial<T>): T {

  const defaults = {
    token: process.env.GITHUB_TOKEN || null,
    packageOwner: null,
    packageOwnerType: null,
    packageName: null,
    packageType: null
  }

  return {...defaults, ...params as Required<T>}
}

function getDeleteVersionParams(params: Partial<DeleteVersionParams>): DeleteVersionParams {
  return {...{versionId: null}, ...getParams(params)}
}
