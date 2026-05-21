export const dpCodeSources = {
  fibonacci: {
    javascript: {
      tabulation: `// Fibonacci - Tabulation (Bottom-Up DP)
function fibonacci(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`,
      memoization: `// Fibonacci - Memoization (Top-Down DP)
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
      recursion: `// Fibonacci - Pure Recursion (Exponential!)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
  // Time: O(2^n), Space: O(n)
}`,
    },
    python: {
      tabulation: `# Fibonacci - Tabulation (Bottom-Up DP)
def fibonacci(n):
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]`,
      memoization: `# Fibonacci - Memoization (Top-Down DP)
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    },
    cpp: {
      tabulation: `// Fibonacci - Tabulation (Bottom-Up DP)
int fibonacci(int n) {
    vector<int> dp(n + 1, 0);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
    },
  },

  climbingStairs: {
    javascript: {
      tabulation: `// Climbing Stairs - Tabulation
function climbStairs(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // base: 1 way to stay at ground
  dp[1] = 1; // base: 1 way to climb 1 stair
  
  for (let i = 2; i <= n; i++) {
    // Come from stair i-1 (1 step) or i-2 (2 steps)
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`,
      memoization: `// Climbing Stairs - Memoization
function climbStairs(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return 1;
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}`,
    },
    python: {
      tabulation: `# Climbing Stairs - Tabulation
def climb_stairs(n):
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]`,
    },
    cpp: {
      tabulation: `// Climbing Stairs - Tabulation
int climbStairs(int n) {
    vector<int> dp(n + 1, 0);
    dp[0] = 1;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
    },
  },

  houseRobber: {
    javascript: {
      tabulation: `// House Robber - Tabulation
function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  
  for (let i = 2; i < n; i++) {
    // Rob this house + best up to i-2, OR skip and take best up to i-1
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  
  return dp[n - 1];
}`,
    },
    python: {
      tabulation: `# House Robber - Tabulation
def rob(nums):
    n = len(nums)
    if n == 0: return 0
    if n == 1: return nums[0]
    
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in range(2, n):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    
    return dp[n - 1]`,
    },
    cpp: {
      tabulation: `// House Robber - Tabulation
int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    vector<int> dp(n, 0);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);
    
    for (int i = 2; i < n; i++) {
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[n - 1];
}`,
    },
  },

  knapsack: {
    javascript: {
      tabulation: `// 0/1 Knapsack - Tabulation
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({length: n+1}, () => new Array(capacity+1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1], v = values[i - 1];
    for (let j = 0; j <= capacity; j++) {
      if (j < w) {
        dp[i][j] = dp[i - 1][j]; // Can't include item i
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-w] + v);
      }
    }
  }
  
  return dp[n][capacity];
}`,
    },
    python: {
      tabulation: `# 0/1 Knapsack - Tabulation
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        w, v = weights[i-1], values[i-1]
        for j in range(capacity + 1):
            if j < w:
                dp[i][j] = dp[i-1][j]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i-1][j-w] + v)
    
    return dp[n][capacity]`,
    },
    cpp: {
      tabulation: `// 0/1 Knapsack - Tabulation
int knapsack(vector<int>& w, vector<int>& v, int W) {
    int n = w.size();
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            if (j < w[i-1])
                dp[i][j] = dp[i-1][j];
            else
                dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i-1]] + v[i-1]);
        }
    }
    return dp[n][W];
}`,
    },
  },

  subsetSum: {
    javascript: {
      tabulation: `// Subset Sum - Tabulation
function subsetSum(nums, target) {
  const n = nums.length;
  const dp = Array.from({length: n+1}, () => new Array(target+1).fill(false));
  
  // Empty subset sums to 0
  for (let i = 0; i <= n; i++) dp[i][0] = true;
  
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 1; j <= target; j++) {
      if (j < num) dp[i][j] = dp[i-1][j];
      else dp[i][j] = dp[i-1][j] || dp[i-1][j-num];
    }
  }
  
  return dp[n][target];
}`,
    },
    python: {
      tabulation: `# Subset Sum - Tabulation
def subset_sum(nums, target):
    n = len(nums)
    dp = [[False] * (target + 1) for _ in range(n + 1)]
    
    for i in range(n + 1):
        dp[i][0] = True
    
    for i in range(1, n + 1):
        num = nums[i - 1]
        for j in range(1, target + 1):
            if j < num:
                dp[i][j] = dp[i-1][j]
            else:
                dp[i][j] = dp[i-1][j] or dp[i-1][j-num]
    
    return dp[n][target]`,
    },
    cpp: {
      tabulation: `// Subset Sum - Tabulation
bool subsetSum(vector<int>& nums, int target) {
    int n = nums.size();
    vector<vector<bool>> dp(n+1, vector<bool>(target+1, false));
    
    for (int i = 0; i <= n; i++) dp[i][0] = true;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= target; j++) {
            if (j < nums[i-1]) dp[i][j] = dp[i-1][j];
            else dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]];
        }
    }
    return dp[n][target];
}`,
    },
  },

  lcs: {
    javascript: {
      tabulation: `// Longest Common Subsequence - Tabulation
function lcs(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1; // Characters match
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  
  return dp[m][n];
}`,
    },
    python: {
      tabulation: `# Longest Common Subsequence - Tabulation
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`,
    },
    cpp: {
      tabulation: `// Longest Common Subsequence - Tabulation
int lcs(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
    },
  },

  editDistance: {
    javascript: {
      tabulation: `// Edit Distance (Levenshtein) - Tabulation
function editDistance(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  
  // Base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i; // delete all
  for (let j = 0; j <= n; j++) dp[0][j] = j; // insert all
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) {
        dp[i][j] = dp[i-1][j-1]; // no operation needed
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i-1][j-1], // replace
          dp[i-1][j],   // delete
          dp[i][j-1]    // insert
        );
      }
    }
  }
  
  return dp[m][n];
}`,
    },
    python: {
      tabulation: `# Edit Distance - Tabulation
