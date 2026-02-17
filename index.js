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
    const entityDashboardBaseUrl = process.env.HYPERSIGN_DASHBOARD_SERVICE_BASE_URL || 'https://api.entity.dashboard.hypersign.id';
    const idDashboardServiceBaseUrl = process.env.ID_SERVICE_BASE_URL || 'https://api.cavach.hypersign.id';
    const widgetUrl = process.env.WIDGET_URL || 'https://verify.hypersign.id/';
    
    // Inject environment variables as window properties at the start of the script
    const envScript = `
    <script>
        window.HYPERSIGN_DASHBOARD_SERVICE_BASE_URL = '${entityDashboardBaseUrl}';
        window.ID_SERVICE_BASE_URL = '${idDashboardServiceBaseUrl}';
        window.WIDGET_URL = '${widgetUrl}';
    </script>`;
    
    // Inject before the closing </head> tag
    let processedHtml = htmlContent.replace('</head>', `${envScript}\n</head>`);
    
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

