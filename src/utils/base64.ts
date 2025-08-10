const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export function encode(input: string) {
  let output = [];
  let i = 0;

  while (i < input.length) {
    const chr1 = input.charCodeAt(i++);
    const chr2 = input.charCodeAt(i++);
    const chr3 = input.charCodeAt(i++);

    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output.push(
      keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4),
    );
  }

  return output.join("");
}

export function decode(input: string) {
  const invalidChars = /[^A-Za-z0-9+/=]/g;

  if (invalidChars.test(input)) {
    throw new Error(
      "Invalid characters found in Base64 string. " +
        "Use only A-Z, a-z, 0-9, '+', '/', '='.",
    );
  }

  // Remove invalid characters for safety
  input = input.replace(invalidChars, "");

  let output = [];
  let i = 0;

  while (i < input.length) {
    const enc1 = keyStr.indexOf(input.charAt(i++));
    const enc2 = keyStr.indexOf(input.charAt(i++));
    const enc3 = keyStr.indexOf(input.charAt(i++));
    const enc4 = keyStr.indexOf(input.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    output.push(String.fromCharCode(chr1));

    if (enc3 !== 64) {
      output.push(String.fromCharCode(chr2));
    }

    if (enc4 !== 64) {
      output.push(String.fromCharCode(chr3));
    }
  }

  return output.join("");
}
