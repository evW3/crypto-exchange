import { TRADERS_DEFAULT_NAMES, TRADERS_RARE_NAMES } from "./constants.utils";
import { v4 as uuid } from 'uuid';

export const createDefaultLogin = () => {
    const isRareName = !!(_getRandomInt(101) === 100);
    const uuidPrefix = uuid().split('-');
    const randomPrefix = uuidPrefix[_getRandomInt(uuidPrefix.length)];
    let nameIdx = 0;

    if(!isRareName) {
        nameIdx = _getRandomInt(TRADERS_DEFAULT_NAMES.length);
        return `${TRADERS_DEFAULT_NAMES[nameIdx]}_${randomPrefix}`;
    }
    
    nameIdx = _getRandomInt(TRADERS_RARE_NAMES.length);
    return `${TRADERS_RARE_NAMES[nameIdx]}_${randomPrefix}`;

};

function _getRandomInt(maxNum) {
    return Math.floor(Math.random() * maxNum);
} 