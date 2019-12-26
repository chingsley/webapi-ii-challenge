const log = (logInput) => {
    console.log('\n...starting logger****************************');
    // if (Array.isArray(arr)) {
    //     let i = 0;
    //     while (arr[i]) {
    //         console.log(arr[i]);
    //         i++;
    //     }
    // } else {
    //     throw new Error('logger is expects an array as an argument');
    // }
    console.log(logInput);
    console.log('****************************..ending logger\n');
};

const logger = { log };

export default logger;
