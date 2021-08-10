import http from 'k6/http';

/**
 * Stress Testing is a type of load testing which is used to determine the limits of a system.
 * The purpose of this test is to verify the stability and reliability of the system under extreme conditions.
 * 
 * You can use stress testing to -
 *  - Determine how your system will behave under extreme conditions.
 *  - Determmine the maximumm capacity of your system in terms of users and throughput.
 *  - Determine the breaking point of your system and it's failure mode.
 *  - Determine whether your system is self-recoverable without manual intervention after the stress test is over.
 * 
 * 
 *                                   -----------
 *                                 /            \
 *                                /              \
 *                               /                \
 *                              /                  \
 *                   ----------                     \
 *                  /                                \
 *                 /                                  \
 *                /                                    \
 *               /                                      \
 *     ---------                                         \
 *    /                                                   \
 *   /                                                     \
 *  /                                                       \
 * /                                                         \
 * ------------------------------------------------------------
 */
export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: true,
    stages: [
        // duration is ramp-up period
        { duration: '2m', target: 100 },  // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 },  // normal load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 },  // around the breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 },  // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 },   // scale down, recovery phase
    ]
};

export default () => {
    http.get('localhost:7791/api/v3/users');
};
