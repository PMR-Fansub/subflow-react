# Contributing to SubFlow React

Thank you for your interest in contributing to SubFlow React! We welcome and appreciate all contributions.

This document serves as a helper to get you started on contributing.

## Table of contents

- [Dependencies](#dependencies)
- [Issues](#issues)
- [Making changes](#making-changes)
- [Committing changes](#committing-changes)
- [Submitting a pull request](#submitting-a-pull-request)

## Dependencies

Latest stable versions are preferred.

- [Yarn 1.x](https://github.com/yarnpkg/yarn)

## Issues

### Create a new issue

If you spot a problem with this repo, [search if an issue already exists]. If a related issue doesn't exist, you can open a new issue.

[search if an issue already exists]: https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments

### Solve an issue

Scan through our [existing issues](https://github.com/PMR-Fansub/subflow-react/issues) to find one that interests you. If you find an issue to work on, you are welcome to open a pull request with a fix.

## Making changes

1. Clone the repository.

2. Install the required packages:

   ```bash
   yarn install
   ```

3. Create a working branch and start with your changes.

   - We recommend to name the working branch with a prefix (e.g., `fix-17439`, `docs_readme`, `feature/kanban`).

   You can start the development server locally:

   ```bash
   yarn start

## Committing changes

1. Stage your changes.

2. Make a commit:

   ```bash
   git commit
   ```

   This will trigger our three [committing-workflow hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#_committing_workflow_hooks).

   1. `pre-commit`

      Use [`lint-staged`] to lint and format staged files. The configuration can be found in [`package.json`](package.json).

      [`lint-staged`]: https://github.com/okonet/lint-staged

   2. `prepare-commit-msg`

      Use [`commitizen`] and [`@commitlint/cz-commitlint`] to write commit messages respecting [conventional commits] in an interactive process.

      [`commitizen`]: https://github.com/commitizen/cz-cli
      [`@commitlint/cz-commitlint`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/cz-commitlint
      [conventional commits]: https://www.conventionalcommits.org

   3. `commit-msg`

      Use [`@commitlint/cli`] to lint commit messages.

      [`@commitlint/cli`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/cli

   The configuration of `commitizen` and `@commitlint/cli` can be found in [`commitlint.config.js`](commitlint.config.js), based on [`@commitlint/config-conventional`].

   [`@commitlint/config-conventional`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional

## Submitting a pull request

When you've finished with the changes, create a pull request and request a review from an Admin (i.e., a member of @PMR-Fansub/admins). If you're also an Admin, you need to request a review from an Admin other than yourself.
