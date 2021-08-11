import { getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import { Input } from "./input";
import { Observable, throwError } from "rxjs";
import { deleteVersions } from "./delete";
import { catchError } from "rxjs/operators";

function getActionInput(): Input {
	return new Input({
		owner: context.repo.owner,
		repo: context.repo.repo,
		keepOnly: Number(getInput("keep-only")),
		token: getInput("token")
	});
}

function run(): Observable<boolean> {
	try {
		return deleteVersions(getActionInput()).pipe(
			catchError(err => throwError(err))
		);
	} catch (error) {
		return throwError(error.message);
	}
}

run().subscribe({
	error: err => {
		setFailed(err);
	}
});
