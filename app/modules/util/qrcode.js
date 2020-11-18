import QRC from 'qrcode';

/**
 * Generates qrcodes based on input strings
 * @param {string} str
 */
export async function qrcode(str) {
    if (!str) throw 'Param "str" must not be null!';

    try {
        const qr = await QRC.toDataURL(str);
        return {
            data: qr,
            type: 'image/png'
        };
    } catch (error) {
        throw 'Error on generating QRCode.';
    }
}