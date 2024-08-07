import UAParser from 'ua-parser-js';

const parser = new UAParser();
const result = parser.getResult();

const isHost = () => result.device.type === undefined || result.device.type === 'desktop';

const isDesktop = () => result.device.type === undefined || result.device.type === 'desktop';

export { isHost, isDesktop };