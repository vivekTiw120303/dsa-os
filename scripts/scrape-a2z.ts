import fs from "fs";
import path from "path";

// 1. Paste your raw text data here
const rawData = `Topic Name: Step 1 - Learn the basics
Count Digits: https://www.geeksforgeeks.org/problems/count-digits5716/1
Reverse a Number: https://leetcode.com/problems/reverse-integer/
Check Palindrome: https://leetcode.com/problems/palindrome-number/
GCD Or HCF: https://www.geeksforgeeks.org/problems/lcm-and-gcd4551/1
Armstrong Numbers: https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1
Print all Divisors: https://www.geeksforgeeks.org/problems/sum-of-all-divisors-from-1-to-n4738/1
Check for Prime: https://www.geeksforgeeks.org/problems/prime-number2314/1
Topic Name: Step 2 - Learn Important Sorting Techniques
Selection Sort: https://www.geeksforgeeks.org/problems/selection-sort/1
Bubble Sort: https://www.geeksforgeeks.org/problems/bubble-sort/1
Insertion Sort: https://www.geeksforgeeks.org/problems/insertion-sort/1
Merge Sort: https://www.geeksforgeeks.org/problems/merge-sort/1
Quick Sort: https://www.geeksforgeeks.org/problems/quick-sort/1
Topic Name: Step 3 - Arrays
Largest Element in an Array: https://www.geeksforgeeks.org/problems/largest-element-in-array/1
Second Largest Element in an Array: https://www.geeksforgeeks.org/problems/second-largest-element-in-array/1
Check if Array Is Sorted and Rotated: https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/
Remove Duplicates from Sorted Array: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
Rotate Array: https://leetcode.com/problems/rotate-array/
Move Zeroes: https://leetcode.com/problems/move-zeroes/
Linear Search: https://www.geeksforgeeks.org/problems/who-will-win-1587115621/1
Union of Two Sorted Arrays: https://www.geeksforgeeks.org/problems/union-of-two-sorted-arrays/1
Missing Number: https://leetcode.com/problems/missing-number/
Max Consecutive Ones: https://leetcode.com/problems/max-consecutive-ones/
Single Number: https://leetcode.com/problems/single-number/
Two Sum: https://leetcode.com/problems/two-sum/
Sort Colors: https://leetcode.com/problems/sort-colors/
Majority Element: https://leetcode.com/problems/majority-element/
Maximum Subarray: https://leetcode.com/problems/maximum-subarray/
Best Time to Buy and Sell Stock: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
Rearrange Array Elements by Sign: https://leetcode.com/problems/rearrange-array-elements-by-sign/
Next Permutation: https://leetcode.com/problems/next-permutation/
Leaders in an Array: https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1
Longest Consecutive Sequence: https://leetcode.com/problems/longest-consecutive-sequence/
Set Matrix Zeroes: https://leetcode.com/problems/set-matrix-zeroes/
Rotate Image: https://leetcode.com/problems/rotate-image/
Spiral Matrix: https://leetcode.com/problems/spiral-matrix/
Subarray Sum Equals K: https://leetcode.com/problems/subarray-sum-equals-k/
Pascal's Triangle: https://leetcode.com/problems/pascals-triangle/
Majority Element II: https://leetcode.com/problems/majority-element-ii/
3Sum: https://leetcode.com/problems/3sum/
4Sum: https://leetcode.com/problems/4sum/
Largest Subarray with 0 Sum: https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1
Subarrays with XOR K: https://www.interviewbit.com/problems/subarray-with-given-xor/
Merge Intervals: https://leetcode.com/problems/merge-intervals/
Merge Sorted Array: https://leetcode.com/problems/merge-sorted-array/
Missing and Repeating: https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1
Reverse Pairs: https://leetcode.com/problems/reverse-pairs/
Maximum Product Subarray: https://leetcode.com/problems/maximum-product-subarray/
Topic Name: Step 4 - Binary Search
Binary Search: https://leetcode.com/problems/binary-search/
Lower Bound: https://www.naukri.com/code360/problems/lower-bound_8165382
Upper Bound: https://www.naukri.com/code360/problems/implement-upper-bound_8165383
Search Insert Position: https://leetcode.com/problems/search-insert-position/
Find First and Last Position of Element in Sorted Array: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
Number of Occurrences: https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1
Search in Rotated Sorted Array: https://leetcode.com/problems/search-in-rotated-sorted-array/
Search in Rotated Sorted Array II: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
Find Minimum in Rotated Sorted Array: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
Single Element in a Sorted Array: https://leetcode.com/problems/single-element-in-a-sorted-array/
Find Peak Element: https://leetcode.com/problems/find-peak-element/
Sqrt(x): https://leetcode.com/problems/sqrtx/
Find Nth Root of M: https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1
Koko Eating Bananas: https://leetcode.com/problems/koko-eating-bananas/
Minimum Number of Days to Make m Bouquets: https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/
Find the Smallest Divisor Given a Threshold: https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/
Capacity To Ship Packages Within D Days: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
Kth Missing Positive Number: https://leetcode.com/problems/kth-missing-positive-number/
Aggressive Cows: https://www.naukri.com/code360/problems/aggressive-cows_1082559
Allocate Books: https://www.naukri.com/code360/problems/allocate-books_1090540
Split Array Largest Sum: https://leetcode.com/problems/split-array-largest-sum/
Find the Row with Maximum Number of 1s: https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1
Search a 2D Matrix: https://leetcode.com/problems/search-a-2d-matrix/
Search a 2D Matrix II: https://leetcode.com/problems/search-a-2d-matrix-ii/
Find a Peak Element II: https://leetcode.com/problems/find-a-peak-element-ii/
Median in a Row-wise Sorted Matrix: https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1
Topic Name: Step 5 - Strings
Remove Outermost Parentheses: https://leetcode.com/problems/remove-outermost-parentheses/
Reverse Words in a String: https://leetcode.com/problems/reverse-words-in-a-string/
Largest Odd Number in String: https://leetcode.com/problems/largest-odd-number-in-string/
Longest Common Prefix: https://leetcode.com/problems/longest-common-prefix/
Isomorphic Strings: https://leetcode.com/problems/isomorphic-strings/
Rotate String: https://leetcode.com/problems/rotate-string/
Valid Anagram: https://leetcode.com/problems/valid-anagram/
Sort Characters By Frequency: https://leetcode.com/problems/sort-characters-by-frequency/
Maximum Nesting Depth of the Parentheses: https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/
Roman to Integer: https://leetcode.com/problems/roman-to-integer/
String to Integer (atoi): https://leetcode.com/problems/string-to-integer-atoi/
Count Number of Substrings: https://www.geeksforgeeks.org/problems/count-number-of-substrings4528/1
Longest Palindromic Substring: https://leetcode.com/problems/longest-palindromic-substring/
Sum of Beauty of All Substrings: https://leetcode.com/problems/sum-of-beauty-of-all-substrings/
Topic Name: Step 6 - Linked Lists
Introduction to Linked List: https://www.geeksforgeeks.org/problems/introduction-to-linked-list/1
Linked List Insertion: https://www.geeksforgeeks.org/problems/linked-list-insertion-1587115620/1
Delete Node in a Linked List: https://leetcode.com/problems/delete-node-in-a-linked-list/
Count nodes of linked list: https://www.geeksforgeeks.org/problems/count-nodes-of-linked-list/1
Search in a Linked List: https://www.geeksforgeeks.org/problems/search-in-linked-list-1664434326/1
Introduction to Doubly Linked List: https://www.geeksforgeeks.org/problems/introduction-to-doubly-linked-list/1
Insert a node in Doubly Linked List: https://www.geeksforgeeks.org/problems/insert-a-node-in-doubly-linked-list/1
Delete node in Doubly Linked List: https://www.geeksforgeeks.org/problems/delete-node-in-doubly-linked-list/1
Reverse a Doubly Linked List: https://www.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1
Middle of the Linked List: https://leetcode.com/problems/middle-of-the-linked-list/
Reverse Linked List: https://leetcode.com/problems/reverse-linked-list/
Linked List Cycle: https://leetcode.com/problems/linked-list-cycle/
Linked List Cycle II: https://leetcode.com/problems/linked-list-cycle-ii/
Palindrome Linked List: https://leetcode.com/problems/palindrome-linked-list/
Odd Even Linked List: https://leetcode.com/problems/odd-even-linked-list/
Remove Nth Node From End of List: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
Delete the Middle Node of a Linked List: https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/
Sort List: https://leetcode.com/problems/sort-list/
Intersection of Two Linked Lists: https://leetcode.com/problems/intersection-of-two-linked-lists/
Add Two Numbers: https://leetcode.com/problems/add-two-numbers/
Topic Name: Step 7 - Recursion
Recursive Implementation of atoi(): https://leetcode.com/problems/string-to-integer-atoi/
Pow(x, n): https://leetcode.com/problems/powx-n/
Count Good Numbers: https://leetcode.com/problems/count-good-numbers/
Sort a Stack: https://www.geeksforgeeks.org/problems/sort-a-stack/1
Reverse a Stack: https://www.geeksforgeeks.org/problems/reverse-a-stack/1
Generate Parentheses: https://leetcode.com/problems/generate-parentheses/
Subsets: https://leetcode.com/problems/subsets/
Better String: https://www.geeksforgeeks.org/problems/better-string/1
Perfect Sum Problem: https://www.geeksforgeeks.org/problems/perfect-sum-problem5633/1
Combination Sum: https://leetcode.com/problems/combination-sum/
Combination Sum II: https://leetcode.com/problems/combination-sum-ii/
Subset Sums: https://www.geeksforgeeks.org/problems/subset-sums2234/1
Subsets II: https://leetcode.com/problems/subsets-ii/
Combination Sum III: https://leetcode.com/problems/combination-sum-iii/
Letter Combinations of a Phone Number: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
Palindrome Partitioning: https://leetcode.com/problems/palindrome-partitioning/
Word Search: https://leetcode.com/problems/word-search/
N-Queens: https://leetcode.com/problems/n-queens/
Rat in a Maze Problem - I: https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1
Word Break: https://leetcode.com/problems/word-break/
M-Coloring Problem: https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1
Sudoku Solver: https://leetcode.com/problems/sudoku-solver/
Expression Add Operators: https://leetcode.com/problems/expression-add-operators/
Topic Name: Step 8 - Bit Manipulation
Introduction to Bit Manipulation: https://www.geeksforgeeks.org/problems/bit-manipulation-1666686020/1
Check whether K-th bit is set or not: https://www.geeksforgeeks.org/problems/check-whether-k-th-bit-is-set-or-not-1587115620/1
Odd or Even: https://www.geeksforgeeks.org/problems/odd-or-even3618/1
Power of Two: https://leetcode.com/problems/power-of-two/
Count total set bits: https://www.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1
Set the rightmost unset bit: https://www.geeksforgeeks.org/problems/set-the-rightmost-unset-bit4436/1
Swap two numbers: https://www.geeksforgeeks.org/problems/swap-two-numbers3844/1
Divide Two Integers: https://leetcode.com/problems/divide-two-integers/
Minimum Bit Flips to Convert Number: https://leetcode.com/problems/minimum-bit-flips-to-convert-number/
Single Number: https://leetcode.com/problems/single-number/
Single Number II: https://leetcode.com/problems/single-number-ii/
Single Number III: https://leetcode.com/problems/single-number-iii/
Bitwise AND of Numbers Range: https://leetcode.com/problems/bitwise-and-of-numbers-range/
Topic Name: Step 9 - Stacks and Queues
Implement Stack using Arrays: https://www.geeksforgeeks.org/problems/implement-stack-using-array/1
Implement Queue using Arrays: https://www.geeksforgeeks.org/problems/implement-queue-using-array/1
Implement Stack using Queues: https://leetcode.com/problems/implement-stack-using-queues/
Implement Queue using Stacks: https://leetcode.com/problems/implement-queue-using-stacks/
Implement Stack using Linked List: https://www.geeksforgeeks.org/problems/implement-stack-using-linked-list/1
Implement Queue using Linked List: https://www.geeksforgeeks.org/problems/implement-queue-using-linked-list/1
Valid Parentheses: https://leetcode.com/problems/valid-parentheses/
Min Stack: https://leetcode.com/problems/min-stack/
Infix to Postfix: https://www.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1
Prefix to Infix: https://www.geeksforgeeks.org/problems/prefix-to-infix-conversion/1
Prefix to Postfix: https://www.geeksforgeeks.org/problems/prefix-to-postfix-conversion/1
Postfix to Prefix: https://www.geeksforgeeks.org/problems/postfix-to-prefix-conversion/1
Postfix to Infix: https://www.geeksforgeeks.org/problems/postfix-to-infix-conversion/1
Next Greater Element I: https://leetcode.com/problems/next-greater-element-i/
Next Greater Element II: https://leetcode.com/problems/next-greater-element-ii/
Next Smaller Element: https://www.interviewbit.com/problems/nearest-smaller-element/
Number of NGEs to the right: https://www.geeksforgeeks.org/problems/number-of-nges-to-the-right/1
Trapping Rain Water: https://leetcode.com/problems/trapping-rain-water/
Sum of Subarray Minimums: https://leetcode.com/problems/sum-of-subarray-minimums/
Asteroid Collision: https://leetcode.com/problems/asteroid-collision/
Sum of Subarray Ranges: https://leetcode.com/problems/sum-of-subarray-ranges/
Remove K Digits: https://leetcode.com/problems/remove-k-digits/
Largest Rectangle in Histogram: https://leetcode.com/problems/largest-rectangle-in-histogram/
Maximal Rectangle: https://leetcode.com/problems/maximal-rectangle/
Sliding Window Maximum: https://leetcode.com/problems/sliding-window-maximum/
The Celebrity Problem: https://www.geeksforgeeks.org/problems/the-celebrity-problem/1
Rotting Oranges: https://leetcode.com/problems/rotting-oranges/
LRU Cache: https://leetcode.com/problems/lru-cache/
LFU Cache: https://leetcode.com/problems/lfu-cache/
Topic Name: Step 10 - Sliding Window & Two Pointer Combine Problems
Longest Substring Without Repeating Characters: https://leetcode.com/problems/longest-substring-without-repeating-characters/
Max Consecutive Ones III: https://leetcode.com/problems/max-consecutive-ones-iii/
Fruit Into Baskets: https://www.geeksforgeeks.org/problems/fruit-into-baskets-1663137462/1
Longest Repeating Character Replacement: https://leetcode.com/problems/longest-repeating-character-replacement/
Binary Subarrays With Sum: https://leetcode.com/problems/binary-subarrays-with-sum/
Count Number of Nice Subarrays: https://leetcode.com/problems/count-number-of-nice-subarrays/
Number of Substrings Containing All Three Characters: https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
Maximum Points You Can Obtain from Cards: https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
Longest K unique characters substring: https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1
Subarrays with K Different Integers: https://leetcode.com/problems/subarrays-with-k-different-integers/
Minimum Window Substring: https://leetcode.com/problems/minimum-window-substring/
Topic Name: Step 11 - Heaps
Introduction to Priority Queues using Binary Heaps: https://www.geeksforgeeks.org/problems/operations-on-binary-min-heap/1
Min Heap Implementation: https://www.geeksforgeeks.org/problems/implementation-of-priority-queue-using-binary-heap/1
Kth Largest Element in an Array: https://leetcode.com/problems/kth-largest-element-in-an-array/
Kth Smallest Element in a Sorted Array: https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1
Merge K Sorted Lists: https://leetcode.com/problems/merge-k-sorted-lists/
Replace elements by its rank in the array: https://www.geeksforgeeks.org/problems/replace-elements-by-its-rank-in-the-array/1
Task Scheduler: https://leetcode.com/problems/task-scheduler/
Hand of Straights: https://leetcode.com/problems/hand-of-straights/
Design Twitter: https://leetcode.com/problems/design-twitter/
Find Median from Data Stream: https://leetcode.com/problems/find-median-from-data-stream/
Topic Name: Step 12 - Greedy Algorithms
Assign Cookies: https://leetcode.com/problems/assign-cookies/
Fractional Knapsack: https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1
Greedy Algorithm to find Minimum number of Coins: https://www.geeksforgeeks.org/problems/minimum-number-of-coins4426/1
Lemonade Change: https://leetcode.com/problems/lemonade-change/
Valid Parenthesis String: https://leetcode.com/problems/valid-parenthesis-string/
N meetings in one room: https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1
Jump Game: https://leetcode.com/problems/jump-game/
Jump Game II: https://leetcode.com/problems/jump-game-ii/
Minimum number of jumps: https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1
Job Sequencing Problem: https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1
Non-overlapping Intervals: https://leetcode.com/problems/non-overlapping-intervals/
Insert Interval: https://leetcode.com/problems/insert-interval/
Minimum Platforms: https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1
Candy: https://leetcode.com/problems/candy/
Topic Name: Step 13 - Binary Trees
Introduction to Trees: https://www.geeksforgeeks.org/problems/introduction-to-trees/1
Binary Tree Representation: https://www.geeksforgeeks.org/problems/binary-tree-representation/1
Binary Tree Preorder Traversal: https://leetcode.com/problems/binary-tree-preorder-traversal/
Binary Tree Inorder Traversal: https://leetcode.com/problems/binary-tree-inorder-traversal/
Binary Tree Postorder Traversal: https://leetcode.com/problems/binary-tree-postorder-traversal/
Binary Tree Level Order Traversal: https://leetcode.com/problems/binary-tree-level-order-traversal/
Maximum Depth of Binary Tree: https://leetcode.com/problems/maximum-depth-of-binary-tree/
Balanced Binary Tree: https://leetcode.com/problems/balanced-binary-tree/
Diameter of Binary Tree: https://leetcode.com/problems/diameter-of-binary-tree/
Binary Tree Maximum Path Sum: https://leetcode.com/problems/binary-tree-maximum-path-sum/
Same Tree: https://leetcode.com/problems/same-tree/
Binary Tree Zigzag Level Order Traversal: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
Boundary Traversal of binary tree: https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1
Vertical Order Traversal of a Binary Tree: https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/
Top View of Binary Tree: https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1
Bottom View of Binary Tree: https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1
Binary Tree Right Side View: https://leetcode.com/problems/binary-tree-right-side-view/
Symmetric Tree: https://leetcode.com/problems/symmetric-tree/
Root to Leaf Paths: https://www.geeksforgeeks.org/problems/root-to-leaf-paths/1
Lowest Common Ancestor of a Binary Tree: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
Maximum Width of Binary Tree: https://leetcode.com/problems/maximum-width-of-binary-tree/
Children Sum in a Binary Tree: https://www.geeksforgeeks.org/problems/children-sum-parent/1
All Nodes Distance K in Binary Tree: https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
Amount of Time for Binary Tree to Be Infected: https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/
Count Complete Tree Nodes: https://leetcode.com/problems/count-complete-tree-nodes/
Construct Binary Tree from Preorder and Inorder Traversal: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
Construct Binary Tree from Inorder and Postorder Traversal: https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
Serialize and Deserialize Binary Tree: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
Flatten Binary Tree to Linked List: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
Topic Name: Step 14 - Binary Search Trees
Search in a Binary Search Tree: https://leetcode.com/problems/search-in-a-binary-search-tree/
Ceil in BST: https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1
Floor in BST: https://www.geeksforgeeks.org/problems/floor-in-bst/1
Insert into a Binary Search Tree: https://leetcode.com/problems/insert-into-a-binary-search-tree/
Delete Node in a BST: https://leetcode.com/problems/delete-node-in-a-bst/
Kth Smallest Element in a BST: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
Validate Binary Search Tree: https://leetcode.com/problems/validate-binary-search-tree/
Lowest Common Ancestor of a Binary Search Tree: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
Construct Binary Search Tree from Preorder Traversal: https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
Inorder Successor in BST: https://www.geeksforgeeks.org/problems/inorder-successor-in-bst/1
Binary Search Tree Iterator: https://leetcode.com/problems/binary-search-tree-iterator/
Two Sum IV - Input is a BST: https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
Recover Binary Search Tree: https://leetcode.com/problems/recover-binary-search-tree/
Largest BST: https://www.geeksforgeeks.org/problems/largest-bst/1
Topic Name: Step 15 - Graphs
Graph and Vertices: https://www.geeksforgeeks.org/problems/graph-and-vertices/1
Print adjacency list: https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1
BFS of graph: https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1
DFS of Graph: https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1
Number of Provinces: https://leetcode.com/problems/number-of-provinces/
Rotting Oranges: https://leetcode.com/problems/rotting-oranges/
Flood Fill: https://leetcode.com/problems/flood-fill/
01 Matrix: https://leetcode.com/problems/01-matrix/
Surrounded Regions: https://leetcode.com/problems/surrounded-regions/
Number of Enclaves: https://leetcode.com/problems/number-of-enclaves/
Word Ladder: https://leetcode.com/problems/word-ladder/
Word Ladder II: https://leetcode.com/problems/word-ladder-ii/
Is Graph Bipartite?: https://leetcode.com/problems/is-graph-bipartite/
Detect cycle in an undirected graph: https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1
Detect cycle in a directed graph: https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1
Find Eventual Safe States: https://leetcode.com/problems/find-eventual-safe-states/
Topological sort: https://www.geeksforgeeks.org/problems/topological-sort/1
Course Schedule: https://leetcode.com/problems/course-schedule/
Course Schedule II: https://leetcode.com/problems/course-schedule-ii/
Alien Dictionary: https://www.geeksforgeeks.org/problems/alien-dictionary/1
Shortest path in Directed Acyclic Graph: https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1
Shortest path in Undirected Graph having unit distance: https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1
Implementing Dijkstra Algorithm: https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1
Shortest Path in Weighted undirected graph: https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1
Shortest Path in Binary Matrix: https://leetcode.com/problems/shortest-path-in-binary-matrix/
Path With Minimum Effort: https://leetcode.com/problems/path-with-minimum-effort/
Cheapest Flights Within K Stops: https://leetcode.com/problems/cheapest-flights-within-k-stops/
Network Delay Time: https://leetcode.com/problems/network-delay-time/
Number of Ways to Arrive at Destination: https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/
Minimum Multiplications to reach End: https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1
Bellman-Ford Algorithm: https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1
Floyd Warshall: https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1
Find the City With the Smallest Number of Neighbors at a Threshold Distance: https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
Minimum Spanning Tree: https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1
Disjoint set (Union-Find): https://www.geeksforgeeks.org/problems/disjoint-set-union-find/1
Number of Operations to Make Network Connected: https://leetcode.com/problems/number-of-operations-to-make-network-connected/
Most Stones Removed with Same Row or Column: https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
Accounts Merge: https://leetcode.com/problems/accounts-merge/
Number of Islands II: https://www.geeksforgeeks.org/problems/number-of-islands/1
Making A Large Island: https://leetcode.com/problems/making-a-large-island/
Swim in Rising Water: https://leetcode.com/problems/swim-in-rising-water/
Strongly Connected Components (Kosaraju's Algo): https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1
Critical Connections in a Network (Bridges): https://leetcode.com/problems/critical-connections-in-a-network/
Articulation Point - I: https://www.geeksforgeeks.org/problems/articulation-point-1/1
Topic Name: Step 16 - Dynamic Programming
Fibonacci Number: https://leetcode.com/problems/fibonacci-number/
Climbing Stairs: https://leetcode.com/problems/climbing-stairs/
Geek Jump (Frog Jump): https://www.geeksforgeeks.org/problems/geek-jump/1
Minimal Cost: https://www.geeksforgeeks.org/problems/minimal-cost/1
House Robber: https://leetcode.com/problems/house-robber/
House Robber II: https://leetcode.com/problems/house-robber-ii/
Geek's Training: https://www.geeksforgeeks.org/problems/geeks-training/1
Unique Paths: https://leetcode.com/problems/unique-paths/
Unique Paths II: https://leetcode.com/problems/unique-paths-ii/
Minimum Path Sum: https://leetcode.com/problems/minimum-path-sum/
Triangle: https://leetcode.com/problems/triangle/
Minimum Falling Path Sum: https://leetcode.com/problems/minimum-falling-path-sum/
Cherry Pickup II: https://leetcode.com/problems/cherry-pickup-ii/
Subset Sum Problem: https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1
Partition Equal Subset Sum: https://leetcode.com/problems/partition-equal-subset-sum/
Minimum sum partition: https://www.geeksforgeeks.org/problems/minimum-sum-partition3317/1
Perfect Sum Problem: https://www.geeksforgeeks.org/problems/perfect-sum-problem5633/1
Partitions with Given Difference: https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1
0 - 1 Knapsack Problem: https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1
Coin Change: https://leetcode.com/problems/coin-change/
Target Sum: https://leetcode.com/problems/target-sum/
Coin Change II: https://leetcode.com/problems/coin-change-ii/
Knapsack with Duplicate Items: https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1
Rod Cutting: https://www.geeksforgeeks.org/problems/rod-cutting0840/1
Longest Common Subsequence: https://leetcode.com/problems/longest-common-subsequence/
Print all LCS sequences: https://www.geeksforgeeks.org/problems/print-all-lcs-sequences3413/1
Longest Common Substring: https://www.geeksforgeeks.org/problems/longest-common-substring1452/1
Longest Palindromic Subsequence: https://leetcode.com/problems/longest-palindromic-subsequence/
Minimum Insertions to Make String Palindrome: https://leetcode.com/problems/minimum-insertions-to-make-a-string-palindrome/
Minimum number of deletions and insertions: https://www.geeksforgeeks.org/problems/minimum-number-of-deletions-and-insertions0209/1
Shortest Common Supersequence: https://leetcode.com/problems/shortest-common-supersequence/
Distinct Subsequences: https://leetcode.com/problems/distinct-subsequences/
Edit Distance: https://leetcode.com/problems/edit-distance/
Wildcard Matching: https://leetcode.com/problems/wildcard-matching/
Best Time to Buy and Sell Stock: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
Best Time to Buy and Sell Stock II: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
Best Time to Buy and Sell Stock III: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
Best Time to Buy and Sell Stock IV: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
Best Time to Buy and Sell Stock with Cooldown: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
Best Time to Buy and Sell Stock with Transaction Fee: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
Longest Increasing Subsequence: https://leetcode.com/problems/longest-increasing-subsequence/
Largest Divisible Subset: https://leetcode.com/problems/largest-divisible-subset/
Longest String Chain: https://leetcode.com/problems/longest-string-chain/
Longest Bitonic subsequence: https://www.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1
Number of Longest Increasing Subsequence: https://leetcode.com/problems/number-of-longest-increasing-subsequence/
Matrix Chain Multiplication: https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1
Minimum Cost to Cut a Stick: https://leetcode.com/problems/minimum-cost-to-cut-a-stick/
Burst Balloons: https://leetcode.com/problems/burst-balloons/
Boolean Parenthesization: https://www.geeksforgeeks.org/problems/boolean-parenthesization5610/1
Palindrome Partitioning II: https://leetcode.com/problems/palindrome-partitioning-ii/
Partition Array for Maximum Sum: https://leetcode.com/problems/partition-array-for-maximum-sum/
Maximal Rectangle: https://leetcode.com/problems/maximal-rectangle/
Count Square Submatrices with All Ones: https://leetcode.com/problems/count-square-submatrices-with-all-ones/
Topic Name: Step 17 - Tries
Implement Trie (Prefix Tree): https://leetcode.com/problems/implement-trie-prefix-tree/
Implement Trie II: https://www.naukri.com/code360/problems/implement-trie_1387095
Complete String: https://www.naukri.com/code360/problems/complete-string_2687860
Number of Distinct Substrings in a String: https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1
Maximum XOR of Two Numbers in an Array: https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
Maximum XOR With an Element From Array: https://leetcode.com/problems/maximum-xor-with-an-element-from-array/
Topic Name: Step 18 - Strings (Hard)
Find the Index of the First Occurrence in a String (KMP): https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
Z Algorithm: https://www.geeksforgeeks.org/problems/z-algorithm/1
Minimum characters to be added at front to make string palindrome: https://www.geeksforgeeks.org/problems/minimum-characters-to-be-added-at-front-to-make-string-palindrome/1
Count and Say: https://leetcode.com/problems/count-and-say/`;

