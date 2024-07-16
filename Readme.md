# DNS TXT Record Verification

This project contains a script to verify the presence of a specific TXT record in the DNS of a given domain.

## Note on Resource Usage

I used the following resources during the development of this project:
1. Internet searches to determine the appropriate Node.js module for DNS operations.
2. Online documentation for the `resolveTxt` method in the DNS module.
3. Google searches to understand specific DNS error codes like 'ENODATA' and 'ENOTFOUND', as I wasn't familiar with them initially.
4. Online references for structuring the README.md file properly.


## Prerequisites

- Node.js (Download from [nodejs.org](https://nodejs.org/))

## Getting Started

1. Clone or download this repo:
    ```
    git clone "https://github.com/ayushs1214/NyuWay.git"
    ```

2. Navigate to the project folder:
   ```
   cd NyuWay
   ```
3. Install dependencies:
   ```
   npm install
   ```

## How to Use

1. Open `task.js` and set your domain and TXT record:

   ```javascript
   const domain = 'blackcrypt.co';
   const targetRecord = '8c7b9c07d891aa6745be45cc79e8ef946a7258f8ee476303e0e00d79befb0fe6';
   ```

2. Run the script:
   ```
   node task.js
   ```

## Code Breakdown

### DNS Module Import

```javascript
const nameServer = require('dns');
```

We're using Node's built-in DNS module for our lookups. I found this module after some research on DNS operations in Node.js.

### Main Verification Function

```javascript
function checkDomainRecord(domain, targetRecord) {
    nameServer.resolveTxt(domain, (error, entries) => {
        if (error) {
            handleLookupError(error, domain);
            return;
        }
        const isFound = entries.some(entry => entry.includes(targetRecord));
        logResult(isFound, domain);
    });
}
```

This function does the heavy lifting. It uses `resolveTxt` to query the domain's TXT records, then checks if our target record is present.

### Error Handling

```javascript
function handleLookupError(error, domain) {
    switch(error.code) {
        case 'ENODATA':
            console.log(`No text record available for ${domain}.`);
            break;
        case 'ENOTFOUND':
            console.log(`Unable to locate ${domain}.`);
            break;
        default:
            console.log(`Lookup failed: ${error.message}`);
    }
}
```

This function deals with common DNS lookup errors. It provides specific messages for 'no data' and 'not found' errors, with a catch-all for other issues.

### Result Logging

```javascript
function logResult(isFound, domain) {
    const status = isFound ? 'successfully' : 'failed';
    console.log(`Text record validation ${status} for ${domain}.`);
}
```

A simple function to log whether we found the TXT record or not.

### Script Execution

```javascript
const domain = 'blackcrypt.co';
const targetRecord = '8c7b9c07d891aa6745be45cc79e8ef946a7258f8ee476303e0e00d79befb0fe6';
checkDomainRecord(domain, targetRecord);
```

Here we set up our domain and target record, then run the verification.

## Wrapping Up

This script provides a straightforward way to verify TXT records for a domain. Feel free to modify the domain and target record as needed for your use case.

If you run into any issues or have questions, don't hesitate to reach out!
```
ayushsingh1214@gmail.com
```