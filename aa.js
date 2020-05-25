let ans = []
const permute = (arr) => {
    const track = [];
    backTrack(arr, track);
    return ans;
};

function backTrack(arr, track) {
    if (track.length === arr.length) {
        console.log(track)
        ans.push(track);
        return
    }

    for (let i = 0; i < arr.length; i++) {
        if (track.includes(arr[i])) {
            continue;
        }
        track.push(arr[i]);
        backTrack(arr, track);
        track.pop()
    }
}

permute([1, 2, 3])

console.log(ans)
