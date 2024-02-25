export function vec2Equal(pos1, pos2) {

    if(!pos1 || !pos2) {
        return false;
    }

    return pos1.x === pos2.x && pos1.y === pos2.y;
}

export const VEC2_ZERO = {x: 0, y: 0};