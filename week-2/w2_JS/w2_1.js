// Find sum from 1 to n numbers

function nsum(n) {
    ans = 0
    for (let i = 1; i <= n; i++) {
        ans = ans + i
    }
    return ans
}

console.log(nsum(10))