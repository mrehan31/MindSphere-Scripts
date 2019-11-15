const got = require('got');
const http = require('https');


async function createEvent(req, timestamp, assetId, correlationId = undefined) {
    const body = {
        timestamp: timestamp,
        entityId: assetId,
        severity: 99
    };

    if (correlationId) {
        body.correlationId = correlationId;
    }

    const response = await req.http('/api/eventmanagement/v3/events', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    if (response.status != 200) {
        console.log(response)
    }
    return JSON.parse(response.body);
}

module.exports = async (req, res) => {
    try {
        if (!req.body.assetId) {
            res.status(400).send('No assetId provided.');
            return;
        }

        const newBeginEvent = await createEvent(req, req.body.beginDate, req.body.assetId);

        console.log('CREATED new begin event with id', newBeginEvent.id);

        const newEndEvent = await createEvent(req, req.body.endDate, req.body.assetId, newBeginEvent.correlationId);

        console.log('CREATED new end event with id', newEndEvent.id);

        res.send({result: 'OK'});

    } catch (err) {
        console.error(err);
        res.status(500).send(`Internal error: ${err.message}`);
    }
}
