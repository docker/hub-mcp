# Contributing to Docker Hub MCP Server

Thank you for your interest in contributing to the Docker Hub Model Context Protocol (MCP) server! This document provides guidelines and instructions for contributing.

## Types of Contributions

### 1. New Tools

The repository contains reference tools, please try to keep consistency as much as possible.

- Check the [modelcontextprotocol.io](https://modelcontextprotocol.io) documentation
- Ensure your tool doesn't duplicate existing functionality
- Consider whether your tool would be generally useful to others
- Follow [security best practices](https://modelcontextprotocol.io/docs/concepts/transports#security-considerations) from the MCP documentation
- Ensure the [MCP sdk](https://github.com/modelcontextprotocol/typescript-sdk) does not already provide helpers/functions before creating custom code.
- Update [README.md](./README.md) with instructions and examples.

### 2. Improvements to Existing Tools

Enhancements to existing tools are welcome! This includes:

- Bug fixes
- Performance improvements
- New features/parameters
- Security enhancements

### 3. Documentation

Documentation improvements are always welcome:

- Fixing typos or unclear instructions
- Adding examples
- Improving setup instructions
- Adding troubleshooting guides

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/dockerhub-mcp.git
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/docker/hub-mcp.git
   ```
4. Create a branch:
   ```bash
   git checkout -b my-feature
   ```

## Development Guidelines

This section gives the experienced contributor some tips and guidelines.

### Pull requests are always welcome

Not sure if that typo is worth a pull request? Found a bug and know how to fix
it? Do it! We will appreciate it. Any significant change, like adding a backend,
should be documented as
[a GitHub issue](https://github.com/docker/hub-mcp/issues)
before anybody starts working on it.

We are always thrilled to receive pull requests. We do our best to process them
quickly. If your pull request is not accepted on the first try,
don't get discouraged!

### Talking to other Docker users and contributors

<table class="tg">
  <col width="45%">
  <col width="65%">
  <tr>
    <td>Community Slack</td>
    <td>
      The Docker Community has a dedicated Slack chat to discuss features and issues.  You can sign-up <a href="https://www.docker.com/community/" target="_blank">with this link</a>.
    </td>
  </tr>
  <tr>
    <td>Forums</td>
    <td>
      A public forum for users to discuss questions and explore current design patterns and
      best practices about Docker and related projects in the Docker Ecosystem. To participate,
      just log in with your Docker Hub account on <a href="https://forums.docker.com" target="_blank">https://forums.docker.com</a>.
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td>
      You can follow <a href="https://twitter.com/docker/" target="_blank">Docker's Twitter feed</a>
      to get updates on our products. You can also tweet us questions or just
      share blogs or stories.
    </td>
  </tr>
  <tr>
    <td>Stack Overflow</td>
    <td>
      Stack Overflow has over 17000 Docker questions listed. We regularly
      monitor <a href="https://stackoverflow.com/questions/tagged/docker" target="_blank">Docker questions</a>
      and so do many other knowledgeable Docker users.
    </td>
  </tr>
</table>

### Conventions

Fork the repository and make changes on your fork in a feature branch:

- If it's a bug fix branch, name it XXXX-something where XXXX is the number of
  the issue.
- If it's a feature branch, create an enhancement issue to announce
  your intentions, and name it XXXX-something where XXXX is the number of the
  issue.

Write clean code. Universally formatted code promotes ease of writing, reading,
and maintenance. Always run `npm run lint` and `npm run format:fix` before
committing your changes. Most editors have plug-ins helping reducing the time spent on fixing linting issues.

Pull request descriptions should be as clear as possible and include a reference
to all the issues that they address.

Commit messages must start with a capitalized and short summary (max. 50 chars)
written in the imperative, followed by an optional, more detailed explanatory
text which is separated from the summary by an empty line.

Code review comments may be added to your pull request. Discuss, then make the
suggested modifications and push additional commits to your feature branch. Post
a comment after pushing. New commits show up in the pull request automatically,
but the reviewers are notified only when you comment.

Pull requests must be cleanly rebased on top of the base branch without multiple branches
mixed into the PR.

**Git tip**: If your PR no longer merges cleanly, use `rebase main` in your
feature branch to update your pull request rather than `merge main`.

Before you make a pull request, squash your commits into logical units of work
using `git rebase -i` and `git push -f`. A logical unit of work is a consistent
set of patches that should be reviewed together: for example, upgrading the
version of a vendored dependency and taking advantage of its now available new
feature constitute two separate units of work. Implementing a new function and
calling it in another file constitute a single logical unit of work. The very
high majority of submissions should have a single commit, so if in doubt: squash
down to one.

After every commit, make sure to test tools behavior. Include documentation
changes in the same pull request so that a revert would remove all traces of
the feature or fix.

Include an issue reference like `Closes #XXXX` or `Fixes #XXXX` in the pull
request description that closes an issue. Including references automatically
closes the issue on a merge.

Please see the [Code Style](#code-style) for further guidelines.

### Sign your work

The sign-off is a simple line at the end of the explanation for the patch. Your
signature certifies that you wrote the patch or otherwise have the right to pass
it on as an open-source patch. The rules are pretty simple: if you can certify
the below (from [developercertificate.org](https://developercertificate.org/)):

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
660 York Street, Suite 102,
San Francisco, CA 94110 USA

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

Then you just add a line to every git commit message:

    Signed-off-by: Joe Smith <joe.smith@email.com>

Use your real name (sorry, no pseudonyms or anonymous contributions.)

If you set your `user.name` and `user.email` git configs, you can sign your
commit automatically with `git commit -s`.

## Docker community guidelines

We want to keep the Docker community awesome, growing and collaborative. We need
your help to keep it that way. To help with this we've come up with some general
guidelines for the community as a whole:

- Be nice: Be courteous, respectful and polite to fellow community members:
  no regional, racial, gender or other abuse will be tolerated. We like
  nice people way better than mean ones!

- Encourage diversity and participation: Make everyone in our community feel
  welcome, regardless of their background and the extent of their
  contributions, and do everything possible to encourage participation in
  our community.

- Keep it legal: Basically, don't get us in trouble. Share only content that
  you own, do not share private or sensitive information, and don't break
  the law.

- Stay on topic: Make sure that you are posting to the correct channel and
  avoid off-topic discussions. Remember when you update an issue or respond
  to an email you are potentially sending it to a large number of people. Please
  consider this before you update. Also, remember that nobody likes spam.

- Don't send emails to the maintainers: There's no need to send emails to the
  maintainers to ask them to investigate an issue or to take a look at a
  pull request. Instead of sending an email, GitHub mentions should be
  used to ping maintainers to review a pull request, a proposal or an
  issue.

### Code Style

- Follow the existing code style in the repository
- Include appropriate type definitions
- Add comments for complex logic
- Make sure to run linting (`npm run lint`)

### Documentation

- Document all configuration options if required
- Provide setup instructions if required
- Include usage examples

### Security

- Follow security best practices
- Implement proper input validation
- Handle errors appropriately
- Document security considerations

## Submitting Changes

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
2. Push to your fork:
   ```bash
   git push origin my-feature
   ```
3. Create a Pull Request through GitHub

### Pull Request Guidelines

- Thoroughly test your changes
- Fill out the [pull request template](.github/pull_request_template.md) completely
- Link any related issues
- Provide clear description of changes
- Include any necessary documentation updates
- Add screenshots from the MCP inspector or MCP clients if helpful
- List any breaking changes

## Community

- Participate in [GitHub Discussions](https://github.com/orgs/modelcontextprotocol/discussions)
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Questions?

- Check the [documentation](https://modelcontextprotocol.io)
- Ask in GitHub Discussions

Thank you for contributing to Docker Hub MCP Server!
