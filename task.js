const nameServer = require('dns');

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

function logResult(isFound, domain) {
    const status = isFound ? 'successfully' : 'failed';
    console.log(`Text record validation ${status} for ${domain}.`);
}

const domain = 'blackcrypt.co';
const targetRecord = '8c7b9c07d891aa6745be45cc79e8ef946a7258f8ee476303e0e00d79befb0fe6';


checkDomainRecord(domain, targetRecord);