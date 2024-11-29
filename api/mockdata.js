const supportWorkers = () => [{
    supportWorkerId: 1,
    contractedHours: 15,
    name: ' Andrew',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
}, {
    supportWorkerId: 2,
    contractedHours: 15,
    name: ' Trudie',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
}, {
    supportWorkerId: 3,
    contractedHours: 15,
    name: 'Nicolas',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
}]

const visits = () => [{
    visitId: 1,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000,
    supportWorkerId: 1,
},
{
    visitId: 2,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000,
    supportWorkerId: 2,
},
{
    visitId: 3,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000,
    supportWorkerId: 3,
},
{
    visitId: 4,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000,
    supportWorkerId: 1,
},
{
    visitId: 5,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000,
    supportWorkerId: 2,
},
{
    visitId: 6,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000,
    supportWorkerId: 3,
},
{
    visitId: 7,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000,
    supportWorkerId: 1,
},
{
    visitId: 8,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000 + (3600000 * 10),
    supportWorkerId: 2,
},
{
    visitId: 9,
    startDateTime: 1663405200000,
    endDateTime: 1663408800000 + (3600000 * 12),
    supportWorkerId: 3,
}];

module.exports = {
    supportWorkers,
    visits
};
