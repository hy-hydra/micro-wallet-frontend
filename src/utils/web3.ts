export function isEthereumAddress(str: string) {
    if (typeof str !== 'string') return false;

    // Check length
    if (str.length !== 42) return false;

    // Check '0x' prefix
    if (str.slice(0, 2) !== '0x') return false;

    // Check hexadecimal characters
    const hexChars = /^[0-9a-fA-F]+$/;
    if (!hexChars.test(str.slice(2))) return false;

    return true;
}
