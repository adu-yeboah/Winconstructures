"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_prisma_1 = __importStar(require("./config/database.prisma"));
const propertyRoute_1 = __importDefault(require("./routes/propertyRoute"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const settings_routes_1 = __importDefault(require("./routes/settings.routes"));
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
// Request logging middleware (MUST be before routes to work properly)
app.use((req, res, next) => {
    const start = Date.now();
    // Log incoming request
    console.log('\n========================================');
    console.log('INCOMING REQUEST');
    console.log('========================================');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', req.body ? JSON.stringify(req.body, null, 2) : 'No body');
    console.log('Query:', JSON.stringify(req.query, null, 2));
    console.log('========================================\n');
    // Log response when finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log('\n========================================');
        console.log('OUTGOING RESPONSE');
        console.log('========================================');
        console.log('Method:', req.method);
        console.log('URL:', req.url);
        console.log('Status:', res.statusCode);
        console.log('Duration:', `${duration}ms`);
        console.log('========================================\n');
    });
    next();
});
// Routes
app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to Winconstructures API' });
});
app.use('/api/auth', auth_routes_1.default);
app.use("/api/property", propertyRoute_1.default);
app.use("/api/message", message_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use("/api/settings", settings_routes_1.default);
app.use("/api/upload", uploadRoute_1.default);
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n Shutting down gracefully...');
    await database_prisma_1.default.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n Shutting down gracefully...');
    await database_prisma_1.default.$disconnect();
    process.exit(0);
});
const startServer = async () => {
    try {
        await (0, database_prisma_1.initializeDatabase)();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
