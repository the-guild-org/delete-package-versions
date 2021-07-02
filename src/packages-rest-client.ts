import {DeleteVersionParams, PackagesClient, PackagesClientParams} from './packages-client'
import {from, Observable, of} from 'rxjs'
import {OwnerType} from './owner-type'
import {PackageType} from './package-type'
import {concatMap} from 'rxjs/operators'
import {getOctokit} from '@actions/github'
import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'

export class PackagesRestClient implements PackagesClient {

  deleteVersion(params: DeleteVersionParams): Observable<RestEndpointMethodTypes["users"]["getByUsername"]["response"]> {

    return PackagesRestClient.validateDeleteVersionParams(params).pipe(
      concatMap(validatedParams => {
        console.log(`token: ${validatedParams.token}`)
        const octokit = getOctokit(validatedParams.token)
        return from(octokit.rest.users.getByUsername({
          username: 'trent-j'
        }))
      })
      // concatMap(() => of(true))
    )
  }

  static create(): PackagesRestClient {
    return new PackagesRestClient()
  }

  private static validateParams<T extends PackagesClientParams>(params: T): Observable<T> {

    return new Observable<T>(subscriber => {

      const defaultParams = {
        packageOwnerType: OwnerType.UNKNOWN,
        packageType: PackageType.UNKNOWN
      }

      const mergedParams = {...defaultParams, ...params}

      if (!mergedParams.token) {
        subscriber.error(new Error('missing token'))
      }

      if (!mergedParams.packageOwner) {
        subscriber.error(new Error('missing packageOwner'))
      }

      if (!mergedParams.packageName) {
        subscriber.error(new Error('missing packageName'))
      }

      if (!mergedParams.packageType || mergedParams.packageType === PackageType.UNKNOWN) {
        subscriber.error(new Error('missing packageType'))
      }

      subscriber.next(mergedParams)
      subscriber.complete()
    })
  }

  private static validateDeleteVersionParams(params: DeleteVersionParams): Observable<DeleteVersionParams> {

    return PackagesRestClient.validateParams(params).pipe(
      concatMap(p => new Observable<DeleteVersionParams>(subscriber => {

        if (!p.versionId || p.versionId === 0) {
          subscriber.error(new Error('missing versionId'))
        }

        subscriber.next(params)
        subscriber.complete()
      }))
    )
  }
}


