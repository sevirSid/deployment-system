// import { NextResponse } from 'next/server';
// import si from 'systeminformation';

// let requestCounter = 0;
// let lastResetTime = Date.now();

// export async function GET() {
//   const currentTime = Date.now();
//   const timeElapsed = (currentTime - lastResetTime) / 1000;

//   requestCounter++;
//   const requestRate = (requestCounter / timeElapsed).toFixed(2);

//   if (timeElapsed >= 1) {
//     requestCounter = 0;
//     lastResetTime = currentTime;
//   }

//   try {
//     const [cpuLoad, memory, processes, network] = await Promise.all([
//       si.currentLoad(),
//       si.mem(),
//       si.processes(),
//       si.networkStats()
//     ]);

//     const metrics = {
//       cpu: {
//         usage: cpuLoad.currentLoad.toFixed(2),
//         cores: cpuLoad.cpus.map(cpu => ({
//           load: cpu.load.toFixed(2)
//         }))
//       },
//       memory: {
//         total: memory.total,
//         used: memory.active,
//         usagePercent: ((memory.active / memory.total) * 100).toFixed(2)
//       },
//       processes: {
//         total: processes.all,
//         running: processes.running,
//         blocked: processes.blocked
//       },
//       network: {
//         rx_sec: network[0]?.rx_sec || 0,
//         tx_sec: network[0]?.tx_sec || 0
//       },
//       requests: {
//         rate: requestRate,
//         total: requestCounter
//       },
//       timestamp: new Date().toISOString()
//     };

//     return NextResponse.json(metrics);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch metrics' },
//       { status: 500 }
//     );
//   }
// }