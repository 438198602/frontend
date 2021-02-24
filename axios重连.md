> https://github.com/axios/axios/issues/164#issuecomment-327837467

```
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
```

To use:

Config Options:

> retry - Number of times to retry the request after first failed request.  
> retryDelay - Number of milliseconds to wait in between failed requests (defaults to 1).

```
axios.get('/some/endpoint', { retry: 5, retryDelay: 1000 })
    .then(function(res) {
        console.log('success', res.data);
    })
    .catch(function(err) {
        console.log('failed', err);
    });
```
