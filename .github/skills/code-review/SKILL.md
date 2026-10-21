---
name: code-review
description: Review code for simplification and reduction. Identify redundant logic, unnecessary complexity, and opportunities to streamline code. Include keywords that help agents identify relevant tasks.
---

Review the given path for simplification and reduction. The code is always used in a known way, so it doesn't need to handle every possible edge case.

Look for:
- Redundant logic, overly complex flows, and code that can be written more simply.
- Cases that can't actually occur and can be removed or simplified.
- Variables the logic doesn't need.
- Ifs that could be asserts.
- Functions or abstractions that only exist to avoid a little duplication; a bit of duplication is better.
- Comments that restate the code, narrate history or changes, or are obvious to a developer who knows the codebase. Keep a comment only where the code isn't understandable without it (a non-obvious why, hidden constraint, workaround), and keep it short.

Fewer lines of code is usually better.