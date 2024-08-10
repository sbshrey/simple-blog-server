const autocannon = require('autocannon')

function runLoadTest(endpoint) {
  return new Promise((resolve) => {
    autocannon({
      url: `http://localhost:3000${endpoint}`,
      connections: 100,
      pipelining: 10,
      duration: 10,
    }, (err, results) => {
      console.log(`Load test results for ${endpoint}:`)
      console.log(`Requests/sec: ${results.requests.average}`)
      console.log(`Latency (ms): ${results.latency.average}`)
      console.log('-----------------------------')
      resolve(results)
    })
  })
}

async function runAllTests() {
  await runLoadTest('/posts')
  await runLoadTest('/posts/1')
  // Add more endpoints as needed
}

runAllTests()
