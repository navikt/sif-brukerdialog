---
name: detox
description: Identify and reduce code bloat. Look for unnecessary complexity, redundant logic, and opportunities to streamline code. Include keywords that help agents identify relevant tasks.
---

Read the /code-review skill and use its guidelines when reviewing the target code (the user's specified scope, or the current project).
The code should stay slim. Find logic outside the main happy path, redundant code, and over-handled edge cases. Not every situation needs perfect handling; users misusing it is acceptable.
Output an overview listing files, their functions, and groups of logic inside each, graded by how useful they really are (A essential to the happy path; B clearly useful; C marginal; D little value, cut candidate; F dead, redundant). Group logic coarsely; give standout pieces their own line. Order within a function doesn't matter. The goal is to cut a lot of code without losing much value. Consider delegating groups of files to subagents.
Only read and think; don't edit or run anything.
Example:

```
SomeFile.cpp
  AddUserToDatabase
F   Checks if user is over 200 years old
A   Checks if user exists already
D   Checks if user was recently logged in and if that IP is the same as this IP
  SomeOtherFunction
  ...

TheNextFile.cpp
...

```