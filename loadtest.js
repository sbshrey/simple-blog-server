const autocannon = require('autocannon');

// Function to run load test using autocannon with optional headers and body
function runLoadTest(endpoint, method = 'GET', headers = {}, body = null) {
  return new Promise((resolve) => {
    const options = {
      url: `http://localhost:3000${endpoint}`,
      method: method,
      connections: 100, // Simulate 100 concurrent connections
      pipelining: 10,   // Simulate pipelining with 10 requests in one go
      duration: 10,     // Run the test for 10 seconds
      headers: headers, // Add headers for authentication or other purposes
    };

    // If the method is POST or PUT and a body is provided, add it to the options
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
    }

    autocannon(options, (err, results) => {
      if (err) {
        console.error(`Error during load test for ${endpoint}:`, err);
        resolve(null);
        return;
      }
      console.log(`Load test results for ${endpoint} [${method}]:`);
      console.log(`Requests/sec: ${results.requests.average}`);
      console.log(`Latency (ms): ${results.latency.average}`);
      console.log('-----------------------------');
      resolve(results);
    });
  });
}

// Replace with your actual API key
const API_KEY = 'your-api-key';
const headers = {
  'x-api-key': API_KEY
};

// Body for POST/PUT requests
const postData = {
  title: 'Load Test Post',
  content: 'This is a post created during load testing.'
};

// Run load tests
(async () => {
  console.log('Starting load tests...');

  // Test without authentication
  await runLoadTest('/posts');
  await runLoadTest('/posts/1'); // Replace '1' with a valid post ID in your system

  // Test with authentication
  await runLoadTest('/posts', 'GET', headers);
  await runLoadTest('/posts/1', 'GET', headers); // Replace '1' with a valid post ID in your system

  // Test POST /posts with body and authentication
  await runLoadTest('/posts', 'POST', headers, postData);

  // Test PUT /posts/1 with body and authentication (replace '1' with a valid post ID)
  await runLoadTest('/posts/1', 'PUT', headers, {
    title: 'Updated Load Test Post',
    content: 'This post has been updated during load testing.'
  });

  // Test paginated GET /posts with authentication
  await runLoadTest('/posts?page=1&limit=5', 'GET', headers);
  await runLoadTest('/posts?page=2&limit=5', 'GET', headers);

  // Test DELETE /posts/1 with authentication (replace '1' with a valid post ID)
  await runLoadTest(`/posts/1`, 'DELETE', headers);

  console.log('Load tests completed.');
})();
