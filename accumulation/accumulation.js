const ZB = require('zeebe-node')

;(async () => {
	const zbc = new ZB.ZBClient('localhost:26500')
	await zbc.deployWorkflow('./accumulation.bpmn')

    const correlationKey = '8'
    const uniqueKey = correlationKey + '-2'
    
    await zbc.publishMessage({
        correlationKey: correlationKey,
        messageId: uniqueKey,
        name: 'Message_A',
        variables: { myCorrelationKey: correlationKey, finish: false },
        timeToLive: 10000,
    })
    
    console.log("[x] done")
})()