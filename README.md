# Benchmarking deep equality vs hashing approach for comparing objects

A comparison between `lodash.isequal`, `fast-deep-equal` and `object-hash` for a specific usecase

Check the benchmarks at [`index.js`](./index.js)

## Running

1. Clone this repo and `cd` into the project root

2. Install dependencies:

```sh
yarn
```

3. Generate dataset. Change the sample size in [`generate.js`](./generate.js). Then run:

```sh
yarn generate
```

4. Run the tests:

```sh
yarn start
```

## Approaches

1. **lodash.isequal**: Deep comparing objects to determine changed objects

2. **fast-deep-equal**: Deep comparing objects to determine changes objects

3. **object-hash**: Storing the hash value of objects and later comparing them with the new objects. The new objects undergo a md5 hash process and this hash value is compared against their last hash value

### Time taken

Tests ran only once for brevity:

| Sample size | Lodash.isequal (ms) | fast-deep-equal (ms)   | object-hash (ms)       |
| ----------- | ------------------- | ---------------------- | ---------------------- |
| 10          | 3.73 (slowest)      | **0.44** (fastest)     | 3.55                   |
| 100         | 5.97                | **1.95** (fastest)     | 24.92 (slowest)        |
| 1,000       | 126.77              | **113.87** (fastest)   | 226.28 (slowest)       |
| 5,000       | 2839.30             | **2620.96** (fastest)  | 3249.85 (slowest)      |
| 10,000      | 12350.28            | **12264.97** (fastest) | 12877.76 (slowest)     |
| 20,000      | 55649.79 (slowest)  | 55494.73               | **50748.38** (fastest) |

### Size on disk

| Sample size | Full JSON (MB) | Hashed JSON (MB) |
| ----------- | -------------- | ---------------- |
| 10          | 0.033          | 0.0005           |
| 100         | 0.034          | 0.005            |
| 1,000       | 0.351          | 0.054            |
| 5,000       | 1.7            | 0.272            |
| 10,000      | 3.5            | 0.546            |
| 20,000      | 7              | 1.1              |