// 2. Parse it into JSON
const lines = rawData.split('\n');
const problems = [];
let currentStep = "";

// Keep track of IDs to ensure 100% uniqueness for React Maps
const seenIds = new Set();

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Identify Step headers
    if (trimmed.startsWith("Topic Name:")) {
        currentStep = trimmed.replace("Topic Name:", "").trim();
    }
    // Identify problem links
    else if (trimmed.includes("http")) {
        const colonIndex = trimmed.indexOf(":");
        if (colonIndex === -1) continue;

        const name = trimmed.substring(0, colonIndex).trim();
        const url = trimmed.substring(colonIndex + 1).trim();

        // Generate a clean slug ID (e.g., "Two Sum" -> "two-sum")
        let id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // Prevent duplicate ID crashes in Next.js mapping
        if (seenIds.has(id)) {
            id = `${id}-${problems.length}`;
        }
        seenIds.add(id);

        // Infer a TUF URL just so your frontend button doesn't break
        const tufUrl = `https://takeuforward.org/plus/dsa/problems/${id}`;

        problems.push({
            id: id,
            sheet: "a2z",
            step: currentStep,
            topic: currentStep, // Grouping by the Step name for the UI
            name: name,
            difficulty: "Medium", // Defaulting to Medium since text didn't include it
            tufUrl: tufUrl,
            leetcodeUrl: url, // Pushing your GFG/LeetCode/Naukri links here
            status: "todo"
        });
    }
}

// 3. Write securely to the Next.js data folder
const OUT_PATH = path.join(process.cwd(), "src/data/problems.json");
const dirPath = path.dirname(OUT_PATH);

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(OUT_PATH, JSON.stringify(problems, null, 2));

console.log(`Successfully generated ${problems.length} problems!`);
console.log(`Saved pristine database to ${OUT_PATH}`);