def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`,
    },
    cpp: {
      tabulation: `// Edit Distance - Tabulation
int editDistance(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]});
        }
    }
    return dp[m][n];
}`,
    },
  },

  lis: {
    javascript: {
      tabulation: `// Longest Increasing Subsequence - Tabulation O(n²)
function lis(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);
  
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  return Math.max(...dp);
}`,
    },
    python: {
      tabulation: `# Longest Increasing Subsequence - Tabulation O(n²)
def lis(nums):
    n = len(nums)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)`,
    },
    cpp: {
      tabulation: `// Longest Increasing Subsequence - Tabulation O(n²)
int lis(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i])
                dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    
    return *max_element(dp.begin(), dp.end());
}`,
    },
  },

  uniquePaths: {
    javascript: {
      tabulation: `// Unique Paths - Tabulation
function uniquePaths(m, n) {
  const dp = Array.from({length: m}, () => new Array(n).fill(1));
  
  // First row and col are all 1
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  
  return dp[m - 1][n - 1];
}`,
    },
    python: {
      tabulation: `# Unique Paths - Tabulation
def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]`,
    },
    cpp: {
      tabulation: `// Unique Paths - Tabulation
int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
}`,
    },
  },

  minPathSum: {
    javascript: {
      tabulation: `// Minimum Path Sum - Tabulation
function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = grid.map(r => [...r]);
  
  // Fill first row
  for (let j = 1; j < n; j++) dp[0][j] += dp[0][j-1];
  // Fill first col
  for (let i = 1; i < m; i++) dp[i][0] += dp[i-1][0];
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] += Math.min(dp[i-1][j], dp[i][j-1]);
    }
  }
  
  return dp[m-1][n-1];
}`,
    },
    python: {
      tabulation: `# Minimum Path Sum - Tabulation
def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    dp = [row[:] for row in grid]
    
    for j in range(1, n): dp[0][j] += dp[0][j-1]
    for i in range(1, m): dp[i][0] += dp[i-1][0]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] += min(dp[i-1][j], dp[i][j-1])
    
    return dp[m-1][n-1]`,
    },
    cpp: {
      tabulation: `// Minimum Path Sum - Tabulation
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<vector<int>> dp = grid;
    
    for (int j = 1; j < n; j++) dp[0][j] += dp[0][j-1];
    for (int i = 1; i < m; i++) dp[i][0] += dp[i-1][0];
    
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i][j] += min(dp[i-1][j], dp[i][j-1]);
    
    return dp[m-1][n-1];
}`,
    },
  },
}

export const dpComplexity = {
  fibonacci: { time: 'O(n)', space: 'O(n)', pattern: 'Basic DP' },
  climbingStairs: { time: 'O(n)', space: 'O(n)', pattern: 'Basic DP' },
  houseRobber: { time: 'O(n)', space: 'O(n)', pattern: '1D DP' },
  knapsack: { time: 'O(n·W)', space: 'O(n·W)', pattern: 'Knapsack' },
  subsetSum: { time: 'O(n·T)', space: 'O(n·T)', pattern: 'Knapsack' },
  lcs: { time: 'O(m·n)', space: 'O(m·n)', pattern: 'String DP' },
  editDistance: { time: 'O(m·n)', space: 'O(m·n)', pattern: 'String DP' },
  lis: { time: 'O(n²)', space: 'O(n)', pattern: 'LIS Pattern' },
  uniquePaths: { time: 'O(m·n)', space: 'O(m·n)', pattern: 'Grid DP' },
  minPathSum: { time: 'O(m·n)', space: 'O(m·n)', pattern: 'Grid DP' },
}

export const dpAlgorithmGroups = [
  {
    label: 'Basic DP',
    color: 'cyan',
    algorithms: [
      { id: 'fibonacci', label: 'Fibonacci', dim: '1D' },
      { id: 'climbingStairs', label: 'Climbing Stairs', dim: '1D' },
    ],
  },
  {
    label: '1D DP',
    color: 'blue',
    algorithms: [{ id: 'houseRobber', label: 'House Robber', dim: '1D' }],
  },
  {
    label: 'Knapsack Pattern',
    color: 'purple',
    algorithms: [
      { id: 'knapsack', label: '0/1 Knapsack', dim: '2D' },
      { id: 'subsetSum', label: 'Subset Sum', dim: '2D' },
    ],
  },
  {
    label: 'String DP',
    color: 'pink',
    algorithms: [
      { id: 'lcs', label: 'Longest Common Subsequence', dim: '2D' },
      { id: 'editDistance', label: 'Edit Distance', dim: '2D' },
    ],
  },
  {
    label: 'LIS Pattern',
    color: 'orange',
    algorithms: [
      { id: 'lis', label: 'Longest Increasing Subsequence', dim: '1D' },
    ],
  },
  {
    label: 'Grid DP',
    color: 'emerald',
    algorithms: [
      { id: 'uniquePaths', label: 'Unique Paths', dim: '2D' },
      { id: 'minPathSum', label: 'Minimum Path Sum', dim: '2D' },
    ],
  },
]
