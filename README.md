# Delete Package Versions

This action deletes versions of a package from [GitHub Packages](https://github.com/features/packages).

### What It Can Do

* Delete old versions

# Usage

```yaml
- uses: the-guild-org/delete-package-versions@v1
  with:
  # The number of most recent versions to keep in registry.
  # Defaults to 2.
  keep-only: 3
```
