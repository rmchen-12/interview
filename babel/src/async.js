const c = () => {
    return new Promise((resolve,reject) => {
        resolve(123)
    })
}

const a = async () => {
    const b = await c()
    console.log(b);
}