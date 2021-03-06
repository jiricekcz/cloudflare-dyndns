"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDNS = exports.updateDNS = exports.init = void 0;
var cloudflare = __importStar(require("./cloudflare"));
var ip_1 = __importDefault(require("./ip"));
var dotenv_1 = __importDefault(require("dotenv"));
var node_cron_1 = __importDefault(require("node-cron"));
var discord = __importStar(require("./discord"));
var currentDNS = "";
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var zoneID, authToken;
        return __generator(this, function (_a) {
            dotenv_1.default.config();
            zoneID = process.env.CLOUDFLARE_ZONE_ID;
            authToken = process.env.CLOUDFLARE_AUTH_TOKEN;
            if (!zoneID || !authToken)
                throw new Error("Invalid Dotenv");
            cloudflare.init(zoneID, authToken);
            return [2 /*return*/];
        });
    });
}
exports.init = init;
function updateDNS(ip) {
    return __awaiter(this, void 0, void 0, function () {
        var domainName, recordIdentifier, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!ip) return [3 /*break*/, 2];
                    return [4 /*yield*/, ip_1.default()];
                case 1:
                    ip = _a.sent();
                    _a.label = 2;
                case 2:
                    domainName = process.env.DOMAIN_NAME;
                    recordIdentifier = process.env.CLOUDFLARE_RECORD_IDENTIFIER;
                    if (!domainName || !recordIdentifier)
                        throw new Error("Invalid Dotenv");
                    return [4 /*yield*/, cloudflare.updateDNS(recordIdentifier, domainName, ip)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.updateDNS = updateDNS;
function getCurrentDNS() {
    return __awaiter(this, void 0, void 0, function () {
        var domainName, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    domainName = process.env.DOMAIN_NAME;
                    if (!domainName)
                        throw new Error("Invalid Dotenv");
                    return [4 /*yield*/, cloudflare.getDNSIP(domainName)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getCurrentDNS = getCurrentDNS;
if (require.main === module) {
    init().then(function () {
        node_cron_1.default.schedule("*/" + process.env.EVERY_SECOND + " * * * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
            var ip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ip_1.default()];
                    case 1:
                        ip = _a.sent();
                        if (!!currentDNS) return [3 /*break*/, 3];
                        return [4 /*yield*/, getCurrentDNS()];
                    case 2:
                        currentDNS = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(currentDNS !== ip)) return [3 /*break*/, 6];
                        console.log("Updating DNS with ip " + ip);
                        currentDNS = "";
                        return [4 /*yield*/, updateDNS(ip)];
                    case 4:
                        _a.sent();
                        console.log("Updated DNS");
                        return [4 /*yield*/, discord.standbyUseUser(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, user.send("Updated DNS for " + process.env.DOMAIN_NAME + " to " + ip + ".")];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        node_cron_1.default.schedule("*/30 * * * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                currentDNS = "";
                return [2 /*return*/];
            });
        }); });
    });
}
//# sourceMappingURL=index.js.map