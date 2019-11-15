const requestLog = require('./src/middleware/requestlog.middleware');
const auth = require('./src/middleware/auth.middleware');
const client = require('./src/middleware/client.middleware');

const routes = require('./src/routes');

const express = require('express');


function useMiddleware(app) {
    app.use(express.json());

    app.use(requestLog.middleware);

    app.use(auth.middleware);

    app.use(client.middleware());
}

function defineRoutes(app) {
    const maintenanceReports = routes.maintenance.reports;
    // app.post('/backend/maintenance/reports', maintenanceReports.post);
    app.post('/backend/maintenance/reports', maintenanceReports.post);
    
    const authToken = routes.auth.token;
    app.get('/backend/auth/token', authToken.get);

    console.log('Available routes:');
    app._router.stack
        .filter(stackItem => !!stackItem.route)
        .forEach(stackItem => console.log(stackItem.route.stack[0].method.toUpperCase(), stackItem.route.path));
}


// ===== Main function =====
(function main() {
    const app = express();
    const port = process.env.PORT || 4203;

    useMiddleware(app);

    defineRoutes(app);

    app.listen(port, () => {
        console.log('App started');
        console.log(`Listening to port ${port}`);
    });
})();