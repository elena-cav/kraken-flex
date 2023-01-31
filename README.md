# Challenge 1 - "Control C, Control V"

Welcome back! Here's a fun little string manipulation challenge to kick things off. The challenge is to analyse these strings for any instances of [CTRL+C] and [CTRL+V]. When [CTRL+C] is encountered, the contents of the string before it should be 'copied' to a clipboard. Upon any instance of [CTRL+V] in the string, this clipboard should be pasted in its place. If [CTRL+V] is encountered before any corresponding [CTRL+C] then it should simply paste nothing.

## Rewards:

- five: Points are awarded for a working algorithm as described above
- three: Further points are awarded for supporting [CTRL+X], which should remove the preceding text before copying it to the clipboard
- two: Further points are awarded for validating your solution with a collection of unit tests

Example:
For this example input:
challenge("the first[CTRL+C] Coding Challenge was [CTRL+V] string manipulation task")
Your solution might output:
"the first Coding Challenge was the first string manipulation task"
