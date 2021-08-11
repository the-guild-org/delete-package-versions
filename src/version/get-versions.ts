import {GraphQlQueryResponse} from '@octokit/graphql/dist-types/types'
import {Observable, from, throwError} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {graphql} from './graphql'

export interface VersionInfo {
  id: string
  version: string
}

export interface PackageInfo {
  name: string
  versions: VersionInfo[]
}

export interface GetVersionsQueryResponse {
  repository: {
    packages: {
      edges: {
        node: {
          name: string
          versions: {
            edges: {node: VersionInfo}[]
          }
        }
      }[]
    }
  }
}

const query = /* GraphQL */ `
  query getVersions(
    $owner: String!
    $repo: String!
    $packagesLimit: Int!
    $versionsLimit: Int!
  ) {
    repository(owner: $owner, name: $repo) {
      packages(first: $packagesLimit) {
        edges {
          node {
            name
            versions(last: $versionsLimit) {
              edges {
                node {
                  id
                  version
                }
              }
            }
          }
        }
      }
    }
  }
`

export function queryForAllVersions(
  owner: string,
  repo: string,
  token: string
): Observable<GetVersionsQueryResponse> {
  return from(
    graphql(token, query, {
      owner,
      repo,
      packagesLimit: 20,
      versionsLimit: 100,
      headers: {
        Accept: 'application/vnd.github.packages-preview+json'
      }
    }) as Promise<GetVersionsQueryResponse>
  ).pipe(
    catchError((err: GraphQlQueryResponse) => {
      const msg = 'query for oldest version failed.'
      return throwError(
        err.errors && err.errors.length > 0
          ? `${msg} ${err.errors[0].message}`
          : `${msg} verify input parameters are correct`
      )
    })
  )
}

export function getPackagesWithVersions(
  owner: string,
  repo: string,
  token: string
): Observable<PackageInfo[]> {
  return queryForAllVersions(owner, repo, token).pipe(
    map(result => {
      return result.repository.packages.edges.map(edge => {
        return {
          name: edge.node.name,
          versions: edge.node.versions.edges.map(value => ({
            id: value.node.id,
            version: value.node.version
          }))
        }
      })
    })
  )
}
