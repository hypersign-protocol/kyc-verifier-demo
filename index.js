const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express();

// Serve static assets (CSS, JS, images, etc.) but exclude HTML files
app.use(express.static('public', {
    index: false,
    extensions: ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'json']
}))

// Function to inject environment variables into HTML
function injectEnvVariables(htmlContent) {
    const entityDashboardBaseUrl = process.env.ENTITY_DASHBOARD_BASE_URL || 'https://api.entity.dashboard.hypersign.id';
    const idDashboardServiceBaseUrl = process.env.ID_DASHBOARD_SERVICE_BASE_URL || 'https://api.cavach.hypersign.id';
    const widgetUrl = process.env.WIDGET_URL || 'https://verify.hypersign.id/';
    
    // Replace all environment variable references with actual values
    let processedHtml = htmlContent;
    
    // Replace ENTITY_DASHBOARD_BASE_URL
    processedHtml = processedHtml.replace(
        /const entityDashboardBaseUrl = process\.env\.ENTITY_DASHBOARD_BASE_URL \|\| '[^']*'/,
        `const entityDashboardBaseUrl = '${entityDashboardBaseUrl}'`
    );
    
    // Replace ID_DASHBOARD_SERVICE_BASE_URL
    processedHtml = processedHtml.replace(
        /teneantUrl =\s+process\.env\.ID_DASHBOARD_SERVICE_BASE_URL \|\| "[^"]*"/,
        `teneantUrl = '${idDashboardServiceBaseUrl}'`
    );
    
    // Replace WIDGET_URL
    processedHtml = processedHtml.replace(
        /const widgetBaseUrl = process\.env\.WIDGET_URL \|\| "[^"]*"/,
        `const widgetBaseUrl = '${widgetUrl}'`
    );
    
    return processedHtml;
}

// Serve index.html with environment variables injected
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error loading page');
        }
        const processedHtml = injectEnvVariables(data);
        res.send(processedHtml);
    });
})

app.get('/:id', (req, res) => {
    const htmlPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error loading page');
        }
        const processedHtml = injectEnvVariables(data);
        res.send(processedHtml);
    });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.listen(6006, () => {
    console.log('listening on port 6006')
})

