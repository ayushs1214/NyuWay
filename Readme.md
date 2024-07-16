## Note: I have used Internet/AI softwares for the following things:
1. To check which node.js module to be used for DNS.
2. For the resolveTxt method in DNS.
3. To structure the Readme.md file properly.


# DNS TXT Record Verification

This project contains a script to verify the presence of a specific TXT record in the DNS of a given domain.

## Prerequisites

- Node.js installed on your system. You can download it from [Node.js](https://nodejs.org/).

## Installation

1. Clone the repository (https://github.com/ayushs1214/NyuWay.git) or download the ZIP file and extract it.

2. Navigate to the project directory:
    cd NyuWay

3. Install the dependencies:
    npm install

## Usage

1. Open the `task.js` file and configure the domain and expected TXT record:

    ```javascript
    // Configuration
    const domain = 'blackcrypt.co';
    const targetRecord = '8c7b9c07d891aa6745be45cc79e8ef946a7258f8ee476303e0e00d79befb0fe6';
    ```

2. Run the script:
    node task.js

## Explanation

### Code Overview

#### Importing the `dns` module

```javascript
const nameServer = require('dns');
```
- This line imports the `dns` module from Node.js, which provides methods to perform DNS lookups and resolve domain names.
- Reference: [GeeksforGeeks Node.js DNS](https://www.geeksforgeeks.org/node-js-dns/#:~:text=DNS%20is%20a%20node%20module,subdomain%20names%20to%20IP%20addresses.)

#### Function to Verify the TXT Record

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
- This function, `checkDomainRecord`, takes two parameters:
  - `domain`: The domain name to verify.
  - `targetRecord`: The specific TXT record value we are looking for.
- `nameServer.resolveTxt` is used to look up the TXT records for the given domain. This method takes two arguments:
  - `domain`: The domain to query.
  - A callback function to handle the results of the DNS query.
- If an error occurs, the `handleLookupError` function is called. Otherwise, it checks if the `targetRecord` is present in the TXT records using the `some` method.

#### Handling Errors

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
- This function handles different types of errors that might occur during the DNS query:
  - **ENODATA**: No TXT records were found for the domain.
  - **ENOTFOUND**: The domain does not exist.
  - **Default Case**: Any other errors that might occur are logged with their message.

#### Logging the Result

```javascript
function logResult(isFound, domain) {
    const status = isFound ? 'successfully' : 'failed';
    console.log(`Text record validation ${status} for ${domain}.`);
}
```
- This function logs the result of the TXT record verification:
  - If `isFound` is `true`, a success message is logged.
  - If `isFound` is `false`, a failure message is logged.

#### Configuration and Execution

```javascript
// Configuration
const domain = 'blackcrypt.co';
const targetRecord = '8c7b9c07d891aa6745be45cc79e8ef946a7258f8ee476303e0e00d79befb0fe6';

// Execute validation
checkDomainRecord(domain, targetRecord);
```
- The domain and the expected TXT record are defined as constants.
- The `checkDomainRecord` function is called with these constants to perform the verification.
