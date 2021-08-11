import {from, Observable, merge, throwError, of} from 'rxjs'
import {catchError, map, tap} from 'rxjs/operators'
import {GraphQlQueryResponse} from '@octokit/graphql/dist-types/types'
import {graphql} from './graphql'
import {PackageInfo} from '.'

export interface DeletePackageVersionMutationResponse {
  deletePackageVersion: {
    success: boolean
  }
}

const mutation = /* GraphQL */ `
  mutation deletePackageVersion($packageVersionId: String!) {
    deletePackageVersion(input: {packageVersionId: $packageVersionId}) {
      success
    }
  }
`

export function deletePackageVersion(
  packageVersionId: string,
  token: string
): Observable<boolean> {
  return from(
    graphql(token, mutation, {
      packageVersionId,
      headers: {
        Accept: 'application/vnd.github.package-deletes-preview+json'
      }
    }) as Promise<DeletePackageVersionMutationResponse>
  ).pipe(
    catchError((err: GraphQlQueryResponse<DeletePackageVersionMutationResponse>) => {
      const msg = 'delete version mutation failed.'
      return throwError(
        err.errors && err.errors.length > 0
          ? `${msg} ${err.errors[0].message}`
          : `${msg} verify input parameters are correct`
      )
    }),
    map(response => response.deletePackageVersion.success)
  )
}

export function deletePackageVersions(
  packageInfo: PackageInfo,
  keepOnly: number,
  token: string
): Observable<boolean> {
  if (packageInfo.versions.length <= keepOnly) {
    console.log(
      `${packageInfo.name} no version will be deleted (available versions: ${packageInfo.versions.length})`
    )
    return of(true)
  }

  const versionsToDelete = packageInfo.versions.slice(keepOnly)

  const deletes = versionsToDelete.map(node => {
    return deletePackageVersion(node.id, token).pipe(
      tap(result => {
        if (result) {
          console.log(`${packageInfo.name}@${node.version} deleted`)
        } else {
          console.log(`${packageInfo.name}@${node.version} NOT deleted`)
        }
      })
    )
  })

  return merge(...deletes)
}
