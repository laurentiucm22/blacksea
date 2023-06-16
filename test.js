// const os = require("os");

// function getIp() {
//   const ifaces = os.networkInterfaces();
//   for (const iface in ifaces) {
//     for (const alias of ifaces[iface]) {
//       if (
//         alias.family === "IPv4" &&
//         alias.address !== "127.0.0.1" &&
//         !alias.internal
//       ) {
//         return alias.address;
//       }
//     }
//   }
// }

// console.log(`Your IP address is: ${getIp()}`);
