import { Input } from "./input";
import { Observable, of, from, throwError } from "rxjs";
import {
	deletePackageVersions,
	getPackagesWithVersions,
	PackageInfo
} from "./version";
import { concatMap, switchMap } from "rxjs/operators";

export function getPackages(input: Input): Observable<PackageInfo> {
	if (input.hasOldestVersionQueryInfo()) {
		return getPackagesWithVersions(input.owner, input.repo, input.token).pipe(
			switchMap(packageInfoList => from(packageInfoList))
		);
	}

	return throwError(
		"Could not get packageVersionIds. Explicitly specify using the 'package-version-ids' input or provide the 'package-name' and 'num-old-versions-to-delete' inputs to dynamically retrieve oldest versions"
	);
}

export function deleteVersions(input: Input): Observable<boolean> {
	if (!input.token) {
		return throwError("No token found");
	}

	if (input.keepOnly <= 1) {
		console.log(
			"Number of old versions to delete input is 1 or less, no versions will be deleted"
		);
		return of(true);
	}

	return getPackages(input).pipe(
		concatMap(packageInfo =>
			deletePackageVersions(packageInfo, input.keepOnly, input.token)
		)
	);
}
