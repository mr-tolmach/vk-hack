const w = {
    city: (x) => 5 * x,
    bdate: (x) => 2 * x,
    like: (x) => 10 * x,
    likes_num: (x) => 4. * Math.pow((1. - Math.pow(Math.abs(x * 0.3 - 1), 3)), 3),
    school: (x) => 1 * x,
    educatins: (x) => 3 * x,
    common_count: (x) => 0.05 * x,
    friend: (x) => 0.005 * x,
    home_town: (x) => 3 * x
};

module.exports = {
    calcUserRank: function (x) {
        let rank = 0;
        for (let ft in x) {
            if (x.hasOwnProperty(ft) && w.hasOwnProperty(ft)) {
                rank += w[ft](x(ft))
            }
        }
        return rank;
    }
};