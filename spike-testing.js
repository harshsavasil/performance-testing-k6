import http from 'k6/http';

/**
 * Spike Testing is a variation of stress testing, but it doesn't gradually increase the load,
 * instead it spikes to extreme load over a short period of time.
 * 
 * You can use spike testing to -
 *  - Determine how your system will perform under sudden surge of traffic.
 *  - Determine if your system will recover once the traffic has subsided.
 * 
 * Success is based on expectations. System will generally react in 1 out of 4 ways -
 *  - Excellent: System Performance is not degraded during the surge of traffic.
 *      Response time is similar during low and high traffic.
 *  - Good: Response time is slower, but the system doesn't produce any errors.
 *      All requests are handled.
 *  - Poor: System produces errors during the surge of traffic, but recovers to normal after the
 *      traffic subsided.
 *  - Bad: System crashes, and doesn't recover even after the traffic has subsided.
 * 
 * 
 *               --------------------
 *              |                    |
 *              |                    |
 *              |                    |
 *              |                    |
 *              |                    |
 *              |                    |
 *              |                    |
 *              |                    |
 *     ---------                     |
 *    /                              |
 *   /                               |
 *  /                                |
 * /                                 |
 * ------------------------------------------------------------s
 */
export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: true,
    stages: [
        // duration is ramp-up period
        { duration: '10s', target: 100 },     // below normal load
        { duration: '1m', target: 100 },      // warmup period
        { duration: '10s', target: 1500 },    // spike to 1500 users
        { duration: '3m', target: 1500 },     // 1500 users stay on the service
        { duration: '10s', target: 100 },     // scale down, recovery stage
        { duration: '3m', target: 100 }, 
        { duration: '10s', target: 0 }, 
    ]
};

export default () => {
    let res = http.batch([
        { method: 'GET', url: url1, params: { headers: requestHeaders } },
        { method: 'GET', url: url2 },
    ]);
};
