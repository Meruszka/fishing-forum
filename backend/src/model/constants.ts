const GEAR_KINDS = {
    ROD: 'Rod',
    REEL: 'Reel',
    BAIT: 'Bait',
    LINE: 'Line',
    OTHER: 'Other',
}

const FISHING_SPOT_TYPES = {
    LAKE: 'Lake',
    RIVER: 'River',
    POND: 'Pond',
    SEA: 'Sea',
    OCEAN: 'Ocean',
    OTHER: 'Other',
}

const POST_TYPES = {
    POST: 'Post',
}

const RANKS = {
    BEGINNER: 'Newbie',
    AMATEUR: 'Amateur',
    ADVANCED: 'Advanced',
    EXPERT: 'Expert',
    MASTER: 'Master',
    LEGEND: 'Legend',
}

const RANKS_POINTS = {
    [RANKS.BEGINNER]: 0,
    [RANKS.AMATEUR]: 100,
    [RANKS.ADVANCED]: 200,
    [RANKS.EXPERT]: 300,
    [RANKS.MASTER]: 400,
    [RANKS.LEGEND]: 500,
}

export { GEAR_KINDS, FISHING_SPOT_TYPES, POST_TYPES, RANKS, RANKS_POINTS }
